import { supabase } from './supabase';
import posthog from 'posthog-js';
import { createClient } from '@supabase/supabase-js';

/**
 * Generate a persistent distinct ID for PostHog tracking
 * @returns {string} The distinct ID
 */
function getDistinctId() {
  // Check if we already have a stored ID
  let distinctId = localStorage.getItem('ph_distinct_id');
  
  if (!distinctId) {
    // Generate a new ID if none exists
    distinctId = crypto.randomUUID ? crypto.randomUUID() : 
      `anon_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    
    // Store for future use
    try {
      localStorage.setItem('ph_distinct_id', distinctId);
    } catch (e) {
      console.error('Could not store distinct ID:', e);
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
export const saveEmailSubscription = async (email, source, additionalData = {}) => {
  if (!email) {
    console.error('Email is required for subscription');
    return { success: false, error: 'Email is required', errorType: 'validation' };
  }

  try {
    const formattedEmail = email.toLowerCase().trim();
    
    // Prepare the data to save
    const subscriptionData = {
      email: formattedEmail,
      source: source,
      status: 'active',
      created_at: new Date().toISOString(),
      ...additionalData
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
            email: formattedEmail
          }
        });
      }
      
      // Capture the subscription event
      posthog.capture('email_subscription', {
        distinct_id: formattedEmail || distinctId, // Use email as ID if available
        email: formattedEmail,
        source: source,
        form_location: additionalData.page || 'unknown',
        button_text: additionalData.button_text || 'Get started for free'
      });
      
      console.log('PostHog event tracked with distinct_id:', formattedEmail || distinctId);
    } catch (posthogError) {
      console.error('PostHog tracking error (non-critical):', posthogError);
      // Continue with saving to database regardless of PostHog errors
    }

    // Get Supabase API keys from environment variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Simple approach - use direct fetch with proper headers
    // First check if the email exists
    let response = await fetch(
      `${supabaseUrl}/rest/v1/email_subscriptions?email=eq.${encodeURIComponent(formattedEmail)}&select=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=representation'
        }
      }
    );

    if (!response.ok && response.status !== 404) {
      console.error('Error checking if email exists:', response.statusText);
      throw new Error(`HTTP error: ${response.status}`);
    }

    let existingEmail = null;
    if (response.status !== 404) {
      const data = await response.json();
      existingEmail = data.length > 0 ? data[0] : null;
    }

    let result;
    
    if (existingEmail) {
      console.log('Email already exists, updating record:', existingEmail);
      
      // If email already exists, just update the metadata but don't treat it as an error
      // Update existing record
      response = await fetch(
        `${supabaseUrl}/rest/v1/email_subscriptions?email=eq.${encodeURIComponent(formattedEmail)}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            source: source,
            updated_at: new Date().toISOString(),
            ...additionalData
          })
        }
      );
      
      if (!response.ok) {
        console.error('Error updating existing subscription:', response.statusText);
        console.error('Error updating existing subscription:', response[0]);
        console.error('Error updating existing subscription:', response);
        return { 
          success: false, 
          error: `Error updating subscription: ${response.statusText}`, 
          errorType: 'update_failed' 
        };
      }
      
      const data = await response.json();
      // Return success but also indicate this was a duplicate
      return { 
        success: true, 
        data, 
        isExistingEmail: true, 
        message: "You're already subscribed! We've updated your information."
      };
    } else {
      // Insert new record
      response = await fetch(
        `${supabaseUrl}/rest/v1/email_subscriptions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(subscriptionData)
        }
      );
    }

    if (!response.ok) {
      console.error('Error saving subscription:', response.statusText);
      // Check for specific error types
      if (response.status === 409) {
        return { 
          success: false, 
          error: "This email is already subscribed", 
          errorType: 'duplicate_email' 
        };
      } else if (response.status === 422) {
        return { 
          success: false, 
          error: "Invalid email format", 
          errorType: 'validation' 
        };
      } else if (response.status === 401 || response.status === 403) {
        return { 
          success: false, 
          error: "Authentication error. Please try again later", 
          errorType: 'auth' 
        };
      }
      return { 
        success: false, 
        error: `Subscription error (${response.status}): ${response.statusText}`, 
        errorType: 'server' 
      };
    }

    const data = await response.json();
    console.log('Email subscription saved successfully:', data);
    return { 
      success: true, 
      data, 
      message: "Thank you! You're subscribed and we'll be in touch soon."
    };
  } catch (error) {
    console.error('Unexpected error saving email subscription:', error);
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred",
      errorType: 'unexpected' 
    };
  }
};