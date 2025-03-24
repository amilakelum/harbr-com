import posthog from 'posthog-js';

/**
 * Growth Analytics Utility - Comprehensive event tracking for user acquisition and engagement
 */

// Core tracking helpers
const CORE_PROPERTIES = {
  getBaseProperties: () => ({
    timestamp: new Date().toISOString(),
    url_path: window.location.pathname,
    url_host: window.location.hostname,
    url_params: window.location.search,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    referrer: document.referrer || 'direct',
    device_type: getDeviceType(),
    utm_source: getUTMParam('utm_source'),
    utm_medium: getUTMParam('utm_medium'),
    utm_campaign: getUTMParam('utm_campaign'),
    utm_content: getUTMParam('utm_content'),
    utm_term: getUTMParam('utm_term')
  })
};

// Helper functions for extracting UTM parameters and device info
function getUTMParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || null;
}

function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Track a custom event in PostHog with enhanced growth metrics
 * @param {string} eventName - The name of the event to track
 * @param {Object} properties - Event properties to include
 */
export const trackEvent = (eventName, properties = {}) => {
  try {
    posthog.capture(eventName, {
      ...CORE_PROPERTIES.getBaseProperties(),
      ...properties,
    });
    console.log(`🔍 Event tracked: ${eventName}`, properties);
  } catch (error) {
    console.error(`Error tracking event ${eventName}:`, error);
  }
};

/**
 * Track a page view with enhanced analytics
 * @param {string} pageName - The page name being viewed
 * @param {Object} properties - Additional properties
 */
export const trackPageView = (pageName, properties = {}) => {
  try {
    posthog.capture('page_viewed', {
      ...CORE_PROPERTIES.getBaseProperties(),
      page_name: pageName,
      page_title: document.title,
      page_section: getSectionFromPath(window.location.pathname),
      is_landing_page: isLandingPage(),
      ...properties,
    });
    console.log(`📄 Page viewed: ${pageName}`);
  } catch (error) {
    console.error(`Error tracking page view for ${pageName}:`, error);
  }
};

// Helper to determine if the current page is a landing page
function isLandingPage() {
  return window.location.pathname === '/' || 
         window.location.pathname === '/start' ||
         window.location.search.includes('utm_');
}

// Helper to get section from path
function getSectionFromPath(path) {
  const sections = path.split('/').filter(Boolean);
  return sections[0] || 'home';
}

/**
 * Track component viewing (when important components enter viewport)
 * @param {string} componentName - Name of the component viewed
 * @param {Object} properties - Additional properties
 */
