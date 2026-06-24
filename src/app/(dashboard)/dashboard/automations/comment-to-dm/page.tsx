import { redirect } from "next/navigation";
import { createClient } from "@/lib/db/supabase-server";
import { CommentToDMBuilder } from "./builder";

export const metadata = { title: "Comment → DM" };

export default async function CommentToDMPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { count } = await supabase
    .from("instagram_accounts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_active", true);

  const igConnected = (count ?? 0) > 0;

  return (
    <div className="max-w-2xl mx-auto md:max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full px-2.5 py-1">
            Main Feature
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Comment → DM Setup</h2>
        <p className="text-[#71717A] text-sm mt-1">
          Fill in 5 simple fields. Your automation goes live instantly.
        </p>
      </div>

      <CommentToDMBuilder igConnected={igConnected} />
    </div>
  );
}
