export default function AnalyticsPage() {
  return (
    <div className="max-w-2xl mx-auto md:max-w-none">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Analytics</h2>
        <p className="text-[#71717A] text-sm">Track your automation performance over time.</p>
      </div>
      <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-10 flex flex-col items-center text-center">
        <div className="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <line strokeLinecap="round" strokeLinejoin="round" x1="18" y1="20" x2="18" y2="10" />
            <line strokeLinecap="round" strokeLinejoin="round" x1="12" y1="20" x2="12" y2="4" />
            <line strokeLinecap="round" strokeLinejoin="round" x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <p className="text-white font-semibold text-lg mb-2">Analytics coming soon</p>
        <p className="text-[#71717A] text-sm max-w-xs">
          Detailed funnel stats — DMs sent, links clicked, UPI conversions — will appear here.
        </p>
      </div>
    </div>
  );
}
