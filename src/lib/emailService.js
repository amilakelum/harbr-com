/**
 * Send notification and welcome emails after form submission
 * @param {string} email - The subscriber's email address
 * @param {string} source - The source of the subscription
 * @param {Object} additionalData - Additional form data
 * @returns {Promise<Object>} - The result of the email send operation
 */
export const sendSubmissionEmails = async (
  email,
  source = "unknown",
  additionalData = {}
) => {
  try {
    // Check if we're in development mode
    const isDevelopment = import.meta.env.DEV;

    if (isDevelopment) {
      console.log("📧 Development mode: Email sending skipped");
      console.log("📧 Would send emails to:", email);
      console.log("📧 Source:", source);
      console.log("📧 Additional data:", additionalData);

      return {
        success: true,
        message: "Development mode: Emails would be sent in production",
        details: {
          adminEmail: { status: "skipped" },
          userEmail: { status: "skipped" },
        },
      };
    }

    const response = await fetch("/api/send-emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source,
        additionalData,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Email sending failed:", result);
      return {
        success: false,
        error: result.error || "Failed to send emails",
        details: result.details,
      };
    }

    console.log("Emails sent successfully:", result);
    return {
      success: true,
      message: result.message,
      details: result.details,
    };
  } catch (error) {
    console.error("Error sending emails:", error);

    // Check if we're in development and it's a fetch error
    const isDevelopment = import.meta.env.DEV;
    if (isDevelopment && error.message.includes("fetch")) {
      console.log(
        "📧 Development mode: API endpoint not available, continuing without emails"
      );
      return {
        success: true,
        message:
          "Development mode: Form submitted successfully, emails disabled",
        details: {
          adminEmail: { status: "skipped" },
          userEmail: { status: "skipped" },
        },
      };
    }

    return {
      success: false,
      error: "Network error while sending emails",
      details: error.message,
    };
  }
};
