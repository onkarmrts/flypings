import { redirect } from "next/navigation";
import { createClient } from "@/lib/db/supabase-server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { MobileTopbar } from "@/components/dashboard/mobile-topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, plan_id")
    .eq("id", user.id)
    .single();

  const { count: igCount } = await supabase
    .from("instagram_accounts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_active", true);

  const sidebarProps = {
    user: {
      name: profile?.full_name ?? null,
      email: user.email ?? "",
      avatarUrl: profile?.avatar_url ?? null,
    },
    planId: profile?.plan_id ?? null,
    igConnected: (igCount ?? 0) > 0,
  };

  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* ── Desktop sidebar (hidden on mobile) ─────────────────── */}
      <div className="hidden md:block">
        <Sidebar {...sidebarProps} />
      </div>

      {/* ── Mobile top bar (hidden on desktop) ──────────────────── */}
      <MobileTopbar />

      {/* ── Main content area ───────────────────────────────────── */}
      <div className="md:ml-60 flex flex-col min-h-screen">
        {/* Desktop topbar */}
        <div className="hidden md:block">
          <Topbar />
        </div>

        {/* Page content — extra bottom padding on mobile for the nav bar */}
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* ── Mobile bottom nav ───────────────────────────────────── */}
      <MobileNav />
    </div>
  );
}
