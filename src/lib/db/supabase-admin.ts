import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Admin client with service role key.
 * Bypasses Row Level Security — use ONLY in server-side code
 * (webhook handlers, cron jobs, admin routes).
 * NEVER import this in client components.
 */
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
