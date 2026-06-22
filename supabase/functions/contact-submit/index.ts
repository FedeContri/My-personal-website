const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

// Cache MX lookup results for 1h to avoid repeated DNS queries
const mxCache = new Map<string, { ok: boolean; exp: number }>();
const MX_TTL = 60 * 60 * 1000;

async function hasValidMx(domain: string): Promise<boolean> {
  const now = Date.now();
  const cached = mxCache.get(domain);
  if (cached && cached.exp > now) return cached.ok;

  let ok = false;
  try {
    // Google DNS-over-HTTPS — no extra dependencies, works in Deno edge runtime
    const res = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`,
      { headers: { Accept: "application/dns-json" } },
    );
    if (res.ok) {
      const data = await res.json();
      // Status 0 = NOERROR; Answer present means MX records exist
      ok = data.Status === 0 && Array.isArray(data.Answer) && data.Answer.length > 0;
      // Fallback: domain with A record but no MX still receives mail per RFC 5321
      if (!ok) {
        const aRes = await fetch(
          `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`,
          { headers: { Accept: "application/dns-json" } },
        );
        if (aRes.ok) {
          const aData = await aRes.json();
          ok = aData.Status === 0 && Array.isArray(aData.Answer) && aData.Answer.length > 0;
        }
      }
    }
  } catch (_) {
    // On DNS failure, fail open to avoid blocking legitimate users
    ok = true;
  }
  mxCache.set(domain, { ok, exp: now + MX_TTL });
  return ok;
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

    // Verify the email domain actually exists and can receive mail
    const domain = email.split("@")[1];
    if (!domain || !(await hasValidMx(domain))) {
      return new Response(
        JSON.stringify({ success: false, message: "Email address domain is not valid or cannot receive emails." }),
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
    const result = await resp.json().catch(() => ({ success: false, message: "Email provider returned an invalid response." }));

    // Always return 200 so the frontend can read result.success / result.message
    // instead of treating it as a network error.
    return new Response(
      JSON.stringify({
        success: !!result.success,
        message: result.message || (result.success ? "Sent" : "Email provider rejected the request."),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (e) {
    console.error("contact-submit error:", e);
    return new Response(
      JSON.stringify({ success: false, message: "An unexpected error occurred. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
