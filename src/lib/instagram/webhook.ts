import crypto from "crypto";
import type { InstagramWebhookEntry } from "@/types/instagram";

/**
 * Verify the X-Hub-Signature-256 header sent by Meta on every webhook call.
 * If this check fails, reject the request — it's not from Meta.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string
): boolean {
  try {
    const appSecret = process.env.FACEBOOK_APP_SECRET!;
    const expected = `sha256=${crypto
      .createHmac("sha256", appSecret)
      .update(rawBody)
      .digest("hex")}`;
    const a = Buffer.from(expected);
    const b = Buffer.from(signature);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Parse what type of event came in from Instagram webhook.
 * Returns a normalized event object your automation engine can act on.
 */
export function parseWebhookEntry(entry: InstagramWebhookEntry) {
  const events: ParsedWebhookEvent[] = [];

  // Comment events
  for (const change of entry.changes ?? []) {
    if (change.field === "comments") {
      events.push({
        type: "comment",
        fromUserId: change.value.from.id,
        fromUsername: change.value.from.username,
        text: change.value.text,
        mediaId: change.value.media?.id,
        timestamp: change.value.timestamp,
      });
    }

    if (change.field === "mentions") {
      events.push({
        type: "mention",
        fromUserId: change.value.from.id,
        fromUsername: change.value.from.username,
        text: change.value.text,
        mediaId: change.value.media?.id,
        timestamp: change.value.timestamp,
      });
    }
  }

  // DM / messaging events
  for (const msg of entry.messaging ?? []) {
    events.push({
      type: "dm",
      fromUserId: msg.sender.id,
      fromUsername: "",
      text: msg.message?.text ?? "",
      mediaId: undefined,
      timestamp: new Date(msg.timestamp).toISOString(),
    });
  }

  return events;
}

export interface ParsedWebhookEvent {
  type: "comment" | "dm" | "mention" | "story_reply";
  fromUserId: string;
  fromUsername: string;
  text: string;
  mediaId: string | undefined;
  timestamp: string;
}
