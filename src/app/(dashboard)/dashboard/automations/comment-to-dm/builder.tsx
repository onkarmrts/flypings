"use client";

import { useState, useTransition } from "react";
import { saveCommentToDM, type SaveResult } from "./actions";

/* ─── Keyword presets ─────────────────────────────────────────────────────── */
const KEYWORD_PRESETS = ["LINK", "FREE", "BUY", "JOIN", "INFO", "YES"];

/* ─── DM Preview ──────────────────────────────────────────────────────────── */
function DMPreview({ message, link, keyword }: { message: string; link: string; keyword: string }) {
  const preview = message
    .replace(/\{\{name\}\}/gi, "Priya")
    .replace(/\{\{username\}\}/gi, "@priya_sharma")
    .replace(/\{\{keyword\}\}/gi, keyword || "LINK");

  const finalMessage = link ? `${preview}\n\n${link}` : preview;

  return (
    <div className="bg-[#09090B] border border-[#27272A] rounded-2xl overflow-hidden">
      {/* IG DM header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#27272A]">
        <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          F
        </div>
        <div>
          <p className="text-white text-xs font-semibold">Flypings Bot</p>
          <p className="text-[#52525B] text-[10px]">Instagram DM</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          <span className="text-[#22C55E] text-[10px] font-medium">Live preview</span>
        </div>
      </div>

      {/* Mock conversation */}
      <div className="px-4 py-4 space-y-3">
        {/* Their comment (simulated) */}
        <div className="flex items-end gap-2">
          <div className="w-7 h-7 rounded-full bg-[#27272A] flex items-center justify-center text-[#71717A] text-[10px] font-bold flex-shrink-0">
            P
          </div>
          <div className="bg-[#27272A] rounded-2xl rounded-bl-sm px-3 py-2 max-w-[70%]">
            <p className="text-white text-xs">{keyword || "LINK"}</p>
            <p className="text-[#52525B] text-[10px] mt-0.5">Comment on your Reel</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center gap-2 px-2">
          <div className="flex-1 h-px bg-[#27272A]" />
          <span className="text-[10px] text-[#52525B] whitespace-nowrap">Flypings fires instantly ⚡</span>
          <div className="flex-1 h-px bg-[#27272A]" />
        </div>

        {/* Your auto-DM */}
        <div className="flex items-end gap-2 flex-row-reverse">
          <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
            You
          </div>
          <div className="max-w-[80%]">
            <div className="bg-[#8B5CF6] rounded-2xl rounded-br-sm px-3 py-2.5">
              {finalMessage ? (
                <p className="text-white text-xs leading-relaxed whitespace-pre-line">{finalMessage}</p>
              ) : (
                <p className="text-white/50 text-xs italic">Your message will appear here…</p>
              )}
            </div>
            <p className="text-[#52525B] text-[10px] text-right mt-1">Delivered ✓✓</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section wrapper ─────────────────────────────────────────────────────── */
function Section({
  step,
  title,
  desc,
  children,
}: {
  step: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-7 h-7 gradient-brand rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
          {step}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{title}</p>
          {desc && <p className="text-[#71717A] text-xs mt-0.5">{desc}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─── Toggle ──────────────────────────────────────────────────────────────── */
function Toggle({
  checked,
  onChange,
  label,
  sublabel,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  sublabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full text-left"
    >
      <div>
        <p className="text-white text-sm font-medium">{label}</p>
        {sublabel && <p className="text-[#71717A] text-xs mt-0.5">{sublabel}</p>}
      </div>
      <div
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
          checked ? "bg-[#8B5CF6]" : "bg-[#27272A]"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </div>
    </button>
  );
}

/* ─── Builder ─────────────────────────────────────────────────────────────── */
export function CommentToDMBuilder({ igConnected }: { igConnected: boolean }) {
  const [keyword, setKeyword]         = useState("LINK");
  const [customKeyword, setCustom]    = useState("");
  const [isCustom, setIsCustom]       = useState(false);
  const [message, setMessage]         = useState("Hey {{name}}! Here's your link 👇");
  const [link, setLink]               = useState("");
  const [postScope, setPostScope]     = useState<"all" | "specific">("all");
  const [postUrl, setPostUrl]         = useState("");
  const [replyOnce, setReplyOnce]     = useState(true);
  const [result, setResult]           = useState<SaveResult | null>(null);
  const [isPending, startTransition]  = useTransition();

  const activeKeyword = isCustom ? customKeyword : keyword;

  function handlePreset(preset: string) {
    setIsCustom(false);
    setKeyword(preset);
  }

  function handleCustomClick() {
    setIsCustom(true);
    setKeyword("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!igConnected) return;
    const fd = new FormData(e.currentTarget);
    fd.set("keyword", activeKeyword);
    fd.set("reply_once", String(replyOnce));
    fd.set("post_scope", postScope);
    startTransition(async () => {
      const res = await saveCommentToDM(fd);
      setResult(res);
    });
  }

  if (!igConnected) {
    return (
      <div className="bg-[#18181B] border border-[#8B5CF6]/30 rounded-2xl p-8 flex flex-col items-center text-center">
        <div className="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </div>
        <p className="text-white font-bold text-lg mb-1">Connect Instagram first</p>
        <p className="text-[#71717A] text-sm mb-5 max-w-xs">
          You need to link your Instagram account before setting up automations.
        </p>
        <a
          href="/dashboard/settings/instagram"
          className="gradient-brand text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
        >
          Connect Instagram →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4 items-start">
        {/* ── Left column: form ── */}
        <div className="space-y-3">

          {/* Step 1: Keyword */}
          <Section step="1" title="Choose your trigger word" desc="Your follower must comment this exact word to receive the DM.">
            {/* Preset chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {KEYWORD_PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePreset(p)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                    !isCustom && keyword === p
                      ? "gradient-brand text-white border-transparent"
                      : "border-[#3F3F46] text-[#A1A1AA] hover:border-[#52525B] hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={handleCustomClick}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                  isCustom
                    ? "border-[#8B5CF6] text-[#8B5CF6]"
                    : "border-[#3F3F46] text-[#A1A1AA] hover:border-[#52525B] hover:text-white"
                }`}
              >
                Custom…
              </button>
            </div>

            {isCustom && (
              <input
                autoFocus
                value={customKeyword}
                onChange={(e) => setCustom(e.target.value.toUpperCase())}
                placeholder="Type your keyword (e.g. COURSE)"
                className="w-full bg-[#09090B] border border-[#3F3F46] text-white rounded-xl px-4 py-3 text-sm placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6] uppercase font-semibold"
              />
            )}

            <p className="text-[#52525B] text-xs mt-2">
              Your caption should say: <span className="text-[#A1A1AA]">"Comment <span className="text-[#8B5CF6] font-semibold">{activeKeyword || "LINK"}</span> below to get the link!"</span>
            </p>
          </Section>

          {/* Step 2: DM Message */}
          <Section step="2" title="Write your DM message" desc="This is exactly what your follower will receive.">
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hey {{name}}! Here's what you asked for 👇"
              rows={4}
              className="w-full bg-[#09090B] border border-[#3F3F46] text-white rounded-xl px-4 py-3 text-sm placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6] resize-none leading-relaxed"
            />
            {/* Variable hints */}
            <div className="flex gap-2 mt-2 flex-wrap">
              {[
                { tag: "{{name}}", label: "their name" },
                { tag: "{{username}}", label: "@handle" },
              ].map(({ tag, label }) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setMessage((m) => m + tag)}
                  className="text-[10px] bg-[#27272A] hover:bg-[#3F3F46] text-[#A1A1AA] px-2 py-1 rounded-md transition-colors"
                >
                  + {tag} <span className="text-[#52525B]">({label})</span>
                </button>
              ))}
            </div>
          </Section>

          {/* Step 3: Link */}
          <Section step="3" title="Add your link" desc="Optional — paste the link you want to share (course, PDF, page, etc.)">
            <input
              name="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://your-link-here.com"
              className="w-full bg-[#09090B] border border-[#3F3F46] text-white rounded-xl px-4 py-3 text-sm placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6]"
            />
            <p className="text-[#52525B] text-xs mt-2">Leave blank if your message already contains the link.</p>
          </Section>

          {/* Step 4: Which posts */}
          <Section step="4" title="Which posts should trigger this?" desc="">
            <div className="space-y-2">
              {[
                { value: "all", label: "All my posts and Reels", sub: "Recommended — works everywhere" },
                { value: "specific", label: "A specific post only", sub: "Paste the Instagram post URL" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPostScope(opt.value as "all" | "specific")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                    postScope === opt.value
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/8"
                      : "border-[#27272A] hover:border-[#3F3F46]"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    postScope === opt.value ? "border-[#8B5CF6]" : "border-[#3F3F46]"
                  }`}>
                    {postScope === opt.value && <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{opt.label}</p>
                    <p className="text-[#52525B] text-xs">{opt.sub}</p>
                  </div>
                </button>
              ))}
            </div>

            {postScope === "specific" && (
              <input
                name="post_url"
                type="url"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                placeholder="https://www.instagram.com/p/..."
                className="mt-3 w-full bg-[#09090B] border border-[#3F3F46] text-white rounded-xl px-4 py-3 text-sm placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6]"
              />
            )}
          </Section>

          {/* Step 5: Settings */}
          <Section step="5" title="Settings" desc="">
            <Toggle
              checked={replyOnce}
              onChange={setReplyOnce}
              label="Don't DM the same person twice"
              sublabel="Recommended — avoids spamming your followers"
            />
          </Section>

          {/* Error */}
          {result && !result.success && (
            <div className="bg-[#7F1D1D22] border border-[#EF444440] rounded-xl px-4 py-3 text-sm text-[#EF4444]">
              {result.error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending || !activeKeyword || !message}
            className="w-full gradient-brand text-white font-bold py-4 rounded-2xl text-base hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Activating…
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <polygon strokeLinecap="round" strokeLinejoin="round" points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Activate automation
              </>
            )}
          </button>

          <p className="text-center text-xs text-[#52525B]">
            Goes live instantly. You can pause it anytime.
          </p>
        </div>

        {/* ── Right column: preview ── */}
        <div className="md:sticky md:top-24 space-y-4">
          <div>
            <p className="text-[#71717A] text-xs uppercase tracking-widest font-medium mb-3 px-1">Live Preview</p>
            <DMPreview message={message} link={link} keyword={activeKeyword} />
          </div>

          {/* Tips */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-4">
            <p className="text-white text-xs font-semibold mb-3">Tips for more comments 💡</p>
            <ul className="space-y-2.5">
              {[
                { tip: "Put the keyword in your caption early", eg: '"Comment LINK below 👇"' },
                { tip: "Use it in the first 3 seconds of your Reel", eg: "Say it out loud in the video" },
                { tip: "Short keywords work best", eg: '"LINK", "FREE", "YES"' },
              ].map(({ tip, eg }) => (
                <li key={tip} className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-[#8B5CF6] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <polyline strokeLinecap="round" strokeLinejoin="round" points="20 6 9 17 4 12" />
                  </svg>
                  <div>
                    <p className="text-[#A1A1AA] text-xs">{tip}</p>
                    <p className="text-[#52525B] text-[10px] mt-0.5">{eg}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Hidden fields */}
      <input type="hidden" name="post_scope" value={postScope} />
      <input type="hidden" name="post_url" value={postUrl} />
      <input type="hidden" name="reply_once" value={String(replyOnce)} />
    </form>
  );
}
