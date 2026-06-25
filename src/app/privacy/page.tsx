export const metadata = { title: "Privacy Policy — Flypings" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-[#71717A] text-sm mb-10">Last updated: June 2026</p>

        <div className="space-y-8 text-[#A1A1AA] leading-relaxed">

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">1. What is Flypings?</h2>
            <p>Flypings is an Instagram automation tool that helps creators automatically send DMs when someone comments a keyword on their posts. We connect to your Instagram account via the official Meta (Facebook) API.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">2. Information We Collect</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Your name and email (from Google login)</li>
              <li>Your Instagram username, name, and follower count (from Meta API)</li>
              <li>Instagram access token (stored securely, used to send DMs)</li>
              <li>Comments and DM logs related to your automations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">3. How We Use Your Information</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>To run your automations (detect comments, send DMs)</li>
              <li>To show you analytics about your automation performance</li>
              <li>To manage your account and subscription</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">4. What We Do NOT Do</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>We never post on your behalf</li>
              <li>We never read your private DMs</li>
              <li>We never sell your data to third parties</li>
              <li>We never access your followers list</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">5. Instagram / Meta Data</h2>
            <p>We access your Instagram data through the official Meta Graph API. We only request the minimum permissions needed to run automations. You can disconnect your Instagram at any time from your Flypings settings, which revokes our access.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">6. Data Storage</h2>
            <p>Your data is stored securely using Supabase (PostgreSQL database with row-level security). Access tokens are stored encrypted. We do not store your Instagram password — ever.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">7. Data Deletion</h2>
            <p>You can delete your account and all associated data at any time by contacting us at <a href="mailto:support@flypings.in" className="text-[#8B5CF6] hover:underline">support@flypings.in</a>. We will delete all your data within 7 days.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">8. Contact</h2>
            <p>For any privacy questions, email us at <a href="mailto:support@flypings.in" className="text-[#8B5CF6] hover:underline">support@flypings.in</a></p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-[#27272A]">
          <a href="/" className="text-[#8B5CF6] text-sm hover:underline">← Back to Flypings</a>
        </div>
      </div>
    </div>
  );
}
