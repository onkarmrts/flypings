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
    return this.request<{
      id: string;
      name: string;
      username: string;
      profile_picture_url: string;
      followers_count: number;
      media_count: number;
    }>(`/${this.igUserId}?fields=id,name,username,profile_picture_url,followers_count,media_count`);
  }

  /** Send a DM to a user (requires instagram_manage_messages) */
  async sendDM(recipientIgScopedId: string, text: string) {
    return this.request<{ recipient_id: string; message_id: string }>(
      `/${this.igUserId}/messages`,
      {
        method: "POST",
        body: JSON.stringify({
          recipient: { id: recipientIgScopedId },
          message: { text },
        }),
      }
    );
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
 * Redirect user here to start the OAuth flow.
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
 * Call this in your /api/instagram/connect route
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
  console.log("[IG Connect] Step1 token exchange:", JSON.stringify(step1));
  if (!step1.access_token) {
    throw new Error(`Step1 failed: ${step1.error?.message ?? JSON.stringify(step1)}`);
  }
  const shortToken = step1.access_token;

  // Step 2: Short-lived → long-lived token (60 days)
  const longRes = await fetch(
    `${FB_BASE_URL}/oauth/access_token?` +
      new URLSearchParams({
        grant_type: "fb_exchange_token",
        client_id: process.env.FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        fb_exchange_token: shortToken,
      })
  );
  const step2 = await longRes.json();
  console.log("[IG Connect] Step2 long token:", step2.access_token ? "OK" : JSON.stringify(step2));
  if (!step2.access_token) {
    throw new Error(`Step2 failed: ${step2.error?.message ?? JSON.stringify(step2)}`);
  }
  const longToken = step2.access_token;

  // Check what permissions were actually granted
  const permsRes = await fetch(`${FB_BASE_URL}/me/permissions?access_token=${longToken}`);
  const perms = await permsRes.json();
  console.log("[IG Connect] Granted permissions:", JSON.stringify(perms));

  // Step 3a: Get Facebook Pages → find linked IG business account
  const pagesRes = await fetch(
    `${FB_BASE_URL}/me/accounts?access_token=${longToken}&fields=id,name,access_token,instagram_business_account`
  );
  const pages = await pagesRes.json();
  console.log("[IG Connect] Step3a pages:", JSON.stringify(pages));

  const page = pages.data?.find(
    (p: { instagram_business_account?: { id: string } }) => p.instagram_business_account
  );

  if (page) {
    // Use the Page's own access token for API calls (required for messaging)
    const pageToken = page.access_token ?? longToken;
    return {
      pageAccessToken: pageToken,
      igUserId: page.instagram_business_account.id as string,
      pageName: page.name as string,
    };
  }

  // Step 3b: Fallback — try Instagram accounts linked to personal Facebook profile
  const igAccountsRes = await fetch(
    `${FB_BASE_URL}/me/instagram_accounts?fields=id,username,name,profile_picture_url,followers_count&access_token=${longToken}`
  );
  const igAccounts = await igAccountsRes.json();
  console.log("[IG Connect] Step3b instagram_accounts:", JSON.stringify(igAccounts));

  const igAccount = igAccounts.data?.[0];
  if (igAccount) {
    return {
      pageAccessToken: longToken,
      igUserId: igAccount.id as string,
      pageName: igAccount.username as string,
    };
  }

  throw new Error("No Instagram Professional account linked to this Facebook account. Create a Facebook Page and link your Instagram to it.");
}
