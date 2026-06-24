import Link from "next/link";

const SETTINGS_SECTIONS = [
  {
    href: "/dashboard/settings/instagram",
    label: "Instagram Account",
    desc: "Connect or manage your Instagram Professional account",
    color: "#8B5CF6",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    href: "/dashboard/settings/billing",
    label: "Billing & Plan",
    desc: "Manage your subscription and payment details",
    color: "#22C55E",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
];

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto md:max-w-lg">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Settings</h2>
        <p className="text-[#71717A] text-sm">Manage your account and preferences.</p>
      </div>

      <div className="space-y-3">
        {SETTINGS_SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex items-center gap-4 bg-[#18181B] border border-[#27272A] rounded-2xl p-4 hover:border-[#3F3F46] active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}15`, border: `1px solid ${s.color}25` }}>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold">{s.label}</p>
              <p className="text-[#71717A] text-xs mt-0.5">{s.desc}</p>
            </div>
            <svg className="w-4 h-4 text-[#52525B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
