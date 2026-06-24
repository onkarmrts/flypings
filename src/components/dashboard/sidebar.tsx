"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils/cn";

/* ─── Icons ───────────────────────────────────────────────────────────────── */
function IconHome({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconZap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconBarChart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconSettings({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconLogOut({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IconPlus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ─── Nav items ───────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", Icon: IconHome, exact: true },
  { href: "/dashboard/automations", label: "Automations", Icon: IconZap, exact: false },
  { href: "/dashboard/leads", label: "Leads", Icon: IconUsers, exact: false },
  { href: "/dashboard/analytics", label: "Analytics", Icon: IconBarChart, exact: false },
  { href: "/dashboard/settings", label: "Settings", Icon: IconSettings, exact: false },
];

/* ─── Sidebar ─────────────────────────────────────────────────────────────── */
interface SidebarProps {
  user: { name: string | null; email: string; avatarUrl: string | null } | null;
  planId?: string | null;
  igConnected?: boolean;
}

export function Sidebar({ user, planId, igConnected = false }: SidebarProps) {
  const pathname = usePathname();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-[#18181B] border-r border-[#27272A] flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 h-16 flex items-center border-b border-[#27272A]">
        <Logo size="sm" />
      </div>

      {/* Instagram account status */}
      <div className="px-4 pt-4 pb-3">
        {igConnected ? (
          <div className="flex items-center gap-2.5 bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2.5">
            <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center flex-shrink-0">
              <IconInstagram className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">@yourhandle</p>
              <p className="text-[#22C55E] text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] inline-block" />
                Connected
              </p>
            </div>
          </div>
        ) : (
          <Link
            href="/dashboard/settings/instagram"
            className="flex items-center gap-2.5 bg-[#8B5CF610] border border-[#8B5CF630] rounded-xl px-3 py-2.5 hover:bg-[#8B5CF620] transition-colors w-full group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#8B5CF620] border border-[#8B5CF640] flex items-center justify-center flex-shrink-0">
              <IconInstagram className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#8B5CF6] text-xs font-medium">Connect Instagram</p>
              <p className="text-[#71717A] text-[10px]">Required to start</p>
            </div>
            <IconPlus className="w-3.5 h-3.5 text-[#8B5CF6] group-hover:scale-110 transition-transform flex-shrink-0" />
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        <p className="text-[#52525B] text-[10px] uppercase tracking-widest font-medium px-3 py-2">Menu</p>
        {NAV_ITEMS.map(({ href, label, Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "gradient-brand text-white shadow-sm shadow-[#8B5CF640]"
                  : "text-[#71717A] hover:text-white hover:bg-[#27272A]"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: plan + user */}
      <div className="px-3 pb-4 border-t border-[#27272A] pt-3 space-y-3">
        {/* Plan badge */}
        {planId && (
          <div className="px-3 py-2 bg-[#09090B] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#52525B] uppercase tracking-widest">Current Plan</p>
              <p className="text-sm font-semibold gradient-text capitalize">{planId}</p>
            </div>
            <Link
              href="/dashboard/settings/billing"
              className="text-[10px] text-[#71717A] hover:text-white transition-colors border border-[#3F3F46] px-2 py-1 rounded-md"
            >
              Upgrade
            </Link>
          </div>
        )}

        {/* User row */}
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-[#27272A] transition-colors group cursor-pointer">
          <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{user?.name ?? user?.email}</p>
            <p className="text-[#52525B] text-[10px] truncate">{user?.email}</p>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <IconLogOut className="w-3.5 h-3.5 text-[#71717A] hover:text-white" />
          </button>
        </div>
      </div>
    </aside>
  );
}
