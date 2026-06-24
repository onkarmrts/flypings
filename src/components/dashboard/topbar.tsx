"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/automations": "Automations",
  "/dashboard/automations/comment-to-dm": "Comment → DM",
  "/dashboard/automations/story-poll": "Story Poll Funnel",
  "/dashboard/automations/upi-commerce": "UPI Commerce",
  "/dashboard/automations/live-triggers": "Live Triggers",
  "/dashboard/leads": "Leads",
  "/dashboard/analytics": "Analytics",
  "/dashboard/settings": "Settings",
  "/dashboard/settings/instagram": "Connect Instagram",
  "/dashboard/settings/billing": "Billing",
};

function IconBell({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function Topbar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <header className="h-16 border-b border-[#27272A] bg-[#09090B]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger — functionality can be wired up later */}
        <button className="md:hidden text-[#71717A] hover:text-white transition-colors">
          <IconMenu className="w-5 h-5" />
        </button>
        <h1 className="text-white font-semibold text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#27272A] transition-colors text-[#71717A] hover:text-white">
          <IconBell className="w-4.5 h-4.5" />
          {/* Unread dot */}
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#EC4899]" />
        </button>

        {/* Docs link */}
        <a
          href="#"
          className="hidden sm:flex h-9 items-center gap-1.5 border border-[#3F3F46] text-[#A1A1AA] hover:text-white hover:border-[#52525B] px-3 rounded-lg text-xs transition-colors"
        >
          Docs
        </a>
      </div>
    </header>
  );
}
