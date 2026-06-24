import Link from "next/link";

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

export default function AutomationsPage() {
  return (
    <div className="max-w-2xl mx-auto md:max-w-none">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Automations</h2>
        <p className="text-[#71717A] text-sm">Choose a type to set up your first automation.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {AUTOMATION_TYPES.map((type) => (
          <Link
            key={type.href}
            href={type.href}
            className="group bg-[#18181B] border border-[#27272A] rounded-2xl p-5 hover:border-[#3F3F46] active:scale-[0.98] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${type.color}15`, border: `1px solid ${type.color}25` }}>
                <span style={{ color: type.color }}>{type.icon}</span>
              </div>
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={{ color: type.badgeColor, backgroundColor: `${type.badgeColor}15`, border: `1px solid ${type.badgeColor}25` }}>
                {type.badge}
              </span>
            </div>
            <h3 className="text-white font-semibold text-base mb-1.5">{type.label}</h3>
            <p className="text-[#71717A] text-sm leading-relaxed">{type.desc}</p>
            <div className="flex items-center gap-1 mt-4 text-xs font-medium" style={{ color: type.color }}>
              Set up
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
