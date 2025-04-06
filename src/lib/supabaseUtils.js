import { supabase } from './supabase';
import posthog from 'posthog-js';
import { createClient } from '@supabase/supabase-js';

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
    return { success: false, error: 'Email is required' };
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

    // Track event in PostHog
    posthog.capture('email_subscription_added', {
      distinct_id: localStorage.getItem('session_id'),
      email: email,
      source: source,
      timestamp: new Date().toISOString(),
      ...additionalData
    });

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
      return { success: false, error: `HTTP error: ${response.status}` };
    }

    const data = await response.json();
    console.log('Email subscription saved successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error saving email subscription:', error);
    return { success: false, error: error.message };
  }
};