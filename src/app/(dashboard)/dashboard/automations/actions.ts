"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/db/supabase-server";

export async function toggleAutomation(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const id = formData.get("id") as string;
  const currentlyActive = formData.get("is_active") === "true";

  await supabase
    .from("automations")
    .update({ is_active: !currentlyActive })
    .eq("id", id)
    .eq("user_id", user.id);

  revalidatePath("/dashboard/automations");
}

export async function deleteAutomation(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const id = formData.get("id") as string;

  await supabase
    .from("automations")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  revalidatePath("/dashboard/automations");
}
