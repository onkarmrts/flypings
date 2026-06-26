/**
 * Instagram Graph API client
 *
 * Required scopes (Business / Creator accounts only):
 *   instagram_basic, instagram_manage_messages, instagram_manage_comments,
 *   instagram_content_publish, pages_show_list, pages_read_engagement
 *
 * Flow:
 *   1. User connects Facebook Page linked to their Instagram Professional account
 *   2. You get a Page access token via Facebook OAuth
 *   3. Exchange it for an Instagram-scoped access token
 *   4. Use that token for all Graph API calls below
 */

const BASE_URL = "https://graph.instagram.com";
const FB_BASE_URL = "https://graph.facebook.com/v21.0";

export class InstagramClient {
  private accessToken: string;
  private igUserId: string;

  constructor(accessToken: string, igUserId: string) {
    this.accessToken = accessToken;
    this.igUserId = igUserId;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = new URL(`${BASE_URL}${path}`);
    url.searchParams.set("access_token", this.accessToken);

    const res = await fetch(url.toString(), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new InstagramAPIError(
        error.error?.message ?? "Unknown Instagram API error",
        error.error?.code,
        error.error?.type
      );
    }

    return res.json() as Promise<T>;
  }

  /** Get basic account info */
  async getAccountInfo() {
    const res = await fetch(
      `${FB_BASE_URL}/${this.igUserId}?fields=id,name,username,profile_picture_url,followers_count,media_count&access_token=${this.accessToken}`
    );
    if (!res.ok) throw new InstagramAPIError("Failed to fetch account info");
    return res.json() as Promise<{
      id: string; name: string; username: string;
      profile_picture_url: string; followers_count: number; media_count: number;
    }>;
  }

