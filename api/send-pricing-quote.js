/* eslint-env node */
/* global process */

import { Resend } from "resend";

export default async function handler(req, res) {
  // Set CORS headers
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
    // Initialize Resend client with server-side env var (RESEND_API_KEY).
    const resendApiKey =
      process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      return res.status(500).json({
        error: "Email service configuration missing",
        details: "RESEND_API_KEY not found in environment variables",
      });
    }

    const resend = new Resend(resendApiKey);
    const { email, berthNumber, source, additionalData } = req.body;

    if (!email || !berthNumber) {
      return res.status(400).json({
        error: "Missing required fields",
        details: "Email and berth number are required",
      });
    }

    const adminEmail = "devharbr@gmail.com";

    // Calculate estimated pricing based on berth number
    const calculateEstimatedPrice = (berths) => {
      const berthCount = Number.parseInt(berths, 10);
      if (berthCount <= 20) return "AUD 99 /mo";
      if (berthCount <= 100) return "AUD 299 /mo";
      return "AUD 499 /mo onwards";
    };

    const estimatedPrice = calculateEstimatedPrice(berthNumber);

    // ADMIN NOTIFICATION EMAIL TEMPLATE
    const adminEmailData = {
      from: "Harbr Pricing Quotes <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `🚢 New Pricing Quote Request from ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px; font-size: 24px;">🚢 New Pricing Quote Request</h2>
            
            <div style="background-color: #E1EFFF; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Customer Details</h3>
              <p style="margin: 8px 0; color: #555;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 8px 0; color: #555;"><strong>Number of Berths:</strong> ${berthNumber}</p>
              <p style="margin: 8px 0; color: #555;"><strong>Estimated Pricing:</strong> ${estimatedPrice}</p>
              <p style="margin: 8px 0; color: #555;"><strong>Request Source:</strong> ${source}</p>
              <p style="margin: 8px 0; color: #555;"><strong>Page:</strong> ${
                additionalData?.page || "Unknown"
              }</p>
            </div>

            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
              <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">⚡ Action Required</h3>
              <p style="margin: 8px 0; color: #856404;">
                <strong>Please send a personalized quote to the customer within 24 hours.</strong>
              </p>
              <p style="margin: 8px 0; color: #856404;">
                Consider including:
              </p>
              <ul style="color: #856404; margin: 10px 0; padding-left: 20px;">
                <li>Custom pricing based on ${berthNumber} berths</li>
                <li>Implementation timeline</li>
                <li>Available features for their marina size</li>
                <li>Free trial offer (30 days)</li>
                <li>Setup and training details</li>
              </ul>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Timestamp:</strong> ${new Date().toLocaleString()}<br>
                <strong>Button Text:</strong> ${
                  additionalData?.button_text || "Get Free Quote"
                }
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}?subject=Your%20Harbr%20Marina%20Software%20Quote&body=Hi%20there,%0A%0AThank%20you%20for%20requesting%20a%20quote%20for%20Harbr%20Marina%20Management%20Software.%20Based%20on%20your%20${berthNumber}%20berths,%20here's%20your%20custom%20pricing..." 
                 style="background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                📧 Reply to Customer
              </a>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="margin: 0; color: #999; font-size: 12px;">
                This is an automated notification from your Harbr website pricing form.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send admin notification email
    console.log("Sending admin notification for pricing quote...");
    const { data: adminEmailResult, error: adminEmailError } =
      await resend.emails.send(adminEmailData);

    if (adminEmailError) {
      console.error("Error sending admin email:", adminEmailError);
      return res.status(500).json({
        error: "Failed to send admin notification",
        details: adminEmailError,
      });
    }

    console.log("Admin notification sent successfully:", adminEmailResult.id);

    return res.status(200).json({
      success: true,
      message: "Thank you! We'll send you a custom quote within 24 hours.",
      details: {
        adminEmail: {
          status: "sent",
          id: adminEmailResult.id,
        },
        estimatedPrice,
        berthNumber: Number.parseInt(berthNumber, 10),
      },
    });
  } catch (error) {
    console.error("Error in send-pricing-quote:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
