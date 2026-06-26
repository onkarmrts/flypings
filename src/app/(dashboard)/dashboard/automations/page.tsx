import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/db/supabase-server";
import { toggleAutomation, deleteAutomation } from "./actions";

const AUTOMATION_TYPES = [
  {
    href: "/dashboard/automations/comment-to-dm",
    label: "Comment → DM",
    desc: "Send a DM when someone comments a keyword on your post",
    color: "#8B5CF6",
    badge: "Most Used",
    badgeColor: "#8B5CF6",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/automations/upi-commerce",
    label: "UPI Payment DM",
    desc: "Collect payments directly via Instagram DM — India exclusive",
    color: "#EC4899",
    badge: "India Exclusive",
    badgeColor: "#EC4899",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <line strokeLinecap="round" strokeLinejoin="round" x1="6" y1="3" x2="18" y2="3" />
        <line strokeLinecap="round" strokeLinejoin="round" x1="6" y1="8" x2="18" y2="8" />
        <line strokeLinecap="round" strokeLinejoin="round" x1="6" y1="13" x2="11" y2="13" />
        <polyline strokeLinecap="round" strokeLinejoin="round" points="11 8 11 22 20 13" />
      </svg>
    ),
  },
  {
    href: "/dashboard/automations/story-poll",
    label: "Story Poll Funnel",
    desc: "Send a different DM based on which poll option they voted",
    color: "#F59E0B",
    badge: "Unique",
    badgeColor: "#F59E0B",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <line strokeLinecap="round" strokeLinejoin="round" x1="18" y1="20" x2="18" y2="10" />
        <line strokeLinecap="round" strokeLinejoin="round" x1="12" y1="20" x2="12" y2="4" />
        <line strokeLinecap="round" strokeLinejoin="round" x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    href: "/dashboard/automations/live-triggers",
    label: "Live Comment Trigger",
    desc: "During your Instagram Live, send Zoom/Meet links on comment",
    color: "#EF4444",
    badge: "Live",
    badgeColor: "#EF4444",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <polygon strokeLinecap="round" strokeLinejoin="round" points="23 7 16 12 23 17 23 7" />
        <rect strokeLinecap="round" strokeLinejoin="round" x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
];

const TRIGGER_LABEL: Record<string, string> = {
  comment_keyword: "Comment keyword",
  story_reply: "Story reply",
  story_poll_vote: "Story poll",
  dm_keyword: "DM keyword",
  live_comment: "Live comment",
  mention: "Mention",
};

export default async function AutomationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: automations } = await supabase
    .from("automations")
    .select("id, name, trigger_type, trigger_config, actions, is_active, reply_once, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: dmStats } = await supabase
    .from("dm_logs")
    .select("automation_id, status")
    .in("automation_id", (automations ?? []).map((a) => a.id));

  const statsByAutomation: Record<string, { sent: number; skipped: number }> = {};
  for (const log of dmStats ?? []) {
    if (!statsByAutomation[log.automation_id]) statsByAutomation[log.automation_id] = { sent: 0, skipped: 0 };
    if (log.status === "sent") statsByAutomation[log.automation_id].sent++;
    if (log.status === "skipped") statsByAutomation[log.automation_id].skipped++;
  }

  return (
    <div className="max-w-2xl mx-auto md:max-w-none">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Automations</h2>
        <p className="text-[#71717A] text-sm">Manage your active automations or create a new one.</p>
      </div>

      {/* ── Active automations ── */}
      {(automations ?? []).length > 0 && (
        <div className="mb-8">
          <p className="text-[#52525B] text-xs uppercase tracking-widest font-medium mb-3 px-1">
            Your automations
          </p>
          <div className="space-y-3">
            {automations!.map((a) => {
              const keywords = (a.trigger_config as { keywords?: string[] })?.keywords ?? [];
              const action = (a.actions as Array<{ message?: string; link?: string | null }>)?.[0];
              const stats = statsByAutomation[a.id] ?? { sent: 0, skipped: 0 };
              return (
                <div
                  key={a.id}
                  className={`bg-[#18181B] border rounded-2xl p-4 transition-colors ${
                    a.is_active ? "border-[#27272A]" : "border-[#27272A] opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {a.is_active ? (
                          <span className="flex items-center gap-1 text-[#22C55E] text-[10px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="text-[#52525B] text-[10px] font-semibold">Paused</span>
                        )}
                        <span className="text-[#3F3F46] text-[10px]">•</span>
                        <span className="text-[#52525B] text-[10px]">
                          {TRIGGER_LABEL[a.trigger_type] ?? a.trigger_type}
                        </span>
                      </div>

                      <p className="text-white font-semibold text-sm truncate">{a.name}</p>

                      {keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {keywords.map((kw: string) => (
                            <span
                              key={kw}
                              className="text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[10px] font-bold px-2 py-0.5 rounded-md"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}

                      {action?.message && (
                        <p className="text-[#52525B] text-xs mt-2 line-clamp-1">
                          → {action.message}
                          {action.link ? ` · ${action.link}` : ""}
                        </p>
                      )}

                      <div className="flex gap-4 mt-3">
                        <span className="text-[#A1A1AA] text-xs">
                          <span className="text-white font-semibold">{stats.sent}</span> DMs sent
                        </span>
                        <span className="text-[#A1A1AA] text-xs">
                          <span className="text-[#52525B] font-semibold">{stats.skipped}</span> skipped
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <form action={toggleAutomation}>
                        <input type="hidden" name="id" value={a.id} />
                        <input type="hidden" name="is_active" value={String(a.is_active)} />
                        <button
                          type="submit"
                          className={`relative w-10 h-5 rounded-full transition-colors ${
                            a.is_active ? "bg-[#8B5CF6]" : "bg-[#27272A]"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                              a.is_active ? "translate-x-5" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </form>

                      <form action={deleteAutomation}>
                        <input type="hidden" name="id" value={a.id} />
                        <button
                          type="submit"
                          className="text-[#52525B] hover:text-[#EF4444] text-xs transition-colors"
                          onClick={(e) => {
                            if (!confirm("Delete this automation?")) e.preventDefault();
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Create new ── */}
      <div>
        <p className="text-[#52525B] text-xs uppercase tracking-widest font-medium mb-3 px-1">
          Create new automation
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {AUTOMATION_TYPES.map((type) => (
            <Link
              key={type.href}
              href={type.href}
              className="group bg-[#18181B] border border-[#27272A] rounded-2xl p-5 hover:border-[#3F3F46] active:scale-[0.98] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${type.color}15`, border: `1px solid ${type.color}25` }}
                >
                  <span style={{ color: type.color }}>{type.icon}</span>
                </div>
                <span
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                  style={{ color: type.badgeColor, backgroundColor: `${type.badgeColor}15`, border: `1px solid ${type.badgeColor}25` }}
                >
                  {type.badge}
                </span>
              </div>
              <h3 className="text-white font-semibold text-base mb-1.5">{type.label}</h3>
              <p className="text-[#71717A] text-sm leading-relaxed">{type.desc}</p>
              <div className="flex items-center gap-1 mt-4 text-xs font-medium" style={{ color: type.color }}>
                Set up
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
