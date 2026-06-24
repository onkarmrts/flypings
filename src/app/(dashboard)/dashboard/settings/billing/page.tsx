import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/db/supabase-server";
import { PLANS } from "@/types/subscription";

export const metadata = { title: "Billing & Plan" };

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan_id, trial_ends_at")
    .eq("id", user.id)
    .single();

  const currentPlanId = profile?.plan_id ?? null;
  const trialEnds     = profile?.trial_ends_at
    ? new Date(profile.trial_ends_at)
    : null;
  const isOnTrial     = trialEnds && trialEnds > new Date();

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">Billing & Plan</h2>
        <p className="text-[#71717A] text-sm mt-1">Manage your subscription.</p>
      </div>

      {/* Trial banner */}
      {isOnTrial && (
        <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-2xl px-5 py-4 mb-5 flex items-center gap-3">
          <svg className="w-5 h-5 text-[#F59E0B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <p className="text-[#F59E0B] text-sm font-semibold">Free trial active</p>
            <p className="text-[#A1A1AA] text-xs mt-0.5">
              Ends on {trialEnds.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      )}

      {/* Current plan */}
      {currentPlanId && (
        <div className="bg-[#18181B] border border-[#8B5CF6]/30 rounded-2xl p-5 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#71717A] text-xs uppercase tracking-widest mb-1">Current Plan</p>
              <p className="text-white font-bold text-xl capitalize">{currentPlanId}</p>
            </div>
            <span className="gradient-brand text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Active
            </span>
          </div>
        </div>
      )}

      {/* Plans */}
      <div className="space-y-3 mb-6">
        <p className="text-[#71717A] text-xs uppercase tracking-widest font-medium px-1">Choose a plan</p>
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlanId;
          return (
            <div
              key={plan.id}
              className={`bg-[#18181B] border rounded-2xl p-4 transition-all ${
                isCurrent ? "border-[#8B5CF6]/50" : "border-[#27272A]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <p className="text-white font-bold text-sm">{plan.name}</p>
                  {isCurrent && (
                    <span className="text-[10px] text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-2 py-0.5 rounded-full font-medium">
                      Current
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-white font-bold">
                    ₹{plan.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[#71717A] text-xs">/mo</span>
                </div>
              </div>
              <p className="text-[#71717A] text-xs mb-3">{plan.features[0]}</p>
              <div className="flex items-center justify-between text-xs text-[#52525B]">
                <span>{plan.limits.instagramAccounts} IG account{plan.limits.instagramAccounts > 1 ? "s" : ""}</span>
                <span>{plan.limits.dmsPerMonth.toLocaleString("en-IN")} DMs/mo</span>
                <span>{plan.limits.automationsPerAccount} automations</span>
              </div>
              {!isCurrent && (
                <button className="w-full mt-3 border border-[#3F3F46] text-[#A1A1AA] hover:text-white hover:border-[#8B5CF6] text-xs font-semibold py-2.5 rounded-xl transition-all">
                  Upgrade to {plan.name}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-[#52525B]">
        Payment gateway coming soon. Contact{" "}
        <a href="mailto:support@flypings.in" className="text-[#8B5CF6] hover:underline">
          support@flypings.in
        </a>{" "}
        to upgrade early.
      </p>
    </div>
  );
}
