import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/db/supabase-server";

/* ─── Connect Instagram banner ────────────────────────────────────────────── */
function ConnectBanner() {
  return (
    <Link
      href="/dashboard/settings/instagram"
      className="group flex items-center gap-4 bg-[#18181B] border border-[#8B5CF6]/30 rounded-2xl p-4 mb-6 hover:border-[#8B5CF6]/60 active:scale-[0.99] transition-all"
    >
      <div className="w-11 h-11 gradient-brand rounded-xl flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-white text-sm font-semibold">Connect your Instagram first</p>
        <p className="text-[#71717A] text-xs mt-0.5">Tap here — takes 30 seconds</p>
      </div>
      <svg className="w-5 h-5 text-[#8B5CF6] group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
      </svg>
    </Link>
  );
}

/* ─── Stat pill ───────────────────────────────────────────────────────────── */
function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-center">
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-[#71717A] text-xs mt-0.5">{label}</p>
    </div>
  );
}

/* ─── HERO — Comment to DM ────────────────────────────────────────────────── */
function CommentToDMCard({ hasAutomation }: { hasAutomation: boolean }) {
  return (
    <div className="relative overflow-hidden bg-[#18181B] border border-[#27272A] rounded-2xl p-5 mb-4">
      {/* Subtle purple glow top-right */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        {/* Label */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            Main Feature
          </span>
          {hasAutomation && (
            <span className="text-[11px] text-[#22C55E] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse inline-block" />
              Active
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-bold mb-1">Comment Karo, Link Pao</h3>
        <p className="text-[#A1A1AA] text-sm leading-relaxed mb-5">
          Your follower comments <span className="text-white font-semibold bg-[#27272A] px-1.5 py-0.5 rounded-md text-xs">LINK</span> on your Reel → they instantly get your link in DMs. You get the lead. Instagram boosts your post.
        </p>

        {/* How it works — 3 simple steps */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex-1 bg-[#09090B] rounded-xl p-3 text-center border border-[#27272A]">
            <p className="text-lg mb-1">💬</p>
            <p className="text-white text-xs font-medium">They comment</p>
            <p className="text-[#52525B] text-[10px] mt-0.5">"LINK"</p>
          </div>
          <svg className="w-4 h-4 text-[#3F3F46] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
          <div className="flex-1 bg-[#09090B] rounded-xl p-3 text-center border border-[#8B5CF6]/20">
            <p className="text-lg mb-1">⚡</p>
            <p className="text-[#8B5CF6] text-xs font-medium">Flypings sends</p>
            <p className="text-[#52525B] text-[10px] mt-0.5">in &lt;3 sec</p>
          </div>
          <svg className="w-4 h-4 text-[#3F3F46] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
          <div className="flex-1 bg-[#09090B] rounded-xl p-3 text-center border border-[#22C55E]/20">
            <p className="text-lg mb-1">🎉</p>
            <p className="text-[#22C55E] text-xs font-medium">They get DM</p>
            <p className="text-[#52525B] text-[10px] mt-0.5">with your link</p>
          </div>
        </div>

        {/* 3 bullets */}
        <ul className="space-y-2 mb-5">
          {[
            "Works on any post or Reel",
            "Never DMs the same person twice",
            "Instagram rewards the comments with reach",
          ].map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
              <svg className="w-4 h-4 text-[#22C55E] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <polyline strokeLinecap="round" strokeLinejoin="round" points="20 6 9 17 4 12" />
              </svg>
              {b}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/dashboard/automations/comment-to-dm"
          className="flex items-center justify-center gap-2 gradient-brand text-white font-bold py-3.5 rounded-xl text-sm hover:opacity-90 active:scale-[0.98] transition-all w-full"
        >
          {hasAutomation ? "Manage automation" : "Set this up — it's easy"}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ─── Secondary feature card ──────────────────────────────────────────────── */
function FeatureCard({
  href,
  emoji,
  badge,
  badgeColor,
  title,
  desc,
  bullets,
  ctaLabel,
}: {
  href: string;
  emoji: string;
  badge: string;
  badgeColor: string;
  title: string;
  desc: string;
  bullets: string[];
  ctaLabel: string;
}) {
  return (
    <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-4 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{emoji}</span>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ color: badgeColor, backgroundColor: `${badgeColor}15`, border: `1px solid ${badgeColor}25` }}
        >
          {badge}
        </span>
      </div>

      <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
      <p className="text-[#71717A] text-xs leading-relaxed mb-3 flex-1">{desc}</p>

      <ul className="space-y-1.5 mb-4">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-1.5 text-[11px] text-[#A1A1AA]">
            <svg className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <polyline strokeLinecap="round" strokeLinejoin="round" points="20 6 9 17 4 12" />
            </svg>
            {b}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="text-center border border-[#3F3F46] text-[#A1A1AA] hover:text-white hover:border-[#52525B] text-xs font-semibold py-2.5 rounded-xl active:scale-[0.97] transition-all"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

/* ─── Explore more row ────────────────────────────────────────────────────── */
function ExploreMore() {
  const items = [
    { label: "Live Triggers", href: "/dashboard/automations/live-triggers", emoji: "🔴" },
    { label: "Mentions", href: "/dashboard/automations", emoji: "📣" },
    { label: "WhatsApp", href: "/dashboard/automations", emoji: "💚" },
    { label: "Lost Leads", href: "/dashboard/automations", emoji: "🔁" },
  ];

  return (
    <div className="mt-6">
      <p className="text-[#52525B] text-xs uppercase tracking-widest font-medium mb-3 px-1">
        Explore more tools
      </p>
      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-[#18181B] border border-[#27272A] rounded-xl p-3 flex flex-col items-center gap-2 hover:border-[#3F3F46] active:scale-[0.95] transition-all text-center"
          >
            <span className="text-xl">{item.emoji}</span>
            <p className="text-[#71717A] text-[10px] font-medium leading-tight">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { count: igCount } = await supabase
    .from("instagram_accounts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_active", true);

  const today = new Date().toISOString().split("T")[0];

  const { count: dmsToday } = await supabase
    .from("dm_logs")
    .select("id", { count: "exact", head: true })
    .gte("sent_at", `${today}T00:00:00`)
    .eq("status", "sent");

  const { count: commentAutomations } = await supabase
    .from("automations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("trigger_type", "comment_keyword")
    .eq("is_active", true);

  const igConnected = (igCount ?? 0) > 0;
  const firstName = profile?.full_name?.split(" ")[0] ?? "Creator";
  const hasCommentAutomation = (commentAutomations ?? 0) > 0;

  return (
    <div className="max-w-lg mx-auto md:max-w-2xl">
      {/* Greeting */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-white">Hey {firstName} 👋</h2>
        <p className="text-[#71717A] text-sm mt-0.5">What do you want to automate today?</p>
      </div>

      {/* Stats — only show if Instagram is connected */}
      {igConnected && (
        <div className="flex gap-3 mb-5">
          <StatPill label="DMs today" value={dmsToday?.toLocaleString("en-IN") ?? "0"} />
          <StatPill label="This month" value="0" />
          <StatPill label="Total leads" value="0" />
        </div>
      )}

      {/* Connect Instagram */}
      {!igConnected && <ConnectBanner />}

      {/* ── Main feature ── */}
      <CommentToDMCard hasAutomation={hasCommentAutomation} />

      {/* ── 2 secondary features ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FeatureCard
          href="/dashboard/automations/upi-commerce"
          emoji="💸"
          badge="India Exclusive"
          badgeColor="#EC4899"
          title="Comment BUY → UPI Payment"
          desc="They comment BUY, get a UPI link in DMs, pay, and auto-receive your product. No website needed."
          bullets={[
            "Direct UPI deep links",
            "Auto-delivers after payment",
            "Works for courses, PDFs, merch",
          ]}
          ctaLabel="Set up UPI automation"
        />

        <FeatureCard
          href="/dashboard/automations/story-poll"
          emoji="📊"
          badge="Nobody Has This"
          badgeColor="#F59E0B"
          title="Story Poll → Personal DM"
          desc="Post a poll. Each vote gets a different DM. Hyper-personalized at zero effort."
          bullets={[
            "Up to 4 options, unique DM each",
            "Auto-segments your audience",
            "ManyChat doesn't do this",
          ]}
          ctaLabel="Set up poll funnel"
        />
      </div>

      {/* Explore more */}
      <ExploreMore />
    </div>
  );
}
