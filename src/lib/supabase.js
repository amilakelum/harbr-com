import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

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
let supabaseAdmin;

try {
  // Create client with improved options
  supabase = createClient(supabaseUrl || '', supabaseKey || '', options);
  
  // Create admin client if service role key is available
  if (supabaseServiceKey) {
    supabaseAdmin = createClient(supabaseUrl || '', supabaseServiceKey, {
      ...options,
      auth: {
        persistSession: false, // Don't persist admin sessions
        autoRefreshToken: false
      }
    });
  } else {
    console.warn('No SERVICE_ROLE key found. Admin operations will be limited by RLS policies.');
    // Fall back to regular client for admin operations
    supabaseAdmin = supabase;
  }
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  
  // Provide a dummy client that logs errors instead of crashing
  const dummyClient = {
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
  
  supabase = dummyClient;
  supabaseAdmin = dummyClient;
}

// Export the clients (either real or fallback)
export { supabase, supabaseAdmin }; 