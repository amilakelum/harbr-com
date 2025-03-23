import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Replace with your Supabase URL and anon key from your project settings
// Important: In a production environment, these should be stored in environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anonymous Key. Please set environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to add a new registration
export async function addRegistration(userData) {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .insert([userData])
      .select();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding registration:', error);
    return { data: null, error };
  }
}

// Helper function to get all registrations (for admin purposes)
export async function getRegistrations() {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return { data: null, error };
  }
} 