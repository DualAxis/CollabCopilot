import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * Cookie-based Supabase client for App Router Route Handlers and Server
 * Components. Distinct from `supabase-server.ts`, which holds the
 * service-role client used for trusted inserts (e.g. saveAssessment).
 *
 * The Next.js `cookies()` helper returns a Promise in 15+ — await it here so
 * the helper itself stays synchronous to call (the awaited cookie store is
 * captured in the closure).
 */
export async function createAuthServerClient(): Promise<SupabaseClient<Database>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  }
  if (!anonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll().map(({ name, value }) => ({ name, value }));
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Calling cookieStore.set throws when invoked from a Server Component
          // outside of a Server Action / Route Handler context. Safe to ignore
          // when the auth cookies are managed elsewhere (middleware or the
          // /auth/callback route handler).
        }
      },
    },
  });
}
