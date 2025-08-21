/* eslint-env node */
/* global process */

// Diagnostic endpoint to check connectivity to Supabase from Vercel serverless env
export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    return res
      .status(500)
      .json({ error: "Missing SUPABASE_URL in environment" });
  }

  const target = `${supabaseUrl.replace(/\/$/, "")}/rest/v1`;

  try {
    const start = Date.now();
    const response = await fetch(target, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseServiceKey || "",
        // Authorization omitted if service key absent
      },
    });
    const duration = Date.now() - start;

    let bodyText = null;
    try {
      bodyText = await response.text();
    } catch (e) {
      bodyText = "<unreadable body>";
    }

    return res.status(200).json({
      success: true,
      target,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
      durationMs: duration,
      bodyPreview: bodyText ? bodyText.slice(0, 1000) : null,
    });
  } catch (err) {
    // Network-level error (DNS, TLS, timeout, etc.)
    console.error("check-supabase: fetch error", err);
    return res.status(502).json({
      error: "fetch failed",
      message: err.message,
      name: err.name,
      code: err.code || null,
    });
  }
}
