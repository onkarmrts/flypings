import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature, parseWebhookEntry } from "@/lib/instagram/webhook";
import type { InstagramWebhookEntry } from "@/types/instagram";

/**
 * GET — Meta verifies your webhook endpoint once when you register it.
 * It sends hub.mode, hub.verify_token, hub.challenge.
 * Return the challenge to confirm ownership.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

/**
 * POST — Every real-time event (comment, DM, story reply) hits here.
 * 1. Verify signature
 * 2. Parse events
 * 3. Match against active automations and trigger DMs
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-hub-signature-256") ?? "";

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody) as {
    object: string;
    entry: InstagramWebhookEntry[];
  };

  if (body.object !== "instagram") {
    return NextResponse.json({ status: "ignored" });
  }

  for (const entry of body.entry) {
    const events = parseWebhookEntry(entry);

    for (const event of events) {
      // TODO: Match event against active automations in DB
      // TODO: Check replyOnce — skip if already DM'd this user for this post
      // TODO: Call InstagramClient.sendDM() with the automation's action message
      console.log("Webhook event:", event);
    }
  }

  // Always return 200 fast — Meta will retry if you're slow
  return NextResponse.json({ status: "ok" });
}
