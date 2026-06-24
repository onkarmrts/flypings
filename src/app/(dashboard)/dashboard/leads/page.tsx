export default function LeadsPage() {
  return (
    <div className="max-w-2xl mx-auto md:max-w-none">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Leads</h2>
        <p className="text-[#71717A] text-sm">Every person who interacted with your automations.</p>
      </div>
      <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-10 flex flex-col items-center text-center">
        <div className="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        </div>
        <p className="text-white font-semibold text-lg mb-2">No leads yet</p>
        <p className="text-[#71717A] text-sm max-w-xs">
          Leads will appear here once your automations start triggering DMs.
        </p>
      </div>
    </div>
  );
}
