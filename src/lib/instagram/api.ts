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
    }>(`/me?fields=id,name,username,profile_picture_url,followers_count,media_count`);
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
 * Build the Instagram Business Login OAuth URL.
 * Uses Instagram's own OAuth — no Facebook Page required.
 */
export function buildFacebookOAuthURL(redirectUri: string, state: string) {
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_APP_ID!,
    redirect_uri: redirectUri,
    scope: [
      "instagram_business_basic",
      "instagram_business_manage_messages",
      "instagram_business_manage_comments",
    ].join(","),
    response_type: "code",
    state,
  });

  return `https://www.instagram.com/oauth/authorize?${params}`;
}

/**
 * Exchange auth code → long-lived Instagram token → IG user ID
 * Uses Instagram Business Login flow (no Facebook Page needed)
 */
export async function exchangeCodeForToken(code: string, redirectUri: string) {
  // Step 1: Code → short-lived Instagram token
  const tokenRes = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.FACEBOOK_APP_ID!,
      client_secret: process.env.FACEBOOK_APP_SECRET!,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code,
    }),
  });
  const step1 = await tokenRes.json();
  console.log("[IG Connect] Step1 token exchange:", step1.access_token ? "OK" : JSON.stringify(step1));
  if (!step1.access_token) {
    throw new Error(`Step1 failed: ${step1.error_message ?? JSON.stringify(step1)}`);
  }
  const shortToken = step1.access_token as string;
  const igUserId = String(step1.user_id);

  // Step 2: Short-lived → long-lived token (60 days)
  const longRes = await fetch(
    `https://graph.instagram.com/access_token?` +
      new URLSearchParams({
        grant_type: "ig_exchange_token",
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        access_token: shortToken,
      })
  );
  const step2 = await longRes.json();
  console.log("[IG Connect] Step2 long token:", step2.access_token ? "OK" : JSON.stringify(step2));
  if (!step2.access_token) {
    throw new Error(`Step2 failed: ${step2.error?.message ?? JSON.stringify(step2)}`);
  }

  return {
    pageAccessToken: step2.access_token as string,
    igUserId,
    pageName: igUserId,
  };
}
