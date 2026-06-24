"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo";

/* ─── Icon components ─────────────────────────────────────────────────────── */
function IconComment({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconRupee({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="18" y2="3" />
      <line x1="6" y1="8" x2="18" y2="8" />
      <line x1="6" y1="13" x2="11" y2="13" />
      <polyline points="11 8 11 22 20 13" />
    </svg>
  );
}

function IconPoll({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconLive({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function IconSparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IconZap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconTrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

/* ─── Nav ─────────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-[#27272A]/60 bg-[#09090B]/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Logo size="sm" />

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-[#A1A1AA] hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-[#A1A1AA] hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="text-sm text-[#A1A1AA] hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-[#A1A1AA] hover:text-white transition-colors hidden sm:block">
            Sign in
          </Link>
          <Link
            href="/login"
            className="gradient-brand text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            Start free
            <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
function FloatingDMCard({
  delay,
  className,
  avatar,
  name,
  message,
  tag,
  tagColor,
}: {
  delay: string;
  className: string;
  avatar: string;
  name: string;
  message: string;
  tag: string;
  tagColor: string;
}) {
  return (
    <div
      className={`absolute bg-[#18181B] border border-[#3F3F46] rounded-2xl p-4 shadow-2xl backdrop-blur-sm w-64 ${className}`}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white text-sm font-medium truncate">{name}</span>
            <span
              className="text-xs px-1.5 py-0.5 rounded-md font-medium flex-shrink-0"
              style={{ color: tagColor, backgroundColor: `${tagColor}20` }}
            >
              {tag}
            </span>
          </div>
          <p className="text-[#A1A1AA] text-xs leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[400px] bg-[#EC4899]/8 rounded-full blur-[120px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left: Copy */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#3F3F46] bg-[#18181B] rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-sm text-[#A1A1AA]">Built for Indian creators</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
            <span className="text-white">Turn your audience</span>
            <br />
            <span className="text-white">into income</span>
            <br />
            <span className="gradient-text">automatically.</span>
          </h1>

          <p className="text-lg text-[#A1A1AA] max-w-lg mb-8 leading-relaxed">
            Flypings converts every Instagram comment, story poll, and live session into leads and paying customers —
            with zero manual work. No website. No checkout page. Just your content.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-6 mb-10">
            {[
              { value: "500+", label: "Creators" },
              { value: "12L+", label: "DMs sent" },
              { value: "₹2Cr+", label: "Revenue generated" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-[#71717A]">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/login"
              className="gradient-brand glow-brand text-white font-semibold px-7 py-3.5 rounded-xl text-base hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              Start for free
              <IconArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="border border-[#3F3F46] text-[#A1A1AA] hover:text-white hover:border-[#52525B] px-7 py-3.5 rounded-xl text-base transition-all text-center"
            >
              See how it works
            </a>
          </div>

          <p className="mt-4 text-xs text-[#52525B]">
            Free 7-day trial · No credit card · Cancel anytime
          </p>
        </div>

        {/* Right: Floating DM cards */}
        <div className="relative hidden lg:block h-[520px]">
          {/* Center flow illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Instagram post mock */}
            <div className="relative w-56 h-72 bg-[#18181B] border border-[#3F3F46] rounded-2xl overflow-hidden shadow-2xl">
              {/* Post image area */}
              <div className="h-40 gradient-brand opacity-30 flex items-center justify-center">
                <svg className="w-12 h-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={1.5} />
                  <circle cx="8.5" cy="8.5" r="1.5" strokeWidth={1.5} />
                  <polyline points="21 15 16 10 5 21" strokeWidth={1.5} />
                </svg>
              </div>
              {/* Post content */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full gradient-brand" />
                  <span className="text-white text-xs font-medium">@yourhandle</span>
                </div>
                <p className="text-[#A1A1AA] text-xs leading-relaxed">
                  Comment <span className="text-[#8B5CF6] font-semibold">LINK</span> below to get my free guide! 👇
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#71717A]">
                    <IconComment className="w-3 h-3" />
                    <span className="text-xs">847</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow down */}
            <div className="absolute top-[230px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-gradient-to-b from-[#8B5CF6] to-[#EC4899]" />
              <div className="w-2 h-2 rounded-full bg-[#EC4899]" />
            </div>
          </div>

          {/* Floating notification: comment trigger */}
          <div className="absolute top-6 -left-4 bg-[#18181B] border border-[#3F3F46] rounded-2xl p-3.5 shadow-2xl w-60 animate-bounce" style={{ animationDuration: "3s" }}>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-full bg-[#8B5CF620] border border-[#8B5CF640] flex items-center justify-center">
                <IconComment className="w-3.5 h-3.5 text-[#8B5CF6]" />
              </div>
              <span className="text-xs text-[#71717A]">New comment on your Reel</span>
            </div>
            <div className="bg-[#09090B] rounded-lg px-3 py-2">
              <span className="text-xs text-[#A1A1AA]"><span className="text-white font-medium">@priya_sharma</span> commented: <span className="text-[#8B5CF6] font-medium">LINK</span></span>
            </div>
          </div>

          {/* Floating notification: DM sent */}
          <FloatingDMCard
            className="top-14 -right-6 animate-bounce"
            delay="1.5s"
            avatar="P"
            name="DM sent to @priya_sharma"
            message="Hey Priya! Here's your free guide link 🎉 →"
            tag="Instant"
            tagColor="#22C55E"
          />

          {/* Floating notification: UPI */}
          <FloatingDMCard
            className="bottom-24 -left-8 animate-bounce"
            delay="0.8s"
            avatar="R"
            name="UPI link sent to @rahul_coach"
            message="Pay ₹999 directly → upi://pay?pa=you@upi"
            tag="Paid"
            tagColor="#EC4899"
          />

          {/* Floating stat */}
          <div
            className="absolute bottom-10 -right-2 bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 shadow-2xl animate-bounce"
            style={{ animationDuration: "4s", animationDelay: "2s" }}
          >
            <div className="flex items-center gap-2">
              <IconTrendingUp className="w-4 h-4 text-[#22C55E]" />
              <div>
                <div className="text-white text-sm font-bold">847 DMs</div>
                <div className="text-[#71717A] text-xs">sent in last hour</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Social Proof Strip ──────────────────────────────────────────────────── */
function SocialProof() {
  const logos = ["Coaches", "Course Creators", "Fitness Trainers", "Nutritionists", "Finance Creators", "Fashion Influencers", "Educators", "Artists"];
  return (
    <div className="border-y border-[#27272A] py-5 overflow-hidden bg-[#18181B]/30">
      <p className="text-center text-xs text-[#52525B] uppercase tracking-widest mb-5">Trusted by creators across these niches</p>
      <div className="flex gap-8 overflow-hidden">
        <div className="flex gap-8 animate-none flex-wrap justify-center">
          {logos.map((l) => (
            <span key={l} className="text-sm text-[#52525B] whitespace-nowrap font-medium px-4 py-1.5 border border-[#27272A] rounded-full">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Features ────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    Icon: IconComment,
    tag: "Most Popular",
    tagColor: "#8B5CF6",
    title: "Comment Karo, Link Pao",
    description:
      "Caption says 'Comment LINK' → follower comments → they instantly receive your link in DMs. Instagram rewards the comments with reach. You get leads.",
    bullets: ["Works on any post or Reel", "Instant DM, under 3 seconds", "Never DMs same person twice per post"],
  },
  {
    Icon: IconRupee,
    tag: "India Exclusive",
    tagColor: "#EC4899",
    title: "Comment BUY → UPI Payment",
    description:
      "Someone comments 'BUY' → they get a direct UPI payment link → they pay → they auto-receive the product. Full commerce in under 60 seconds. No website needed.",
    bullets: ["Direct UPI deep links (upi://pay)", "Auto-delivers content after payment", "Works for courses, presets, PDFs, merch"],
  },
  {
    Icon: IconPoll,
    tag: "Nobody Has This",
    tagColor: "#F59E0B",
    title: "Story Poll → Personalized DM",
    description:
      "Poll: 'What's your problem? A) No clients B) No time' → Vote A gets client tips DM → Vote B gets productivity DM. Hyper-personalized at zero effort.",
    bullets: ["Up to 4 poll options, unique DM each", "Auto-segments your audience for you", "ManyChat doesn't support this"],
  },
  {
    Icon: IconLive,
    tag: "Live Feature",
    tagColor: "#EF4444",
    title: "Instagram Live Triggers",
    description:
      "Tell viewers to comment 'JOIN' during your live → they instantly get the Zoom or Meet link in DMs. No link in bio fumbling. Works for 1000s simultaneously.",
    bullets: ["Works during Instagram Live", "Any keyword you choose", "Handles thousands of comments/min"],
  },
  {
    Icon: IconSparkle,
    tag: "AI Powered",
    tagColor: "#3B82F6",
    title: "AI-Personalized DMs",
    description:
      "'Hey Priya, here's your guide!' — every DM uses the commenter's name. Feels human, builds trust, converts better. Supports Hindi and regional languages.",
    bullets: ["Uses commenter's real name", "Hindi, Marathi, Tamil templates", "Feels personal, scales to millions"],
  },
  {
    Icon: IconWhatsApp,
    tag: "WhatsApp Bridge",
    tagColor: "#22C55E",
    title: "Move Leads to WhatsApp",
    description:
      "After the Instagram DM, offer 'Continue on WhatsApp' → captures their phone number with consent. Build your WhatsApp list without spending on ads.",
    bullets: ["Legal, consent-based opt-in", "Auto-adds to your WhatsApp list", "Works with any automation type"],
  },
];

function Features() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-sm text-[#8B5CF6] font-medium uppercase tracking-wider mb-3">Creator Toolkit</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Six automations no other<br />Indian tool has built
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Each one is a revenue lever. Pick the ones that fit your content. Stack them for maximum growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group relative bg-[#18181B] border border-[#27272A] rounded-2xl p-6 hover:border-[#3F3F46] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${f.tagColor}15`, border: `1px solid ${f.tagColor}30` }}
              >
                <f.Icon className="w-5 h-5" style={{ color: f.tagColor } as React.CSSProperties} />
              </div>

              {/* Tag */}
              <span
                className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3"
                style={{ color: f.tagColor, backgroundColor: `${f.tagColor}15`, border: `1px solid ${f.tagColor}25` }}
              >
                {f.tag}
              </span>

              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-[#71717A] leading-relaxed mb-5">{f.description}</p>

              <ul className="space-y-2.5 pt-5 border-t border-[#27272A]">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                    <IconCheck className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ────────────────────────────────────────────────────────── */
const STEPS = [
  {
    Icon: IconUsers,
    n: "01",
    title: "Connect your Instagram",
    desc: "Link your Professional or Creator Instagram account. One click, 30 seconds. Flypings gets read-only access to your comments.",
  },
  {
    Icon: IconZap,
    n: "02",
    title: "Build your automation",
    desc: "Choose a trigger (comment keyword, story poll, live comment) and write your DM. Use templates or create your own.",
  },
  {
    Icon: IconComment,
    n: "03",
    title: "Post and tell your audience",
    desc: "Say 'Comment LINK below' in your caption. Or 'Vote in my story poll.' Your followers do the rest.",
  },
  {
    Icon: IconTrendingUp,
    n: "04",
    title: "Watch revenue grow",
    desc: "Every matching comment or vote triggers an instant DM. Leads, sales, and conversions — tracked in your dashboard.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#EC4899]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-sm text-[#EC4899] font-medium uppercase tracking-wider mb-3">Simple Setup</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Up in 5 minutes</h2>
          <p className="text-[#A1A1AA] text-lg">If you can post a Reel, you can use Flypings.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-11 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#3F3F46] to-transparent" />

          {STEPS.map((step) => (
            <div key={step.n} className="relative flex flex-col items-center text-center">
              <div className="relative w-[88px] h-[88px] rounded-2xl gradient-brand flex items-center justify-center mb-6 shadow-lg glow-brand z-10">
                <step.Icon className="w-7 h-7 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#09090B] border border-[#3F3F46] rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-[#8B5CF6] font-bold">{step.n}</span>
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-[#71717A] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─────────────────────────────────────────────────────────────── */
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "₹999",
    desc: "For creators just starting out.",
    features: ["1 Instagram account", "3 automations", "500 DMs / month", "Comment-to-DM", "Basic analytics"],
    cta: "Start free trial",
    highlight: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹2,499",
    desc: "For creators monetizing seriously.",
    features: ["3 Instagram accounts", "10 automations each", "3,000 DMs / month", "UPI Payment DMs", "Story Poll funnels", "Lead CRM", "WhatsApp handoff"],
    cta: "Start free trial",
    highlight: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹4,999",
    desc: "For full-time creators and coaches.",
    features: ["10 Instagram accounts", "50 automations each", "15,000 DMs / month", "AI-personalized DMs", "Live triggers", "Lost lead recovery", "Regional language templates"],
    cta: "Start free trial",
    highlight: false,
  },
  {
    id: "agency",
    name: "Agency",
    price: "₹9,999",
    desc: "For agencies managing multiple creators.",
    features: ["50 Instagram accounts", "Unlimited automations", "1,00,000 DMs / month", "Client dashboard", "White-label reports", "Dedicated support", "API access"],
    cta: "Contact sales",
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-sm text-[#8B5CF6] font-medium uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Simple, creator-friendly pricing
          </h2>
          <p className="text-[#A1A1AA] text-lg">7-day free trial on all plans. No card needed.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? "gradient-border bg-[#18181B] shadow-2xl shadow-[#8B5CF620] -mt-4"
                  : "border border-[#27272A] bg-[#18181B] hover:border-[#3F3F46]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="gradient-brand text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-white font-bold text-lg mb-1">{plan.name}</h3>
              <p className="text-[#71717A] text-sm mb-5">{plan.desc}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-[#71717A] text-sm">/mo</span>
              </div>

              <ul className="space-y-3 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                    <IconCheck className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  plan.highlight
                    ? "gradient-brand text-white hover:opacity-90"
                    : "border border-[#3F3F46] text-[#A1A1AA] hover:text-white hover:border-[#52525B]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[#71717A] mt-8">
          Annual billing saves up to 25% · GST applicable · Cancel anytime
        </p>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Is this against Instagram's Terms of Service?",
    a: "No. Flypings uses the official Meta/Instagram Graph API. We only automate DMs to users who actively comment — they're the ones initiating the interaction. This is the same compliant approach used by ManyChat globally.",
  },
  {
    q: "Does my Instagram account need to be Professional?",
    a: "Yes — your account must be a Creator or Business account (free to switch in Instagram settings). Your followers can have any account type.",
  },
  {
    q: "How fast does the DM go out after a comment?",
    a: "Usually within 2–5 seconds. Meta's webhook notifies Flypings the moment a comment hits your post.",
  },
  {
    q: "How do the UPI payment DMs work?",
    a: "You add your UPI ID in settings. When someone comments your trigger word, Flypings generates a upi://pay?pa=yourId deep link and sends it. The user taps it, their UPI app opens pre-filled with the amount. Full payment in under 30 seconds.",
  },
  {
    q: "Can I try it before paying?",
    a: "Yes — all plans come with a 7-day free trial, no credit card required. You get full access to test your first automation before committing.",
  },
];

function FAQ() {
  return (
    <section className="py-28 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-sm text-[#EC4899] font-medium uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-4xl font-bold text-white">Common questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group border border-[#27272A] rounded-2xl bg-[#18181B] open:border-[#3F3F46] transition-all"
            >
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                <span className="text-white font-medium pr-4 text-sm md:text-base">{faq.q}</span>
                <div className="w-6 h-6 rounded-full border border-[#3F3F46] flex items-center justify-center flex-shrink-0 group-open:border-[#8B5CF6] transition-colors">
                  <svg className="w-3 h-3 text-[#71717A] group-open:text-[#8B5CF6] transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </summary>
              <div className="px-6 pb-5 text-sm text-[#A1A1AA] leading-relaxed border-t border-[#27272A] pt-4 mt-0">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─────────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden bg-[#18181B] border border-[#27272A]">
          {/* Background gradient */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#8B5CF6]/15 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 right-1/4 w-[300px] h-[200px] bg-[#EC4899]/10 rounded-full blur-[60px]" />
          </div>

          <div className="relative px-8 py-16 md:px-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Your next comment could be
              <br />
              <span className="gradient-text">your next customer.</span>
            </h2>
            <p className="text-[#A1A1AA] text-lg mb-10 max-w-xl mx-auto">
              Join 500+ Indian creators turning Instagram engagement into real revenue with Flypings.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="gradient-brand glow-brand text-white font-semibold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-all flex items-center gap-2"
              >
                Start for free
                <IconArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="mt-5 text-sm text-[#52525B]">
              7-day free trial · No credit card · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[#27272A] py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <Logo size="sm" className="mb-4" />
            <p className="text-sm text-[#71717A] leading-relaxed">
              India&apos;s first comment-to-commerce engine for Instagram creators.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Changelog", "Roadmap"],
            },
            {
              title: "Creators",
              links: ["Coaches", "Course Creators", "Influencers", "Agencies"],
            },
            {
              title: "Company",
              links: ["About", "Privacy Policy", "Terms of Service", "Contact"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-white text-sm font-semibold mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-[#71717A] hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#27272A] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#52525B]">© 2024 Flypings Technologies Pvt. Ltd. Made in India.</p>
          <p className="text-sm text-[#52525B]">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <Nav />
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
