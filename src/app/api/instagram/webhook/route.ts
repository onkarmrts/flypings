import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature, parseWebhookEntry } from "@/lib/instagram/webhook";
import { InstagramClient } from "@/lib/instagram/api";
import { createAdminClient } from "@/lib/db/supabase-admin";
import type { InstagramWebhookEntry } from "@/types/instagram";

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

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-hub-signature-256") ?? "";

  if (!verifyWebhookSignature(rawBody, signature)) {
    console.log("[Webhook] Signature mismatch — rejected");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody) as { object: string; entry: InstagramWebhookEntry[] };
  if (body.object !== "instagram") return NextResponse.json({ status: "ignored" });

  const supabase = createAdminClient();

  for (const entry of body.entry) {
    try {
      const events = parseWebhookEntry(entry);
      const igUserId = entry.id;

      console.log("[Webhook] entry.id:", igUserId, "| events:", JSON.stringify(events));

      const { data: account, error: accErr } = await supabase
        .from("instagram_accounts")
        .select("id, user_id, access_token, ig_user_id")
        .eq("ig_user_id", igUserId)
        .eq("is_active", true)
        .single();

      console.log("[Webhook] account lookup:", account ? `found ${account.id}` : `not found (${accErr?.message})`);
      if (!account) continue;

      const { data: automations } = await supabase
        .from("automations")
        .select("id, trigger_config, actions, reply_once, post_id")
        .eq("account_id", account.id)
        .eq("trigger_type", "comment_keyword")
        .eq("is_active", true);

      console.log("[Webhook] automations found:", automations?.length ?? 0);
      if (!automations?.length) continue;

      const igClient = new InstagramClient(account.access_token, account.ig_user_id);

      for (const event of events) {
        console.log("[Webhook] event type:", event.type, "| text:", event.text, "| from:", event.fromUserId);
        if (event.type !== "comment") continue;

        for (const automation of automations) {
          const { keywords = [], caseSensitive = false } = automation.trigger_config as {
            keywords: string[];
            caseSensitive: boolean;
          };

          const commentText = caseSensitive ? event.text : event.text.toUpperCase();
          const matched = keywords.some((kw: string) =>
            commentText.includes(caseSensitive ? kw : kw.toUpperCase())
          );
          if (!matched) continue;

          if (automation.post_id && event.mediaId && !automation.post_id.includes(event.mediaId)) {
            continue;
          }

          if (automation.reply_once) {
            const { count } = await supabase
              .from("dm_logs")
              .select("id", { count: "exact", head: true })
              .eq("automation_id", automation.id)
              .eq("recipient_ig_id", event.fromUserId)
              .eq("status", "sent");

            if ((count ?? 0) > 0) {
              await supabase.from("dm_logs").insert({
                automation_id: automation.id,
                account_id: account.id,
                recipient_ig_id: event.fromUserId,
                recipient_username: event.fromUsername,
                trigger_type: "comment_keyword",
                trigger_text: event.text,
                message_sent: "",
                status: "skipped",
              });
              continue;
            }
          }

          const action = (automation.actions as Array<{ type: string; message: string; link?: string | null }>)[0];
          if (!action) continue;

          let messageText = action.message
            .replace(/\{\{name\}\}/gi, event.fromUsername || "there")
            .replace(/\{\{username\}\}/gi, `@${event.fromUsername || "there"}`)
            .replace(/\{\{keyword\}\}/gi, event.text);

          if (action.link) messageText = `${messageText}\n\n${action.link}`;

          let status: "sent" | "failed" = "sent";
          let errorMsg: string | null = null;

          try {
            await igClient.sendDM(event.fromUserId, messageText);
          } catch (err) {
            status = "failed";
            errorMsg = err instanceof Error ? err.message : String(err);
            console.error(`[Webhook] sendDM failed for ${event.fromUserId}:`, errorMsg);
          }

          await supabase.from("dm_logs").insert({
            automation_id: automation.id,
            account_id: account.id,
            recipient_ig_id: event.fromUserId,
            recipient_username: event.fromUsername,
            trigger_type: "comment_keyword",
            trigger_text: event.text,
            message_sent: messageText,
            status,
            error: errorMsg,
          });

          if (status === "sent") {
            await supabase.from("leads").upsert(
              {
                user_id: account.user_id,
                account_id: account.id,
                ig_user_id: event.fromUserId,
                username: event.fromUsername,
                source_automation_id: automation.id,
                source_trigger: "comment_keyword",
              },
              { onConflict: "account_id,ig_user_id", ignoreDuplicates: true }
            );
          }
        }
      }
    } catch (err) {
      console.error("[Webhook] Unhandled error for entry:", entry.id, err);
    }
  }

  return NextResponse.json({ status: "ok" });
}