export const trackComponentView = (componentName, properties = {}) => {
  try {
    posthog.capture('component_viewed', {
      ...CORE_PROPERTIES.getBaseProperties(),
      component_name: componentName,
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking component view for ${componentName}:`, error);
  }
};

/**
 * Identify a user in PostHog with enhanced user properties
 * @param {string} userId - Unique identifier for the user (typically email)
 * @param {Object} traits - User properties to store
 */
export const identifyUser = (userId, traits = {}) => {
  try {
    // Enriched user properties for better segmentation
    const enrichedTraits = {
      ...traits,
      $set_once: {
        first_seen_at: new Date().toISOString(),
        initial_referrer: document.referrer || 'direct',
        initial_utm_source: getUTMParam('utm_source'),
        initial_utm_medium: getUTMParam('utm_medium'),
        initial_utm_campaign: getUTMParam('utm_campaign'),
        initial_landing_page: window.location.pathname,
        ...traits.$set_once
      }
    };

    posthog.identify(userId, enrichedTraits);
    console.log(`👤 User identified: ${userId}`);
  } catch (error) {
    console.error(`Error identifying user ${userId}:`, error);
  }
};

/**
 * Set up a funnel step completion with progression tracking
 * @param {string} funnelName - The name of the funnel
 * @param {number} stepNumber - The step number completed
 * @param {Object} properties - Additional properties about the step
 */
export const trackFunnelStep = (funnelName, stepNumber, properties = {}) => {
  try {
    posthog.capture(`${funnelName}_step_${stepNumber}`, {
      ...CORE_PROPERTIES.getBaseProperties(),
      funnel_name: funnelName,
      step_number: stepNumber,
      step_name: properties.step_name || `Step ${stepNumber}`,
      total_steps: properties.total_steps,
      time_spent_on_step: properties.time_spent,
      is_last_step: properties.is_last_step || false,
      ...properties,
    });
    console.log(`⚡ Funnel progress: ${funnelName} step ${stepNumber}`);
  } catch (error) {
    console.error(`Error tracking funnel step for ${funnelName}:`, error);
  }
};

/**
 * Track form interactions with enhanced analytics
 * @param {string} formName - The name of the form
 * @param {string} action - The action taken (submit, field_change, validation_error, etc.)
 * @param {Object} properties - Additional properties
 */
export const trackFormInteraction = (formName, action, properties = {}) => {
  try {
    posthog.capture(`form_${action}`, {
      ...CORE_PROPERTIES.getBaseProperties(),
      form_name: formName,
      form_action: action,
      field_name: properties.field_name,
      field_type: properties.field_type, 
      field_position: properties.field_position,
      input_method: properties.input_method || 'manual',
      time_spent_on_field: properties.time_spent,
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking form interaction for ${formName}:`, error);
  }
};

/**
 * Track conversion events (key business outcomes)
 * @param {string} conversionType - Type of conversion (signup, booking, etc.)
 * @param {Object} properties - Details about the conversion
 */
export const trackConversion = (conversionType, properties = {}) => {
  try {
    posthog.capture(`conversion_${conversionType}`, {
      ...CORE_PROPERTIES.getBaseProperties(),
      conversion_type: conversionType,
      conversion_value: properties.value,
      currency: properties.currency || 'USD',
      ...properties,
    });
    console.log(`🎯 Conversion: ${conversionType}`);
  } catch (error) {
    console.error(`Error tracking conversion ${conversionType}:`, error);
  }
};

/**
 * Track user engagement events
 * @param {string} engagementType - Type of engagement (click, scroll, hover, etc.)
 * @param {Object} properties - Details about the engagement
 */
export const trackEngagement = (engagementType, properties = {}) => {
  try {
    posthog.capture(`engagement_${engagementType}`, {
      ...CORE_PROPERTIES.getBaseProperties(),
      engagement_type: engagementType,
      target_element: properties.element,
      target_type: properties.type,
      content_type: properties.content_type,
      content_id: properties.content_id,
      engagement_duration: properties.duration,
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking engagement ${engagementType}:`, error);
  }
};

/**
 * Track session quality metrics
 * @param {string} metricType - Type of metric (scroll_depth, time_on_page, etc.)
 * @param {Object} properties - Metric details
 */
export const trackSessionQuality = (metricType, properties = {}) => {
  try {
    posthog.capture(`session_quality_${metricType}`, {
      ...CORE_PROPERTIES.getBaseProperties(),
      metric_type: metricType,
      metric_value: properties.value,
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking session quality ${metricType}:`, error);
  }
};

/**
 * Track error events with enhanced error context
 * @param {string} errorType - The type of error
 * @param {string} message - Error message
 * @param {Object} properties - Additional context about the error
 */
export const trackError = (errorType, message, properties = {}) => {
  try {
    posthog.capture('error_occurred', {
      ...CORE_PROPERTIES.getBaseProperties(),
      error_type: errorType,
      error_message: message,
      error_source: properties.source || 'client',
      component: properties.component,
      recovery_attempted: properties.recovery_attempted || false,
      recovery_successful: properties.recovery_successful,
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking app error of type ${errorType}:`, error);
  }
};

/**
 * Track feature usage with detailed analytics
 * @param {string} featureName - The name of the feature being used
 * @param {Object} properties - Additional properties about feature usage
 */
export const trackFeatureUsage = (featureName, properties = {}) => {
  try {
    posthog.capture('feature_used', {
      ...CORE_PROPERTIES.getBaseProperties(),
      feature_name: featureName,
      feature_category: properties.category,
      feature_location: properties.location,
      interaction_method: properties.method,
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking feature usage for ${featureName}:`, error);
  }
};

/**
 * Track content engagement (viewing, scrolling, interaction)
 * @param {string} contentType - Type of content (blog, product, etc.)
 * @param {string} action - Action performed (view, scroll, share)
 * @param {Object} properties - Details about the content and action
 */
export const trackContentEngagement = (contentType, action, properties = {}) => {
  try {
    posthog.capture(`content_${action}`, {
      ...CORE_PROPERTIES.getBaseProperties(),
      content_type: contentType,
      content_id: properties.id,
      content_title: properties.title,
      content_category: properties.category,
      engagement_time: properties.time,
      scroll_depth: properties.scroll_depth,
      ...properties,
    });
  } catch (error) {
    console.error(`Error tracking content engagement for ${contentType}:`, error);
  }
};

/**
 * Track CTA (Call to Action) interactions
 * @param {string} ctaId - Identifier for the CTA
 * @param {string} ctaText - Text of the CTA
 * @param {Object} properties - Additional properties
 */
export const trackCTAInteraction = (ctaId, ctaText, properties = {}) => {
  try {
    posthog.capture('cta_clicked', {
      ...CORE_PROPERTIES.getBaseProperties(),
      cta_id: ctaId,
      cta_text: ctaText,
      cta_location: properties.location,
      cta_type: properties.type || 'button',
      cta_position: properties.position,
      page_section: properties.section,
      ...properties,
    });
    console.log(`🔘 CTA clicked: ${ctaText}`);
  } catch (error) {
    console.error(`Error tracking CTA interaction for ${ctaId}:`, error);
  }
};

// Export all functions
export default {
  trackEvent,
  trackPageView,
  trackComponentView,
  identifyUser,
  trackFunnelStep,
  trackFormInteraction,
  trackConversion,
  trackEngagement,
  trackSessionQuality,
  trackError,
  trackFeatureUsage,
  trackContentEngagement,
  trackCTAInteraction,
}; 