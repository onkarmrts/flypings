import { redirect } from "next/navigation";
import { createClient } from "@/lib/db/supabase-server";
import { ConnectButton } from "./connect-button";

export const metadata = { title: "Connect Instagram" };

/* ─── Connected account card ──────────────────────────────────────────────── */
function ConnectedCard({
  username,
  name,
  followers,
  picUrl,
}: {
  username: string;
  name: string;
  followers: number;
  picUrl: string | null;
}) {
  return (
    <div className="bg-[#18181B] border border-[#22C55E]/30 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden border-2 border-[#22C55E]/40">
          {picUrl ? (
            <img src={picUrl} alt={username} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full gradient-brand flex items-center justify-center text-white font-bold text-xl">
              {username[0]?.toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-white font-bold text-base truncate">@{username}</p>
            <span className="flex items-center gap-1 text-[#22C55E] text-xs font-medium flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              Active
            </span>
          </div>
          <p className="text-[#71717A] text-sm truncate">{name}</p>
          <p className="text-[#A1A1AA] text-xs mt-0.5">
            {followers.toLocaleString("en-IN")} followers
          </p>
        </div>
      </div>

      {/* Status row */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#27272A]">
        {[
          { label: "DMs sent", value: "0" },
          { label: "Automations", value: "0" },
          { label: "Leads captured", value: "0" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-white font-bold text-lg">{s.value}</p>
            <p className="text-[#52525B] text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Reconnect / disconnect actions */}
      <div className="flex gap-2 mt-4">
        <a
          href="/api/instagram/connect"
          className="flex-1 text-center border border-[#3F3F46] text-[#A1A1AA] hover:text-white hover:border-[#52525B] text-xs font-medium py-2.5 rounded-xl transition-all"
        >
          Reconnect
        </a>
        <button className="flex-1 border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/10 text-xs font-medium py-2.5 rounded-xl transition-all">
          Disconnect
        </button>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default async function InstagramSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: accounts } = await supabase
    .from("instagram_accounts")
    .select("id, username, name, profile_pic_url, followers_count, is_active")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("connected_at", { ascending: false });

  const params   = await searchParams;
  const hasError = params?.error;
  const success  = params?.success;

  const hasAccount = (accounts?.length ?? 0) > 0;

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">Instagram Account</h2>
        <p className="text-[#71717A] text-sm mt-1">
          Connect your Instagram to activate automations.
        </p>
      </div>

      {/* Success toast */}
      {success === "connected" && (
        <div className="flex items-center gap-3 bg-[#14532D22] border border-[#22C55E]/30 rounded-xl px-4 py-3 mb-5">
          <svg className="w-4 h-4 text-[#22C55E] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <polyline strokeLinecap="round" strokeLinejoin="round" points="20 6 9 17 4 12" />
          </svg>
          <p className="text-[#22C55E] text-sm font-medium">
            Instagram connected successfully! Your automations are ready.
          </p>
        </div>
      )}

      {/* Error toast */}
      {hasError && (
        <div className="flex items-center gap-3 bg-[#7F1D1D22] border border-[#EF4444]/30 rounded-xl px-4 py-3 mb-5">
          <svg className="w-4 h-4 text-[#EF4444] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <p className="text-[#EF4444] text-sm">
            {hasError === "denied"
              ? "You cancelled the connection. Try again when you're ready."
              : "Something went wrong. Please try again."}
          </p>
        </div>
      )}

      {/* DEV ONLY — mock connect banner */}
      {process.env.NODE_ENV === "development" && !hasAccount && (
        <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/40 rounded-2xl px-4 py-3 mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#F59E0B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-[#F59E0B] text-xs font-semibold">Dev mode — no Facebook needed</p>
          </div>
          <a
            href="/api/dev/mock-instagram?username=testcreator"
            className="text-[10px] font-bold bg-[#F59E0B] text-black px-3 py-1.5 rounded-lg flex-shrink-0 hover:bg-[#FBBF24] transition-colors"
          >
            Mock Connect
          </a>
        </div>
      )}

      {/* DEV ONLY — disconnect mock */}
      {process.env.NODE_ENV === "development" && hasAccount && (
        <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/40 rounded-2xl px-4 py-3 mb-4 flex items-center justify-between gap-3">
          <p className="text-[#F59E0B] text-xs font-semibold">Dev mode — mock account active</p>
          <a
            href="/api/dev/mock-instagram?action=delete"
            className="text-[10px] font-bold border border-[#F59E0B]/50 text-[#F59E0B] px-3 py-1.5 rounded-lg flex-shrink-0 hover:bg-[#F59E0B]/10 transition-colors"
          >
            Remove Mock
          </a>
        </div>
      )}

      {/* Connected accounts */}
      {hasAccount ? (
        <div className="space-y-4 mb-6">
          {accounts!.map((acc) => (
            <ConnectedCard
              key={acc.id}
              username={acc.username}
              name={acc.name}
              followers={acc.followers_count}
              picUrl={acc.profile_pic_url}
            />
          ))}
        </div>
      ) : (
        /* ── Not connected yet ── */
        <div className="space-y-4">
          {/* Main connect card */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-base">Connect Instagram</p>
                <p className="text-[#71717A] text-xs mt-0.5">Takes about 30 seconds</p>
              </div>
            </div>

            <ConnectButton />
          </div>

          {/* Requirements */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-5">
            <p className="text-white text-sm font-semibold mb-4">Before you connect, check this:</p>

            <div className="space-y-3">
              <Requirement
                ok
                title="Your Instagram is a Professional account"
                detail="Creator or Business — not Personal. It's free to switch."
                fix="Instagram app → Profile → Settings → Account type → Switch to Professional"
              />
              <Requirement
                ok
                title="You have a Facebook Page linked"
                detail="Required by Meta to use the API for DMs."
                fix="Instagram app → Settings → Account → Linked accounts → Facebook"
              />
              <Requirement
                ok
                title="Your account is not private"
                detail="DM automations only work on public accounts."
                fix="Instagram app → Settings → Privacy → Private account → Turn off"
              />
            </div>
          </div>

          {/* What we access / what we don't */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-4">
              <p className="text-white text-xs font-semibold mb-3 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <polyline strokeLinecap="round" strokeLinejoin="round" points="20 6 9 17 4 12" />
                </svg>
                What Flypings CAN do
              </p>
              <ul className="space-y-2">
                {[
                  "Read comments on your posts",
                  "Send DMs to people who comment",
                  "See basic account info (username, followers)",
                ].map((item) => (
                  <li key={item} className="text-[#A1A1AA] text-xs flex items-start gap-2">
                    <span className="text-[#22C55E] mt-0.5 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-4">
              <p className="text-white text-xs font-semibold mb-3 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <line strokeLinecap="round" strokeLinejoin="round" x1="18" y1="6" x2="6" y2="18" />
                  <line strokeLinecap="round" strokeLinejoin="round" x1="6" y1="6" x2="18" y2="18" />
                </svg>
                What Flypings CANNOT do
              </p>
              <ul className="space-y-2">
                {[
                  "Post anything on your behalf",
                  "See your password or login",
                  "Read your private DMs",
                  "Access your followers list",
                ].map((item) => (
                  <li key={item} className="text-[#A1A1AA] text-xs flex items-start gap-2">
                    <span className="text-[#EF4444] mt-0.5 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-4">
            <p className="text-white text-xs font-semibold mb-3">How the connection works</p>
            <div className="space-y-3">
              {[
                { n: "1", text: "You tap Connect — we redirect you to Facebook's official login page" },
                { n: "2", text: "You approve access (same way you authorize any app on Facebook)" },
                { n: "3", text: "Facebook sends us a secure token — we never see your password" },
                { n: "4", text: "Flypings uses that token to monitor comments and send DMs" },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full gradient-brand flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {step.n}
                  </div>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Requirement item ────────────────────────────────────────────────────── */
function Requirement({
  ok,
  title,
  detail,
  fix,
}: {
  ok: boolean;
  title: string;
  detail: string;
  fix: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
        ok ? "border-[#22C55E] bg-[#22C55E]/10" : "border-[#EF4444] bg-[#EF4444]/10"
      }`}>
        {ok && (
          <svg className="w-2.5 h-2.5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <polyline strokeLinecap="round" strokeLinejoin="round" points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium">{title}</p>
        <p className="text-[#71717A] text-xs mt-0.5">{detail}</p>
        <details className="mt-1">
          <summary className="text-[#8B5CF6] text-xs cursor-pointer hover:text-[#A78BFA] transition-colors list-none">
            How to do this ↓
          </summary>
          <p className="text-[#52525B] text-xs mt-1 leading-relaxed bg-[#09090B] rounded-lg px-3 py-2">
            {fix}
          </p>
        </details>
      </div>
    </div>
  );
}
