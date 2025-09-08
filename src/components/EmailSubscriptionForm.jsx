import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import posthog from "posthog-js";
import { saveEmailSubscription } from "../lib/supabaseUtils";
import FormFeedback from "./ui/FormFeedback";

// Function to get or create a distinct ID for PostHog
function getDistinctId() {
  let distinctId = localStorage.getItem("ph_distinct_id");

  if (!distinctId) {
    distinctId = crypto.randomUUID
      ? crypto.randomUUID()
      : `anon_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    try {
      localStorage.setItem("ph_distinct_id", distinctId);
    } catch (e) {
      console.error("Could not store distinct ID:", e);
    }
  }

  return distinctId;
}

export default function EmailSubscriptionForm({
  source = "unknown",
  buttonText = "Get started for free",
  placeholder = "Enter your business email",
  className = "",
  formClassName = "",
  inputClassName = "",
  buttonClassName = "",
  feedbackClassName = "",
  onSuccess,
  onError,
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({
    type: null,
    text: null,
  });

  // Auto-dismiss form feedback message after 6 seconds
  useEffect(() => {
    if (submitMessage.text) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [submitMessage]);

  const handleCTAClick = () => {
    const distinctId = email || getDistinctId();

    try {
      posthog.capture("email_form_cta_clicked", {
        distinct_id: distinctId,
        button_location: source,
        button_text: buttonText,
        email: email,
        timestamp: new Date().toISOString(),
      });

      console.log("Email form CTA tracked with distinct_id:", distinctId);
    } catch (error) {
      console.error("Error tracking email form CTA:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage({ type: null, text: null });

    // Track click event in PostHog
    handleCTAClick();

    try {
      // Save email to Supabase
      const result = await saveEmailSubscription(email, source, {
        page: window.location.pathname,
        button_text: buttonText,
      });

      if (result.success) {
        // Handle already subscribed case specially
        if (result.isExistingEmail) {
          setSubmitMessage({
            type: "info",
            text:
              result.message ||
              "You're already subscribed! We've updated your information.",
          });
        } else {
          setSubmitMessage({
            type: "success",
            text: result.message || "Thank you! We'll be in touch soon.",
          });
          // Only clear email field on successful new subscription
          setEmail("");
        }

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(result);
        }
      } else {
        // Display specific error based on error type
        let errorMessage;
        switch (result.errorType) {
          case "duplicate_email":
            errorMessage =
              "This email is already subscribed. Thanks for your enthusiasm!";
            break;
          case "validation":
            errorMessage = "Please enter a valid email address.";
            break;
          case "auth":
            errorMessage = "Authentication error. Please try again later.";
            break;
          default:
            errorMessage =
              result.error || "Something went wrong. Please try again.";
        }

        setSubmitMessage({
          type: "error",
          text: errorMessage,
        });

        // Call error callback if provided
        if (onError) {
          onError(result);
        }
      }
    } catch (error) {
      console.error("Error saving subscription:", error);
      const errorMessage = "Connection error. Please try again later.";

      setSubmitMessage({
        type: "error",
        text: errorMessage,
      });

      // Call error callback if provided
      if (onError) {
        onError({ error: errorMessage });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const clearMessage = () => {
    setSubmitMessage({ type: null, text: null });
  };

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-x-4 bg-white p-2 rounded-2xl shadow-sm ${formClassName}`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className={`w-full flex-grow px-5 py-3.5 text-base rounded-xl border-0 bg-white text-black focus:outline-none focus:ring-0 h-[52px] text-[16px] placeholder-zinc-400 ${inputClassName}`}
          disabled={submitting}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className={`w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#5371FF] px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out whitespace-nowrap h-[52px] ${buttonClassName}`}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : buttonText}
        </motion.button>
      </form>
      <FormFeedback
        isSubmitting={submitting}
        message={submitMessage}
        onDismiss={clearMessage}
        className={feedbackClassName}
      />
    </div>
  );
}
