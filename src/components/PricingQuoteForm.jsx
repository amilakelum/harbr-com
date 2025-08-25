import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import posthog from "posthog-js";
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

export default function PricingQuoteForm({
  source = "pricing_page",
  buttonText = "Get Free Quote",
  className = "",
  formClassName = "",
  inputClassName = "",
  buttonClassName = "",
  feedbackClassName = "",
  onSuccess,
  onError,
}) {
  const [email, setEmail] = useState("");
  const [berthNumber, setBerthNumber] = useState("");
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
      posthog.capture("pricing_quote_form_clicked", {
        distinct_id: distinctId,
        button_location: source,
        button_text: buttonText,
        email: email,
        berth_number: berthNumber,
        timestamp: new Date().toISOString(),
      });

      console.log("Pricing quote form tracked with distinct_id:", distinctId);
    } catch (error) {
      console.error("Error tracking pricing quote form:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage({ type: null, text: null });

    // Track click event in PostHog
    handleCTAClick();

    try {
      // Send pricing quote request email
      const response = await fetch("/api/send-pricing-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          berthNumber,
          source,
          additionalData: {
            page: window.location.pathname,
            button_text: buttonText,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitMessage({
          type: "success",
          text:
            result.message ||
            "Thank you! We'll send you a custom quote within 24 hours.",
        });

        // Clear form fields on success
        setEmail("");
        setBerthNumber("");

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(result);
        }
      } else {
        const errorMessage =
          result.error || "Something went wrong. Please try again.";

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
      console.error("Error submitting pricing quote request:", error);

      // Check if we're in development mode and handle gracefully
      const isDevelopment = import.meta.env.DEV;
      if (isDevelopment) {
        console.log("📧 Development mode: Quote request processed locally");
        console.log("📧 Email:", email);
        console.log("📧 Berth Number:", berthNumber);
        console.log("📧 Source:", source);

        setSubmitMessage({
          type: "success",
          text: "Development mode: Quote request processed successfully! (Emails disabled in development)",
        });

        setEmail("");
        setBerthNumber("");

        if (onSuccess) {
          onSuccess({ success: true, development: true });
        }
      } else {
        const errorMessage = "Connection error. Please try again later.";
        setSubmitMessage({
          type: "error",
          text: errorMessage,
        });

        if (onError) {
          onError({ error: errorMessage });
        }
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
        className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-x-4 bg-white p-2 rounded-2xl shadow-sm border border-zinc-200 ${formClassName}`}
      >
        <input
          type="number"
          value={berthNumber}
          onChange={(e) => setBerthNumber(e.target.value)}
          placeholder="Number of berths"
          required
          min="1"
          className={`w-full flex-grow px-5 py-3.5 text-base rounded-xl border-0 bg-white text-black focus:outline-none focus:ring-0 h-[52px] text-[16px] placeholder-zinc-400 ${inputClassName}`}
          disabled={submitting}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className={`w-full flex-grow px-5 py-3.5 text-base rounded-xl border-0 bg-white text-black focus:outline-none focus:ring-0 h-[52px] text-[16px] placeholder-zinc-400 ${inputClassName}`}
          disabled={submitting}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className={`w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-black px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out whitespace-nowrap h-[52px] cursor-pointer ${buttonClassName}`}
          disabled={submitting}
        >
          {submitting ? "Getting Quote..." : buttonText}
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
