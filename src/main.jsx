import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import posthog from "posthog-js";
import "./index.css";
import App from "./App.jsx";
import "./assets/favicon.ico";
import "./assets/favicon.svg";

// Initialize PostHog with your project API key
// Replace 'phc_YourPostHogApiKey' with your actual PostHog API key
posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
  // Enable debug mode in development
  debug: import.meta.env.DEV,
  // Only capture events in production by default
  capture_pageview: import.meta.env.PROD,
  // Disable autocapture in development
  autocapture: import.meta.env.PROD,
  // Set a property to distinguish test events during development
  loaded: (posthog) => {
    if (import.meta.env.DEV) {
      posthog.opt_in_capturing();
      // Mark events as coming from development environment
      posthog.register({
        environment: 'development'
      });
    }
  }
});

// Expose PostHog to window for debugging in development
if (import.meta.env.DEV) {
  window.posthog = posthog;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
