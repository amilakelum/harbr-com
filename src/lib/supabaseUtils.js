import posthog from "posthog-js";
import { sendSubmissionEmails } from "./emailService";

/**
 * Generate a persistent distinct ID for PostHog tracking
 * @returns {string} The distinct ID
 */
function getDistinctId() {
  // Check if we already have a stored ID
  let distinctId = localStorage.getItem("ph_distinct_id");

  if (!distinctId) {
    // Generate a new ID if none exists
    distinctId = crypto.randomUUID
      ? crypto.randomUUID()
      : `anon_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    // Store for future use
    try {
      localStorage.setItem("ph_distinct_id", distinctId);
    } catch (e) {
      console.error("Could not store distinct ID:", e);
    }
  }

  return distinctId;
}

/**
 * Save an email subscription to Supabase
 * @param {string} email - The email address to save
 * @param {string} source - The source of the subscription (e.g. 'hero', 'callout')
 * @param {Object} additionalData - Any additional data to store
 * @returns {Promise<Object>} - The result of the operation
 */
export const saveEmailSubscription = async (
  email,
  source,
  additionalData = {}
) => {
  if (!email) {
    console.error("Email is required for subscription");
    return {
      success: false,
      error: "Email is required",
      errorType: "validation",
    };
  }

  try {
    const formattedEmail = email.toLowerCase().trim();

    // Prepare the data to save
    const subscriptionData = {
      email: formattedEmail,
      source: source,
      status: "active",
      created_at: new Date().toISOString(),
      ...additionalData,
    };

    // Track event in PostHog - With proper distinct_id
    try {
      const distinctId = getDistinctId();

      // Identify user with their email if available
      if (formattedEmail) {
        posthog.identify(formattedEmail, {
          email: formattedEmail,
          $set: {
            source_first_seen: source,
            email: formattedEmail,
          },
        });
      }

      // Capture the subscription event
      posthog.capture("email_subscription", {
        distinct_id: formattedEmail || distinctId, // Use email as ID if available
        email: formattedEmail,
        source: source,
        form_location: additionalData.page || "unknown",
        button_text: additionalData.button_text || "Get started for free",
      });

      console.log(
        "PostHog event tracked with distinct_id:",
        formattedEmail || distinctId
      );
    } catch (posthogError) {
      console.error("PostHog tracking error (non-critical):", posthogError);
      // Continue with saving to database regardless of PostHog errors
    }

    // Use server-side proxy to talk to Supabase in production.
    // This avoids CORS and DNS issues when calling Supabase directly from the browser.
    const isDev = import.meta.env.DEV;

    let savedResult;

    try {
      // Try calling local /api endpoint first (works in Vercel dev and production)
      const apiResponse = await fetch("/api/save-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formattedEmail,
          source,
          additionalData,
          subscriptionData,
        }),
      });

      if (!apiResponse.ok) {
        const txt = await apiResponse
          .text()
          .catch(() => apiResponse.statusText);
        throw new Error(`API error: ${txt}`);
      }

      savedResult = await apiResponse.json();
    } catch (proxyError) {
      console.warn("Proxy /api/save-subscription failed:", proxyError.message);

      if (isDev) {
        // In dev, simulate success if direct Supabase URL is unreachable
        console.log("DEV fallback: simulating saved subscription");
        savedResult = { success: true, data: subscriptionData };
      } else {
        // In production, rethrow so the outer catch handles it
        throw proxyError;
      }
    }

    if (!savedResult || !savedResult.success) {
      return {
        success: false,
        error: savedResult?.error || "Failed to save subscription",
      };
    }

    const data = savedResult.data;
    console.log("Email subscription saved successfully:", data);

    // Send notification and welcome emails for new subscriptions
    try {
      const emailResult = await sendSubmissionEmails(formattedEmail, source, {
        page: additionalData.page || "unknown",
        button_text: additionalData.button_text || "Get started for free",
        timestamp: new Date().toISOString(),
      });

      if (emailResult.success) {
        console.log("Emails sent successfully:", emailResult.details);
      } else {
        console.error("Failed to send emails:", emailResult.error);
        // Don't fail the subscription if email sending fails
      }
    } catch (emailError) {
      console.error("Error sending emails (non-critical):", emailError);
      // Continue with success response even if email fails
    }

    return {
      success: true,
      data,
      message: "Thank you! You're subscribed and we'll be in touch soon.",
    };
  } catch (error) {
    console.error("Unexpected error saving email subscription:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
      errorType: "unexpected",
    };
  }
};
