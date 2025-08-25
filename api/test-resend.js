/* eslint-env node */
/* global process */

import { Resend } from "resend";

export default async function handler(req, res) {
  // Only allow GET requests for this test endpoint
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get the API key from environment
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return res.status(500).json({
        error: "RESEND_API_KEY not found in environment variables",
        hint: "Make sure to add your Resend API key to Vercel environment variables",
      });
    }

    // Check if API key format is correct
    if (!resendApiKey.startsWith("re_")) {
      return res.status(500).json({
        error: "Invalid API key format",
        hint: "Resend API keys should start with 're_'",
      });
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);

    // Try to send a test email
    const { data, error } = await resend.emails.send({
      from: "Test <onboarding@resend.dev>",
      to: ["devharbr@gmail.com"],
      subject: "Resend Test - Harbr Website",
      html: `
        <h2>🎉 Resend is working!</h2>
        <p>This is a test email from your Harbr website.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Source:</strong> Resend Test Endpoint</p>
        <hr>
        <p><small>If you received this email, your Resend integration is working correctly!</small></p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(400).json({
        error: "Failed to send test email",
        details: error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Test email sent successfully!",
      emailId: data.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Test endpoint error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
