/* eslint-env node */
/* global process */
// Serverless endpoint to save email subscriptions using Supabase Service Role key
// This avoids exposing the REST call directly from the browser and works in Vercel production.

export default async function handler(req, res) {
  // Basic CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, source, additionalData, subscriptionData } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Support both VITE_ prefixed env vars (used locally) and plain names (used in Vercel)
    const supabaseUrl =
      process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

    // Validate configuration and log helpful diagnostics (do not print secrets)
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error(
        "save-subscription: Missing Supabase server configuration (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).",
        { hasSupabaseUrl: !!supabaseUrl, hasServiceKey: !!supabaseServiceKey }
      );
      return res
        .status(500)
        .json({ error: "Missing Supabase server configuration" });
    }

    try {
      // Log the host we will call (non-sensitive)
      const urlHost = new URL(supabaseUrl).host;
      console.log(`save-subscription: supabase host: ${urlHost}`);
    } catch (urlErr) {
      console.warn(
        "save-subscription: supabaseUrl appears invalid",
        supabaseUrl,
        urlErr.message
      );
    }

    // First check if the email exists
    const checkUrl = `${supabaseUrl.replace(
      /\/$/,
      ""
    )}/rest/v1/email_subscriptions?email=eq.${encodeURIComponent(
      email
    )}&select=*`;

    let response;
    try {
      response = await fetch(checkUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
        },
      });
    } catch (fetchErr) {
      console.error("Error fetching checkUrl", checkUrl, fetchErr);
      return res.status(502).json({
        error: "Failed to check existing subscription",
        details: fetchErr.message,
      });
    }

    if (!response.ok && response.status !== 404) {
      const text = await response.text().catch(() => response.statusText);
      console.error(
        "Error checking existing subscription (bad status):",
        response.status,
        text
      );
      return res.status(502).json({
        error: "Failed to check existing subscription",
        details: text,
      });
    }

    let existingEmail = null;
    if (response.status !== 404) {
      const data = await response.json();
      existingEmail = data.length > 0 ? data[0] : null;
    }

    if (existingEmail) {
      // Update the existing record
      const patchUrl = `${supabaseUrl.replace(
        /\/$/,
        ""
      )}/rest/v1/email_subscriptions?email=eq.${encodeURIComponent(email)}`;
      try {
        response = await fetch(patchUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseServiceKey,
            Authorization: `Bearer ${supabaseServiceKey}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            source: source,
            updated_at: new Date().toISOString(),
            ...additionalData,
          }),
        });
      } catch (patchErr) {
        console.error("Error patching subscription", patchUrl, patchErr);
        return res.status(502).json({
          error: "Failed to update subscription",
          details: patchErr.message,
        });
      }

      if (!response.ok) {
        const text = await response.text().catch(() => response.statusText);
        console.error(
          "Error updating subscription (bad status):",
          response.status,
          text
        );
        return res
          .status(502)
          .json({ error: "Failed to update subscription", details: text });
      }

      const updated = await response.json();
      return res.status(200).json({
        success: true,
        data: updated,
        isExistingEmail: true,
        message: "You're already subscribed! We've updated your information.",
      });
    }

    // Insert new record
    const insertUrl = `${supabaseUrl.replace(
      /\/$/,
      ""
    )}/rest/v1/email_subscriptions`;

    try {
      response = await fetch(insertUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(
          subscriptionData || {
            email,
            source,
            status: "active",
            created_at: new Date().toISOString(),
            ...additionalData,
          }
        ),
      });
    } catch (insertErr) {
      console.error("Error inserting subscription", insertUrl, insertErr);
      return res.status(502).json({
        error: "Failed to save subscription",
        details: insertErr.message,
      });
    }

    if (!response.ok) {
      const text = await response.text().catch(() => response.statusText);
      console.error(
        "Error inserting subscription (bad status):",
        response.status,
        text
      );
      return res
        .status(502)
        .json({ error: "Failed to save subscription", details: text });
    }

    const inserted = await response.json();
    return res.status(200).json({
      success: true,
      data: inserted,
      message: "Thank you! You're subscribed and we'll be in touch soon.",
    });
  } catch (error) {
    console.error("Error in save-subscription:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
