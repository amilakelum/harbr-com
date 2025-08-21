import Resend from 'resend';

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
        const resendApiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
        if (!resendApiKey) {
            console.error('Missing RESEND_API_KEY environment variable');
            return res.status(500).json({ error: 'Email service not configured' });
        }

        const resend = new Resend(resendApiKey);
    const { email, source, additionalData } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const adminEmail = "devharbr@gmail.com";

    // 1. NOTIFICATION EMAIL TO ADMIN (You)
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
            
            <p>The user has been automatically sent a welcome email. You may want to follow up personally for a demo or consultation.</p>
            
            <a href="https://harbr.com/admin" class="cta-button">View Admin Dashboard</a>
        </div>
    </div>
</body>
</html>
    `;

    // 2. WELCOME EMAIL TO USER
    const userWelcomeTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Harbr</title>
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
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); 
            padding: 40px 30px; 
            text-align: center; 
        }
        .logo { 
            font-size: 28px; 
            font-weight: 700; 
            color: white; 
            margin-bottom: 10px; 
        }
        .subtitle { 
            color: #F7F76E; 
            font-size: 16px; 
            margin: 0; 
        }
        .content { 
            padding: 40px 30px; 
        }
        .welcome-title { 
            font-size: 24px; 
            font-weight: 600; 
            margin-bottom: 20px; 
            color: #1a1a1a; 
        }
        .welcome-text { 
            font-size: 16px; 
            margin-bottom: 20px; 
            color: #555; 
        }
        .features-list { 
            background-color: #f8f9fa; 
            border-radius: 8px; 
            padding: 25px; 
            margin: 25px 0; 
        }
        .features-list h3 { 
            margin-top: 0; 
            color: #1a1a1a; 
            font-size: 18px; 
        }
        .features-list ul { 
            margin: 0; 
            padding-left: 20px; 
        }
        .features-list li { 
            margin-bottom: 8px; 
            color: #555; 
        }
        .cta-button { 
            display: inline-block; 
            background-color: #1a1a1a; 
            color: white; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: 600; 
            font-size: 16px; 
            margin: 20px 0; 
        }
        .footer { 
            background-color: #f8f9fa; 
            padding: 30px; 
            text-align: center; 
            border-top: 1px solid #e9ecef; 
        }
        .footer-text { 
            font-size: 14px; 
            color: #666; 
            margin: 0; 
        }
        .social-links { 
            margin: 15px 0 0 0; 
        }
        .social-links a { 
            color: #1a1a1a; 
            text-decoration: none; 
            margin: 0 10px; 
            font-size: 14px; 
        }
        @media (max-width: 600px) {
            .container { 
                margin: 0; 
                border-radius: 0; 
            }
            .header, .content, .footer { 
                padding: 30px 20px; 
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Harbr</div>
            <p class="subtitle">AI Marina Management Software</p>
        </div>
        
        <div class="content">
            <h1 class="welcome-title">Welcome to the Future of Marina Management! 🚢</h1>
            
            <p class="welcome-text">
                Thank you for your interest in Harbr! We're excited to show you how our AI-powered marina management software can transform your marina operations.
            </p>
            
            <div class="features-list">
                <h3>What Harbr can do for your marina:</h3>
                <ul>
                    <li><strong>Intelligent Booking Management</strong> - Automated berth allocation and booking approvals</li>
                    <li><strong>Revenue Optimization</strong> - Dynamic pricing and vacancy management</li>
                    <li><strong>Insurance & Compliance</strong> - Automated documentation and safety tracking</li>
                    <li><strong>Data Enrichment</strong> - Smart customer insights and analytics</li>
                    <li><strong>Growth Analytics</strong> - Comprehensive reporting and business intelligence</li>
                </ul>
            </div>
            
            <p class="welcome-text">
                Our team will be in touch soon to schedule a personalized demo and discuss how Harbr can specifically benefit your marina operations.
            </p>
            
            <p class="welcome-text">
                In the meantime, feel free to explore our website to learn more about our features and see how we're helping marinas worldwide increase efficiency and revenue.
            </p>
            
            <div style="text-align: center;">
                <a href="https://harbr.com" class="cta-button">Explore Harbr Features</a>
            </div>
            
            <p class="welcome-text">
                Have questions? Simply reply to this email and I'll personally get back to you within 24 hours.
            </p>
            
            <p class="welcome-text">
                Best regards,<br>
                <strong>Amila Kelum</strong><br>
                Founder, Harbr
            </p>
        </div>
        
        <div class="footer">
            <p class="footer-text">
                Harbr - Intelligent Marina Management Software<br>
                You're receiving this email because you signed up for updates at harbr.com
            </p>
            <div class="social-links">
                <a href="https://harbr.com">Website</a>
                <a href="https://harbr.com/blog">Blog</a>
                <a href="https://harbr.com/pricing">Pricing</a>
            </div>
        </div>
    </div>
</body>
</html>
    `;

    // Send both emails
    const emailPromises = [
      // 1. Send notification to admin
      resend.emails.send({
        from: "Harbr Notifications <noreply@harbr.com>",
        to: [adminEmail],
        subject: `🚢 New Harbr subscription from ${email}`,
        html: adminNotificationTemplate,
      }),

      // 2. Send welcome email to user
      resend.emails.send({
        from: "Amila from Harbr <devharbr@gmail.com>",
        to: [email],
        subject: "Welcome to Harbr - Your Marina Management Journey Begins! 🚢",
        html: userWelcomeTemplate,
      }),
    ];

    const results = await Promise.allSettled(emailPromises);

    // Check results
    const adminEmailResult = results[0];
    const userEmailResult = results[1];

    const response = {
      success: true,
      adminEmail: {
        status: adminEmailResult.status,
        data:
          adminEmailResult.status === "fulfilled"
            ? adminEmailResult.value.data
            : null,
        error:
          adminEmailResult.status === "rejected"
            ? adminEmailResult.reason
            : null,
      },
      userEmail: {
        status: userEmailResult.status,
        data:
          userEmailResult.status === "fulfilled"
            ? userEmailResult.value.data
            : null,
        error:
          userEmailResult.status === "rejected" ? userEmailResult.reason : null,
      },
    };

    // Log results
    console.log("Email sending results:", response);

    // Return success even if one email fails
    return res.status(200).json({
      success: true,
      message: "Emails processed",
      details: response,
    });
  } catch (error) {
    console.error("Error in email sending:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