  /** Send a DM to a user (requires instagram_manage_messages) */
  async sendDM(recipientIgScopedId: string, text: string) {
    const res = await fetch(
      `${FB_BASE_URL}/${this.igUserId}/messages?access_token=${this.accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: { id: recipientIgScopedId },
          message: { text },
        }),
      }
    );
    const data = await res.json();
    console.log("[sendDM] response:", JSON.stringify(data));
    if (data.error) throw new InstagramAPIError(data.error.message, data.error.code, data.error.type);
    return data as { recipient_id: string; message_id: string };
  }

  /** Get recent media (posts, reels) */
  async getMedia(limit = 20) {
    return this.request<{
      data: Array<{
        id: string;
        media_type: string;
        caption: string;
        permalink: string;
        thumbnail_url?: string;
        media_url: string;
        timestamp: string;
      }>;
    }>(
      `/${this.igUserId}/media?fields=id,media_type,caption,permalink,thumbnail_url,media_url,timestamp&limit=${limit}`
    );
  }

  /** Get comments on a specific media */
  async getComments(mediaId: string) {
    return this.request<{
      data: Array<{
        id: string;
        text: string;
        username: string;
        timestamp: string;
        from: { id: string; username: string };
      }>;
    }>(`/${mediaId}/comments?fields=id,text,username,timestamp,from`);
  }

  /** Reply to a comment publicly */
  async replyToComment(commentId: string, text: string) {
    return this.request<{ id: string }>(`/${commentId}/replies`, {
      method: "POST",
      body: JSON.stringify({ message: text }),
    });
  }
}

export class InstagramAPIError extends Error {
  code: number | undefined;
  type: string | undefined;

  constructor(message: string, code?: number, type?: string) {
    super(message);
    this.name = "InstagramAPIError";
    this.code = code;
    this.type = type;
  }
}

/**
 * Build the Facebook OAuth URL to connect an Instagram account.
 */
export function buildFacebookOAuthURL(redirectUri: string, state: string) {
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_APP_ID!,
    redirect_uri: redirectUri,
    scope: [
      "instagram_basic",
      "instagram_manage_messages",
      "instagram_manage_comments",
      "pages_show_list",
    ].join(","),
    response_type: "code",
    state,
  });

  return `https://www.facebook.com/v21.0/dialog/oauth?${params}`;
}

/**
 * Exchange auth code → page access token → IG user ID
 */
export async function exchangeCodeForToken(code: string, redirectUri: string) {
  // Step 1: Code → short-lived user token
  const tokenRes = await fetch(
    `${FB_BASE_URL}/oauth/access_token?` +
      new URLSearchParams({
        client_id: process.env.FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        redirect_uri: redirectUri,
        code,
      })
  );
  const step1 = await tokenRes.json();
  console.log("[IG Connect] Step1:", step1.access_token ? "OK" : JSON.stringify(step1));
  if (!step1.access_token) {
    throw new Error(`Token exchange failed: ${step1.error?.message ?? JSON.stringify(step1)}`);
  }

  // Step 2: Short-lived → long-lived token (60 days)
  const longRes = await fetch(
    `${FB_BASE_URL}/oauth/access_token?` +
      new URLSearchParams({
        grant_type: "fb_exchange_token",
        client_id: process.env.FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        fb_exchange_token: step1.access_token,
      })
  );
  const step2 = await longRes.json();
  console.log("[IG Connect] Step2:", step2.access_token ? "OK" : JSON.stringify(step2));
  if (!step2.access_token) {
    throw new Error(`Long token failed: ${step2.error?.message ?? JSON.stringify(step2)}`);
  }
  const longToken = step2.access_token as string;

  // Step 3: Get all Facebook Pages this user manages
  const pagesRes = await fetch(
    `${FB_BASE_URL}/me/accounts?access_token=${longToken}&fields=id,name,access_token`
  );
  const pages = await pagesRes.json();
  console.log("[IG Connect] Pages:", JSON.stringify(pages?.data?.map((p: {id: string; name: string}) => ({ id: p.id, name: p.name }))));

  // Step 4: Check each page returned by /me/accounts
  for (const p of (pages.data ?? []) as Array<{ id: string; name: string; access_token: string }>) {
    const igRes = await fetch(
      `${FB_BASE_URL}/${p.id}?fields=instagram_business_account&access_token=${p.access_token}`
    );
    const igData = await igRes.json();
    console.log(`[IG Connect] Page "${p.name}" IG:`, JSON.stringify(igData.instagram_business_account));
    if (igData.instagram_business_account?.id) {
      return {
        pageAccessToken: p.access_token,
        igUserId: igData.instagram_business_account.id as string,
        pageName: p.name,
      };
    }
  }

  // Step 5: Use debug_token to get ALL page IDs the user actually granted
  // (some pages don't appear in /me/accounts but are still grantable via OAuth)
  const appToken = `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`;
  const debugRes = await fetch(
    `${FB_BASE_URL}/debug_token?input_token=${longToken}&access_token=${appToken}`
  );
  const debugData = await debugRes.json();
  console.log("[IG Connect] debug_token granular_scopes:", JSON.stringify(debugData?.data?.granular_scopes));

  const grantedPageIds: string[] = debugData?.data?.granular_scopes
    ?.find((s: { scope: string; target_ids?: string[] }) => s.scope === "pages_show_list")
    ?.target_ids ?? [];

  console.log("[IG Connect] Granted page IDs:", grantedPageIds);

  for (const pageId of grantedPageIds) {
    const pageRes = await fetch(
      `${FB_BASE_URL}/${pageId}?fields=id,name,access_token,instagram_business_account&access_token=${longToken}`
    );
    const pageData = await pageRes.json();
    console.log(`[IG Connect] Direct page ${pageId}:`, JSON.stringify({ name: pageData.name, ig: pageData.instagram_business_account }));
    if (pageData.instagram_business_account?.id) {
      return {
        pageAccessToken: pageData.access_token ?? longToken,
        igUserId: pageData.instagram_business_account.id as string,
        pageName: pageData.name ?? pageId,
      };
    }
  }

  // Step 6: Extract Instagram user ID directly from debug_token granular_scopes
  const igUserId = debugData?.data?.granular_scopes
    ?.find((s: { scope: string; target_ids?: string[] }) => s.scope === "instagram_basic")
    ?.target_ids?.[0];

  console.log("[IG Connect] Instagram user ID from token:", igUserId);

  if (igUserId) {
    return {
      pageAccessToken: longToken,
      igUserId: String(igUserId),
      pageName: "Instagram",
    };
  }

  throw new Error("no_instagram_page");
}
