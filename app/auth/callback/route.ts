import { NextResponse } from "next/server";
import { createAuthServerClient } from "../../lib/supabase-auth-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * OAuth + magic-link callback. Supabase redirects the browser back to this
 * route with a `?code=...` query param. We exchange that PKCE code for a
 * session (which the SSR client writes into cookies via setAll), then
 * redirect to `/` with a small status query so the SPA can route to either
 * the success screen (first-time sign-up) or the dashboard placeholder
 * (returning sign-in). The home page strips that query immediately after
 * reading it.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const errorParam = url.searchParams.get("error_description") || url.searchParams.get("error");
  const origin = url.origin;

  if (errorParam) {
    return NextResponse.redirect(
      `${origin}/?auth=error&message=${encodeURIComponent(errorParam)}`
    );
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/?auth=error&message=missing_code`);
  }

  const supabase = await createAuthServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      `${origin}/?auth=error&message=${encodeURIComponent(error.message)}`
    );
  }

  // Decide first-time sign-up vs returning sign-in. Heuristic: if the
  // user's last_sign_in_at is missing or within ~10 seconds of created_at,
  // treat as first-time. This is robust enough for the demo flow; if the
  // heuristic is off the user simply lands on the dashboard placeholder
  // instead of the celebration screen and can carry on.
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  let firstTime = false;
  if (user) {
    const created = user.created_at ? new Date(user.created_at).getTime() : 0;
    const lastSignIn = user.last_sign_in_at
      ? new Date(user.last_sign_in_at).getTime()
      : 0;
    if (!lastSignIn || Math.abs(lastSignIn - created) < 10_000) {
      firstTime = true;
    }
  }

  return NextResponse.redirect(
    `${origin}/?${firstTime ? "signup=success" : "signin=success"}`
  );
}
