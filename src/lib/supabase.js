import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log a clear error message if credentials are missing
if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Missing Supabase credentials. Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file'
  );
}

// Create and export the Supabase client with improved options
const options = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    },
  },
};

let supabase;

try {
  // Create client with improved options
  supabase = createClient(supabaseUrl || '', supabaseKey || '', options);
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  
  // Provide a dummy client that logs errors instead of crashing
  supabase = {
    from: () => ({
      select: () => {
        console.error('Using fallback Supabase client - real client failed to initialize');
        return Promise.reject(new Error('Supabase client initialization failed'));
      },
      insert: () => {
        console.error('Using fallback Supabase client - real client failed to initialize');
        return Promise.reject(new Error('Supabase client initialization failed'));
      },
      update: () => {
        console.error('Using fallback Supabase client - real client failed to initialize');
        return Promise.reject(new Error('Supabase client initialization failed'));
      },
      headers: () => ({
        select: () => ({
          eq: () => ({
            maybeSingle: () => Promise.reject(new Error('Supabase client initialization failed'))
          })
        }),
        insert: () => Promise.reject(new Error('Supabase client initialization failed')),
        update: () => ({
          eq: () => Promise.reject(new Error('Supabase client initialization failed'))
        }),
      }),
    }),
  };
}

// Export the client (either real or fallback)
export { supabase }; 