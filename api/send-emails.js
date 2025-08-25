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
      return res.status(500).json({ error: "Email service not configured" });
    }

    const resend = new Resend(resendApiKey);
    const { email, source, additionalData } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const adminEmail = "devharbr@gmail.com";

    // 1. ADMIN NOTIFICATION EMAIL TEMPLATE
    const adminNotificationTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Harbr Subscription</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background-color: #f8f9fa;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: white; 
            border-radius: 12px; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header { 
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); 
            padding: 30px; 
            text-align: center; 
        }
        .header h1 { 
            color: white; 
            margin: 0; 
            font-size: 24px; 
        }
        .content { 
            padding: 30px; 
        }
        .info-box { 
            background-color: #f8f9fa; 
            border-left: 4px solid #dc2626; 
            padding: 20px; 
            margin: 20px 0; 
        }
        .info-item { 
            margin-bottom: 10px; 
        }
        .label { 
            font-weight: 600; 
            color: #374151; 
        }
        .value { 
            color: #6b7280; 
        }
        .cta-button { 
            display: inline-block; 
            background-color: #dc2626; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: 600; 
            margin: 15px 0; 
        }
        .manual-note {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        .manual-note h4 {
            margin: 0 0 10px 0;
            color: #856404;
        }
        .manual-note p {
            margin: 0;
            color: #856404;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚢 New Harbr Subscription!</h1>
        </div>
        
        <div class="content">
            <p>You have a new subscription on your Harbr website!</p>
            
            <div class="info-box">
                <div class="info-item">
                    <span class="label">Email:</span> 
                    <span class="value">${email}</span>
                </div>
                <div class="info-item">
                    <span class="label">Source:</span> 
                    <span class="value">${source || "Unknown"}</span>
                </div>
                <div class="info-item">
                    <span class="label">Page:</span> 
                    <span class="value">${
                      additionalData?.page || "Unknown"
                    }</span>
                </div>
                <div class="info-item">
                    <span class="label">Button:</span> 
                    <span class="value">${
                      additionalData?.button_text || "Unknown"
                    }</span>
                </div>
                <div class="info-item">
                    <span class="label">Timestamp:</span> 
                    <span class="value">${new Date().toLocaleString()}</span>
                </div>
            </div>
            
            <div class="manual-note">
                <h4>📝 Manual Follow-up Required</h4>
                <p>Welcome emails are handled manually. Please reach out to <strong>${email}</strong> personally for a demo or consultation.</p>
            </div>
            
            <a href="https://harbr.com/admin" class="cta-button">View Admin Dashboard</a>
        </div>
    </div>
</body>
</html>
    `;

    // Send only admin notification email
    try {
      const { data, error } = await resend.emails.send({
        from: "Harbr Marina Software <no-reply@resend.dev>",
        reply_to: "devharbr@gmail.com",
        to: [adminEmail],
        subject: `New Subscription: ${email} - ${source}`,
        html: adminNotificationTemplate,
        // Add text version for better deliverability
        text: `
New Email Subscription - Harbr Marina Software

Subscriber Details:
- Email: ${email}
- Source: ${source}
- Page: ${additionalData?.page || "Unknown"}
- Button Text: ${additionalData?.button_text || "Get started for free"}

Action Required:
Please follow up with this subscriber manually to:
- Welcome them to Harbr
- Understand their marina management needs
- Schedule a demo if appropriate
- Provide personalized onboarding

Timestamp: ${new Date().toLocaleString("en-AU", {
          timeZone: "Australia/Sydney",
        })}

This notification was sent from your Harbr website email subscription form.
        `,
      });

      if (error) {
        console.error("Admin email error:", error);
        return res.status(400).json({
          success: false,
          error: "Failed to send admin notification",
          details: error,
        });
      }

      console.log("Admin notification sent successfully:", data);

      return res.status(200).json({
        success: true,
        message: "Admin notification sent successfully",
        details: {
          adminEmail: {
            status: "fulfilled",
            emailId: data.id,
            to: adminEmail,
          },
        },
      });
    } catch (emailError) {
      console.error("Error sending admin notification:", emailError);
      return res.status(500).json({
        error: "Failed to send admin notification",
        details: emailError.message,
      });
    }
  } catch (error) {
    console.error("Error in email sending:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
