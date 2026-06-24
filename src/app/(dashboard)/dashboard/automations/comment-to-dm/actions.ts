"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/db/supabase-server";

export type SaveResult =
  | { success: true; id: string }
  | { success: false; error: string };

export async function saveCommentToDM(formData: FormData): Promise<SaveResult> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not logged in" };

  // Get the user's first connected Instagram account
  const { data: account } = await supabase
    .from("instagram_accounts")
    .select("id")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (!account) {
    return { success: false, error: "Connect your Instagram account first." };
  }

  const keyword   = (formData.get("keyword") as string)?.trim().toUpperCase();
  const message   = (formData.get("message") as string)?.trim();
  const link      = (formData.get("link") as string)?.trim();
  const postScope = (formData.get("post_scope") as string) ?? "all";
  const postUrl   = (formData.get("post_url") as string)?.trim();
  const replyOnce = formData.get("reply_once") === "true";
  const name      = (formData.get("automation_name") as string)?.trim();

  if (!keyword) return { success: false, error: "Please enter a trigger keyword." };
  if (!message) return { success: false, error: "Please write a DM message." };

  const triggerConfig = {
    keywords: [keyword],
    caseSensitive: false,
  };

  const actions = [
    {
      type: "send_dm_with_link",
      message,
      link: link || null,
    },
  ];

  const { data, error } = await supabase
    .from("automations")
    .insert({
      user_id:        user.id,
      account_id:     account.id,
      name:           name || `Comment "${keyword}" → DM`,
      trigger_type:   "comment_keyword",
      trigger_config: triggerConfig,
      actions,
      is_active:      true,
      reply_once:     replyOnce,
      post_id:        postScope === "specific" && postUrl ? postUrl : null,
    })
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };

  redirect("/dashboard/automations");
}
