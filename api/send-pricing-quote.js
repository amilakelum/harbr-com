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
      from: "Harbr Marina Software <no-reply@resend.dev>",
      reply_to: "devharbr@gmail.com",
      to: [adminEmail],
      subject: `New Quote Request: ${berthNumber} berths - ${email}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-top: 4px solid #007bff;">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; margin: 0; font-size: 28px; font-weight: 600;">New Quote Request</h1>
              <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">Harbr Marina Management Software</p>
            </div>
            
            <!-- Customer Details Card -->
            <div style="background: linear-gradient(135deg, #E1EFFF 0%, #f8f9fa 100%); padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid #007bff;">
              <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Customer Information</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #555; font-weight: 600; width: 140px;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #555; font-weight: 600;">Berth Count:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600; font-size: 18px;">${berthNumber} berths</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #555; font-weight: 600;">Est. Pricing:</td>
                  <td style="padding: 8px 0; color: #28a745; font-weight: 600; font-size: 16px;">${estimatedPrice}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #555; font-weight: 600;">Source:</td>
                  <td style="padding: 8px 0; color: #333;">${source}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #555; font-weight: 600;">Page:</td>
                  <td style="padding: 8px 0; color: #333;">${
                    additionalData?.page || "Unknown"
                  }</td>
                </tr>
              </table>
            </div>

            <!-- Action Required Section -->
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #ffc107;">
              <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">⚡ Action Required</h3>
              <p style="margin: 0 0 15px 0; color: #856404; font-size: 16px; line-height: 1.5;">
                <strong>Please respond to this customer within 24 hours with a personalized quote.</strong>
              </p>
              
              <div style="background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <h4 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">Recommended Quote Contents:</h4>
                <ul style="color: #856404; margin: 10px 0; padding-left: 20px; line-height: 1.6;">
                  <li>Custom pricing for ${berthNumber} berths</li>
                  <li>Implementation timeline (typically 2-4 weeks)</li>
                  <li>Available features for marina size</li>
                  <li>30-day free trial offer</li>
                  <li>Training and onboarding details</li>
                  <li>Integration options</li>
                </ul>
              </div>
            </div>

            <!-- Quick Action Buttons -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${email}?subject=Your%20Harbr%20Marina%20Software%20Quote%20for%20${berthNumber}%20Berths&body=Dear%20Marina%20Manager,%0A%0AThank%20you%20for%20your%20interest%20in%20Harbr%20Marina%20Management%20Software.%20Based%20on%20your%20${berthNumber}%20berths,%20I'm%20pleased%20to%20provide%20you%20with%20a%20custom%20quote.%0A%0APricing:%20${estimatedPrice}%0A%0AThis%20includes:%0A-%20Complete%20marina%20management%20system%0A-%20Online%20booking%20platform%0A-%20Customer%20portal%0A-%20Financial%20reporting%0A-%2030-day%20free%20trial%0A-%20Full%20training%20and%20support%0A%0AWould%20you%20like%20to%20schedule%20a%2015-minute%20demo%20call%20to%20see%20the%20system%20in%20action?%0A%0ABest%20regards,%0AHarbr%20Team" 
                 style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; margin: 0 10px 10px 0;">
                📧 Send Quote
              </a>
              
              <a href="https://calendly.com/harbr-demo" target="_blank"
                 style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; margin: 0 10px 10px 0;">
                📅 Schedule Demo
              </a>
            </div>

            <!-- Footer -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">
                <strong>Request Details:</strong><br>
                Timestamp: ${new Date().toLocaleString("en-AU", {
                  timeZone: "Australia/Sydney",
                })}<br>
                Button Text: ${additionalData?.button_text || "Get Free Quote"}
              </p>
              <p style="margin: 15px 0 0 0; color: #999; font-size: 12px;">
                This notification was sent from your Harbr website pricing form.<br>
                Harbr Marina Management Software - helping marinas grow.
              </p>
            </div>
          </div>
        </div>
      `,
      // Add text version for better deliverability
      text: `
New Pricing Quote Request - Harbr Marina Software

Customer Details:
- Email: ${email}
- Number of Berths: ${berthNumber}
- Estimated Pricing: ${estimatedPrice}
- Request Source: ${source}
- Page: ${additionalData?.page || "Unknown"}

Action Required:
Please respond to this customer within 24 hours with a personalized quote.

Recommended quote contents:
- Custom pricing for ${berthNumber} berths
- Implementation timeline (2-4 weeks)
- Available features for marina size
- 30-day free trial offer
- Training and onboarding details
- Integration options

Quick Reply: mailto:${email}

Request Timestamp: ${new Date().toLocaleString("en-AU", {
        timeZone: "Australia/Sydney",
      })}
Button Text: ${additionalData?.button_text || "Get Free Quote"}

This notification was sent from your Harbr website pricing form.
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
