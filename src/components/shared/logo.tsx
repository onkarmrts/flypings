"use client";

import { useId } from "react";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { icon: 26, text: "text-base" },
  md: { icon: 32, text: "text-xl" },
  lg: { icon: 40, text: "text-2xl" },
};

export function Logo({ size = "md", className }: LogoProps) {
  const id = useId().replace(/:/g, "");
  const gradId = `logo-grad-${id}`;
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        {/* Paper plane */}
        <path d="M36 4L4 16.5L16 22L22 36L36 4Z" fill={`url(#${gradId})`} />
        <path d="M16 22L22 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      <span className={cn("font-bold tracking-tight text-white leading-none", s.text)}>
        fly<span className="gradient-text">pings</span>
      </span>
    </div>
  );
}
