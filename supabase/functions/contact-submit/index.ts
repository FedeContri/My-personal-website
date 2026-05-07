import { corsHeaders } from "@supabase/supabase-js/cors";

interface Body {
  name: string;
  email: string;
  message: string;
}

// In-memory rate limit (per edge instance) - 3 requests per IP per 10 minutes
const RATE_LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;
const buckets = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = (buckets.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= RATE_LIMIT) {
    buckets.set(ip, arr);
    return false;
  }
  arr.push(now);
  buckets.set(ip, arr);
  return true;
}

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function sanitize(s: string) {
  return s.replace(/[<>]/g, "").trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ success: false, message: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = (await req.json()) as Partial<Body>;
    const name = sanitize(String(body.name || ""));
    const email = String(body.email || "").toLowerCase().trim();
    const message = sanitize(String(body.message || ""));

    if (
      name.length < 2 || name.length > 100 ||
      !isValidEmail(email) || email.length > 255 ||
      message.length < 10 || message.length > 2000
    ) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid input." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const accessKey = Deno.env.get("WEB3FORMS_ACCESS_KEY");
    if (!accessKey) {
      return new Response(
        JSON.stringify({ success: false, message: "Server not configured." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const resp = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        from_name: name,
        subject: `New message from ${name}`,
      }),
    });
    const result = await resp.json();

    return new Response(JSON.stringify(result), {
      status: resp.ok ? 200 : 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, message: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
