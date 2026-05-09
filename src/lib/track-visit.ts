import { supabase } from "@/integrations/supabase/client";

/**
 * Privacy-friendly visit tracking.
 * - No cookies, no localStorage of personal data
 * - Visitor "hash" is a daily-rotating hash of UA+lang, NOT an IP
 * - Collected: path, referrer host (no query), browser language
 */
const SESSION_KEY = "fd_visit_session";

async function makeVisitorHash(): Promise<string> {
  try {
    const day = new Date().toISOString().slice(0, 10);
    const raw = `${day}|${navigator.userAgent}|${navigator.language}`;
    const buf = new TextEncoder().encode(raw);
    const digest = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(digest))
      .slice(0, 16)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return "anon";
  }
}

function safeReferrer(): string | null {
  try {
    if (!document.referrer) return null;
    const u = new URL(document.referrer);
    if (u.host === window.location.host) return null;
    return u.host;
  } catch {
    return null;
  }
}

export async function trackVisit(path: string) {
  try {
    // Avoid double-tracking the same path within a single tab session
    const sessionMap = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "{}");
    if (sessionMap[path]) return;
    sessionMap[path] = 1;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionMap));

    const visitor_hash = await makeVisitorHash();
    const referrer = safeReferrer();
    const country = (navigator.language || "").split("-")[1]?.toUpperCase().slice(0, 2) || null;

    await supabase.from("page_views").insert({
      path: path.slice(0, 256),
      visitor_hash,
      referrer,
      country,
    });
  } catch {
    // silent
  }
}
