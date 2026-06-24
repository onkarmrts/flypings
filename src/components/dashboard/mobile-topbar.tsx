"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const PAGE_TITLES: Record<string, { title: string; back?: string }> = {
  "/dashboard": { title: "Overview" },
  "/dashboard/automations": { title: "Automations" },
  "/dashboard/automations/comment-to-dm": { title: "Comment → DM", back: "/dashboard/automations" },
  "/dashboard/automations/story-poll": { title: "Story Poll", back: "/dashboard/automations" },
  "/dashboard/automations/upi-commerce": { title: "UPI Commerce", back: "/dashboard/automations" },
  "/dashboard/automations/live-triggers": { title: "Live Triggers", back: "/dashboard/automations" },
  "/dashboard/leads": { title: "Leads" },
  "/dashboard/analytics": { title: "Analytics" },
  "/dashboard/settings": { title: "Settings" },
  "/dashboard/settings/instagram": { title: "Connect Instagram", back: "/dashboard/settings" },
  "/dashboard/settings/billing": { title: "Billing", back: "/dashboard/settings" },
};

export function MobileTopbar() {
  const pathname = usePathname();
  const meta = PAGE_TITLES[pathname] ?? { title: "Dashboard" };

  return (
    <header className="sticky top-0 z-40 bg-[#09090B]/90 backdrop-blur-xl border-b border-[#27272A] md:hidden">
      <div className="flex items-center justify-between px-4 h-14 gap-3">

        {/* Left: back button OR logo */}
        {meta.back ? (
          <Link
            href={meta.back}
            className="flex items-center gap-1 text-[#A1A1AA] hover:text-white transition-colors shrink-0 -ml-1 px-1 py-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </Link>
        ) : (
          <Logo size="sm" />
        )}

        {/* Center: page title (only on sub-pages with back button) */}
        {meta.back && (
          <h1 className="absolute left-1/2 -translate-x-1/2 text-white font-semibold text-base truncate max-w-[160px] text-center">
            {meta.title}
          </h1>
        )}

        {/* Right: notification bell */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[#71717A] hover:text-white active:bg-[#27272A] transition-colors shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EC4899] border-2 border-[#09090B]" />
        </button>

      </div>
    </header>
  );
}
