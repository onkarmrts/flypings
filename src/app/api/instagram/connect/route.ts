import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, buildFacebookOAuthURL, InstagramClient } from "@/lib/instagram/api";
import { createClient } from "@/lib/db/supabase-server";

const APP_URL = process.env.NODE_ENV === "production"
  ? "https://flypings.vercel.app"
  : "http://localhost:3000";

const REDIRECT_URI = `${APP_URL}/api/instagram/connect`;

/**
 * GET — two jobs:
 *   1. No code param  → redirect user to Facebook OAuth
 *   2. code param     → OAuth callback, exchange for token, save account
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code  = searchParams.get("code");
  const error = searchParams.get("error");

  // ── User denied permission on Facebook ──────────────────────────────────
  if (error) {
    return NextResponse.redirect(
      `${APP_URL}/dashboard/settings/instagram?error=denied`
    );
  }

  // ── No code → start OAuth ────────────────────────────────────────────────
  if (!code) {
    const state   = crypto.randomUUID();
    const oauthUrl = buildFacebookOAuthURL(REDIRECT_URI, state);
    return NextResponse.redirect(oauthUrl);
  }

  // ── Code received → exchange & save ─────────────────────────────────────
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(
      `${APP_URL}/login?next=/dashboard/settings/instagram`
    );
  }

  try {
    const { pageAccessToken, igUserId } = await exchangeCodeForToken(code, REDIRECT_URI);

    // Fetch account details from Instagram API
    const client  = new InstagramClient(pageAccessToken, igUserId);
    const igInfo  = await client.getAccountInfo();

    // Upsert the Instagram account (handles reconnect)
    const { error: dbError } = await supabase
      .from("instagram_accounts")
      .upsert(
        {
          user_id:         user.id,
          ig_user_id:      igUserId,
          username:        igInfo.username,
          name:            igInfo.name,
          profile_pic_url: igInfo.profile_picture_url,
          access_token:    pageAccessToken,
          followers_count: igInfo.followers_count,
          is_active:       true,
        },
        { onConflict: "ig_user_id" }
      );

    if (dbError) throw dbError;

    // Subscribe this IG account to Meta webhooks (comment + message fields)
    await subscribeToWebhooks(igUserId, pageAccessToken);

    return NextResponse.redirect(
      `${APP_URL}/dashboard/settings/instagram?success=connected`
    );
  } catch (err) {
    console.error("Instagram connect error:", err);
    return NextResponse.redirect(
      `${APP_URL}/dashboard/settings/instagram?error=failed`
    );
  }
}

/** Subscribe the IG account to webhook fields so comments trigger our endpoint */
async function subscribeToWebhooks(igUserId: string, accessToken: string) {
  const webhookUrl = `${APP_URL}/api/instagram/webhook`;

  await fetch(
    `https://graph.facebook.com/v21.0/${igUserId}/subscribed_apps`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subscribed_fields: ["comments", "messages", "mentions"],
        access_token: accessToken,
        callback_url: webhookUrl,
        verify_token: process.env.WEBHOOK_VERIFY_TOKEN,
      }),
    }
  );
}
