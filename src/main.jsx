import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import posthog from "posthog-js";
import "./index.css";
import App from "./App.jsx";
import "./assets/favicon.ico";
import "./assets/favicon.svg";
import { trackSessionQuality } from "./lib/analytics";

// Initialize PostHog with your project API key
posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
  api_host: 'https://us.i.posthog.com', // Corrected API host for US instance
  // Enable debug mode in development
  debug: import.meta.env.DEV,
  // Only capture events in production by default
  capture_pageview: true,
  // Configure autocapture
  autocapture: true,
  // Properly handle network errors
  on_xhr_error: function(xhr) {
    console.error('PostHog XHR error:', xhr);
  },
  // Configure property formatting
  property_blacklist: ['$ip'],
  // Set a property to distinguish test events during development
  loaded: (posthog) => {
    if (import.meta.env.DEV) {
      posthog.opt_in_capturing();
      // Mark events as coming from development environment
      posthog.register({
        environment: 'development'
      });
    } else {
      // For production
      posthog.register({
        environment: 'production'
      });
    }
  }
});

// Configure Google Analytics with environment variable
if (window.gtag) {
  // Re-configure with the environment variable (override the hardcoded one)
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (measurementId) {
    window.gtag('config', measurementId);
    console.log(`🔍 Google Analytics initialized with Measurement ID: ${measurementId}`);
    
    // Set development environment flag in GA4 if in dev mode
    if (import.meta.env.DEV) {
      window.gtag('set', 'debug_mode', true);
      window.gtag('set', 'user_properties', {
        environment: 'development'
      });
    }
  }
}

// Setup scroll depth tracking for growth analysis
const setupScrollDepthTracking = () => {
  let maxScrollDepth = 0;
  let lastTrackedDepth = 0;
  
  const calculateScrollDepth = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    // Calculate how far down the page the user has scrolled
    const scrollDistance = scrollTop + windowHeight;
    const pageScrolled = Math.min(100, Math.floor((scrollDistance / documentHeight) * 100));
    
    // Update max scroll depth
    if (pageScrolled > maxScrollDepth) {
      maxScrollDepth = pageScrolled;
    }
    
    // Track at 25%, 50%, 75%, and 100% thresholds
    const thresholds = [25, 50, 75, 100];
    for (const threshold of thresholds) {
      if (maxScrollDepth >= threshold && lastTrackedDepth < threshold) {
        trackSessionQuality('scroll_depth', {
          value: threshold,
          page_path: window.location.pathname,
          page_title: document.title
        });
        lastTrackedDepth = threshold;
      }
    }
  };
  
  // Throttle scroll event to improve performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        calculateScrollDepth();
        scrollTimeout = null;
      }, 200);
    }
  });
  
  // Track final scroll depth when the user leaves the page
  window.addEventListener('beforeunload', () => {
    if (maxScrollDepth > 0) {
      trackSessionQuality('scroll_depth_final', {
        value: maxScrollDepth,
        page_path: window.location.pathname,
        page_title: document.title,
        time_on_page: Math.floor((Date.now() - window.performance.timing.navigationStart) / 1000)
      });
    }
  });
};

// Setup time on page tracking
const setupTimeOnPageTracking = () => {
  const startTime = Date.now();
  let timeInterval;
  
  // Track time on page every 30 seconds
  timeInterval = setInterval(() => {
    const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
    trackSessionQuality('time_on_page', {
      value: timeOnPage,
      page_path: window.location.pathname,
      page_title: document.title
    });
  }, 30000);
  
  // Clear interval when the user leaves the page
  window.addEventListener('beforeunload', () => {
    clearInterval(timeInterval);
    const finalTimeOnPage = Math.floor((Date.now() - startTime) / 1000);
    trackSessionQuality('time_on_page_final', {
      value: finalTimeOnPage,
      page_path: window.location.pathname,
      page_title: document.title
    });
  });
};

// Run after PostHog is initialized
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setupScrollDepthTracking();
    setupTimeOnPageTracking();
  });
}

// Expose PostHog to window for debugging in development
if (import.meta.env.DEV) {
  window.posthog = posthog;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
