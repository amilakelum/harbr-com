import posthog from 'posthog-js';

/**
 * Analytics utility functions for tracking events and page views
 */

/**
 * Track a custom event in PostHog
 * @param {string} eventName - The name of the event to track
 * @param {Object} properties - Event properties to include
 */
export const trackEvent = (eventName, properties = {}) => {
  try {
    posthog.capture(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Error tracking event ${eventName}:`, error);
  }
};

/**
 * Track a page view
 * @param {string} pageName - The page name being viewed
 * @param {Object} properties - Additional properties
 */
export const trackPageView = (pageName, properties = {}) => {
  try {
    posthog.capture('$pageview', {
      page_name: pageName,
      page_url: window.location.href,
      page_path: window.location.pathname,
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking page view for ${pageName}:`, error);
  }
};

/**
 * Identify a user in PostHog
 * @param {string} userId - Unique identifier for the user (typically email)
 * @param {Object} traits - User properties to store
 */
export const identifyUser = (userId, traits = {}) => {
  try {
    posthog.identify(userId, traits);
  } catch (error) {
    console.error(`Error identifying user ${userId}:`, error);
  }
};

/**
 * Set up a funnel step completion
 * @param {string} funnelName - The name of the funnel
 * @param {number} stepNumber - The step number completed
 * @param {Object} properties - Additional properties about the step
 */
export const trackFunnelStep = (funnelName, stepNumber, properties = {}) => {
  try {
    posthog.capture(`${funnelName}_step_${stepNumber}`, {
      funnel_name: funnelName,
      step_number: stepNumber,
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking funnel step for ${funnelName}:`, error);
  }
};

/**
 * Track form interactions
 * @param {string} formName - The name of the form
 * @param {string} action - The action taken (submit, field_change, validation_error, etc.)
 * @param {Object} properties - Additional properties
 */
export const trackFormInteraction = (formName, action, properties = {}) => {
  try {
    posthog.capture(`form_${action}`, {
      form_name: formName,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking form interaction for ${formName}:`, error);
  }
};

/**
 * Track user onboarding progress
 * @param {string} step - The onboarding step name
 * @param {boolean} completed - Whether the step was completed successfully
 * @param {Object} properties - Additional properties
 */
export const trackOnboarding = (step, completed = true, properties = {}) => {
  try {
    posthog.capture('onboarding_progress', {
      step_name: step,
      completed,
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking onboarding step ${step}:`, error);
  }
};

/**
 * Track errors that occur in the application
 * @param {string} errorType - The type of error
 * @param {string} message - Error message
 * @param {Object} properties - Additional context about the error
 */
export const trackError = (errorType, message, properties = {}) => {
  try {
    posthog.capture('app_error', {
      error_type: errorType,
      error_message: message,
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking app error of type ${errorType}:`, error);
  }
};

/**
 * Track feature usage
 * @param {string} featureName - The name of the feature being used
 * @param {Object} properties - Additional properties about feature usage
 */
export const trackFeatureUsage = (featureName, properties = {}) => {
  try {
    posthog.capture('feature_used', {
      feature_name: featureName,
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking feature usage for ${featureName}:`, error);
  }
};

export default {
  trackEvent,
  trackPageView,
  identifyUser,
  trackFunnelStep,
  trackFormInteraction,
  trackOnboarding,
  trackError,
  trackFeatureUsage,
}; 