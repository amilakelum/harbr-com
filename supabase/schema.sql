-- Create a table for user registrations
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  region TEXT,
  preferred_marinas TEXT,
  start_date TEXT,
  stay_length TEXT,
  interest TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

  CONSTRAINT email_unique UNIQUE (email)
);

-- Create a secure RLS policy: only authenticated users can read registrations
CREATE POLICY "Registrations are viewable by authenticated users only" 
  ON registrations FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Anyone can insert their own registration data
CREATE POLICY "Anyone can insert their own registration" 
  ON registrations FOR INSERT 
  WITH CHECK (true);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY; 