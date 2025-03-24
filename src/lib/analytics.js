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

// Google Analytics (GA4) helper functions
const GA = {
  /**
   * Track a custom event in Google Analytics
   * @param {string} eventName - The event name to track
   * @param {Object} parameters - Event parameters to include
   */
  trackEvent: (eventName, parameters = {}) => {
    try {
      if (window.gtag) {
        window.gtag('event', eventName, parameters);
        console.log(`📊 GA4 event tracked: ${eventName}`, parameters);
      }
    } catch (error) {
      console.error(`Error tracking GA4 event ${eventName}:`, error);
    }
  },

  /**
   * Set user properties in Google Analytics
   * @param {Object} properties - User properties to set
   */
  setUserProperties: (properties = {}) => {
    try {
      if (window.gtag) {
        window.gtag('set', 'user_properties', properties);
        console.log(`👤 GA4 user properties set`, properties);
      }
    } catch (error) {
      console.error(`Error setting GA4 user properties:`, error);
    }
  },

  /**
   * Properly format event names for GA4
   * Converts to snake_case and ensures compliance with GA4 naming conventions
   * @param {string} eventName - The event name to format
   * @returns {string} - The formatted event name
   */
  formatEventName: (eventName) => {
    // Convert to snake_case and remove any special characters except underscores
    return eventName
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  }
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
 * Also tracks the event in Google Analytics for cross-platform analytics
 * @param {string} eventName - The name of the event to track
 * @param {Object} properties - Event properties to include
 */
export const trackEvent = (eventName, properties = {}) => {
  try {
    // Track in PostHog
    posthog.capture(eventName, {
      ...CORE_PROPERTIES.getBaseProperties(),
      ...properties,
    });
    
    // Track in Google Analytics (with properly formatted event name)
    const ga4EventName = GA.formatEventName(eventName);
    GA.trackEvent(ga4EventName, properties);
    
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
    // Prepare common properties for both platforms
    const pageProperties = {
      ...CORE_PROPERTIES.getBaseProperties(),
      page_name: pageName,
      page_title: document.title,
      page_section: getSectionFromPath(window.location.pathname),
      is_landing_page: isLandingPage(),
      ...properties,
    };
    
    // Track in PostHog
    posthog.capture('page_viewed', pageProperties);
    
    // Track in Google Analytics as page_view event
    // GA4 uses different parameter format for page_view events
    GA.trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_name: pageName,
      ...properties
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
    const componentProperties = {
      ...CORE_PROPERTIES.getBaseProperties(),
      component_name: componentName,
      ...properties,
    };
    
    // Track in PostHog
    posthog.capture('component_viewed', componentProperties);
    
    // Track in Google Analytics
    GA.trackEvent('component_view', {
      component_name: componentName,
      ...properties
    });
  } catch (error) {
    console.error(`Error tracking component view for ${componentName}:`, error);
  }
};

/**
 * Identify a user in PostHog and Google Analytics with enhanced user properties
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

    // Identify in PostHog
    posthog.identify(userId, enrichedTraits);
    
    // Set user properties in Google Analytics (limited set of relevant properties)
    const gaUserProperties = {
      user_id: userId,
      email: traits.email,
      user_type: traits.user_type || traits.userType,
      region: traits.region,
      first_seen_at: traits.$set_once?.first_seen_at || new Date().toISOString(),
    };
    GA.setUserProperties(gaUserProperties);
    
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
    const funnelProperties = {
      ...CORE_PROPERTIES.getBaseProperties(),
      funnel_name: funnelName,
      step_number: stepNumber,
      step_name: properties.step_name || `Step ${stepNumber}`,
      total_steps: properties.total_steps,
      time_spent_on_step: properties.time_spent,
      is_last_step: properties.is_last_step || false,
      ...properties,
    };
    
    // Track in PostHog with specific funnel step event name
    posthog.capture(`${funnelName}_step_${stepNumber}`, funnelProperties);
    
    // Track in Google Analytics
    GA.trackEvent('funnel_step', {
      funnel_name: funnelName,
      step_number: stepNumber,
      step_name: properties.step_name || `Step ${stepNumber}`,
      ...properties
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
    const formProperties = {
      ...CORE_PROPERTIES.getBaseProperties(),
      form_name: formName,
      form_action: action,
      field_name: properties.field_name,
      field_type: properties.field_type, 
      field_position: properties.field_position,
      input_method: properties.input_method || 'manual',
      time_spent_on_field: properties.time_spent,
      ...properties,
    };
    
    // Track in PostHog
    posthog.capture(`form_${action}`, formProperties);
    
    // Track in Google Analytics
    GA.trackEvent('form_interaction', {
      form_name: formName,
      action_type: action,
      ...properties
    });
    
    // Special handling for form steps to ensure consistent funnel tracking in GA4
    if (action === 'next_step' || action === 'step_changed') {
      GA.trackEvent('form_step', {
        form_name: formName,
        step_number: properties.next_step || properties.step_number,
        ...properties
      });
    }
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
    const conversionProperties = {
      ...CORE_PROPERTIES.getBaseProperties(),
      conversion_type: conversionType,
      conversion_value: properties.value,
      currency: properties.currency || 'USD',
      ...properties,
    };
    
    // Track in PostHog
    posthog.capture(`conversion_${conversionType}`, conversionProperties);
    
    // Track in Google Analytics
    GA.trackEvent('conversion', {
      conversion_type: conversionType,
      ...properties
    });
    
    // If this is a sign-up conversion, track with Google's recommended event name
    if (conversionType === 'signup_completed' || conversionType.includes('signup')) {
      GA.trackEvent('sign_up', {
        method: properties.method || 'form',
        ...properties
      });
    }
    
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
    const engagementProperties = {
      ...CORE_PROPERTIES.getBaseProperties(),
      engagement_type: engagementType,
      target_element: properties.element,
      target_type: properties.type,
      content_type: properties.content_type,
      content_id: properties.content_id,
      engagement_duration: properties.duration,
      ...properties,
    };
    
    // Track in PostHog
    posthog.capture(`engagement_${engagementType}`, engagementProperties);
    
    // Track in Google Analytics
    GA.trackEvent('user_engagement', {
      engagement_type: engagementType,
      ...properties
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
    const qualityProperties = {
      ...CORE_PROPERTIES.getBaseProperties(),
      metric_type: metricType,
      metric_value: properties.value,
      ...properties,
    };
    
    // Track in PostHog
    posthog.capture(`session_quality_${metricType}`, qualityProperties);
    
    // Track key session quality metrics in Google Analytics
    if (metricType === 'scroll_depth_final' || metricType === 'time_on_page_final') {
      GA.trackEvent('session_quality', {
        metric_type: metricType,
        metric_value: properties.value,
        ...properties
      });
    }
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
    const errorProperties = {
      ...CORE_PROPERTIES.getBaseProperties(),
      error_type: errorType,
      error_message: message,
      error_source: properties.source || 'client',
      component: properties.component,
      recovery_attempted: properties.recovery_attempted || false,
      recovery_successful: properties.recovery_successful,
      ...properties,
    };
    
    // Track in PostHog
    posthog.capture('error_occurred', errorProperties);
    
    // Track in Google Analytics
    GA.trackEvent('exception', {
      description: `${errorType}: ${message}`,
      fatal: properties.fatal || false,
      ...properties
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
    const featureProperties = {
      ...CORE_PROPERTIES.getBaseProperties(),
      feature_name: featureName,
      feature_category: properties.category,
      feature_location: properties.location,
      interaction_method: properties.method,
      ...properties,
    };
    
    // Track in PostHog
    posthog.capture('feature_used', featureProperties);
    
    // Track in Google Analytics
    GA.trackEvent('feature_use', {
      feature_name: featureName,
      ...properties
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
    const contentProperties = {
      ...CORE_PROPERTIES.getBaseProperties(),
      content_type: contentType,
      content_id: properties.id,
      content_title: properties.title,
      content_category: properties.category,
      engagement_time: properties.time,
      scroll_depth: properties.scroll_depth,
      ...properties,
    };
    
    // Track in PostHog
    posthog.capture(`content_${action}`, contentProperties);
    
    // Track in Google Analytics with recommended event names
    const gaAction = action === 'view' ? 'view_item' : `content_${action}`;
    GA.trackEvent(gaAction, {
      content_type: contentType,
      item_id: properties.id,
      item_name: properties.title,
      ...properties
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
    const ctaProperties = {
      ...CORE_PROPERTIES.getBaseProperties(),
      cta_id: ctaId,
      cta_text: ctaText,
      cta_location: properties.location,
      cta_type: properties.type || 'button',
      cta_position: properties.position,
      page_section: properties.section,
      ...properties,
    };
    
    // Track in PostHog
    posthog.capture('cta_clicked', ctaProperties);
    
    // Track in Google Analytics as a click event
    GA.trackEvent('click', {
      item_id: ctaId,
      item_name: ctaText,
      content_type: 'cta',
      location: properties.location,
      ...properties
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