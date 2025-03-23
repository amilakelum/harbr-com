# Supabase Backend Setup for Harbr

This directory contains the database schema and configuration for the Harbr website backend powered by Supabase.

## Setup Instructions

1. Create a Supabase account at [supabase.com](https://supabase.com) if you don't have one.
2. Create a new project in Supabase.
3. Go to the SQL Editor in your Supabase dashboard.
4. Run the SQL commands in `schema.sql` to set up the database schema and security policies.
5. Get your project's URL and anon key from the project's API settings.
6. Add these credentials to your `.env.local` file:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Database Schema

The backend has the following table:

### Registrations

Stores user registration information from the Harbr website form.

- `id`: UUID - Primary key
- `email`: TEXT - User's email address (required)
- `name`: TEXT - User's name
- `region`: TEXT - User's home marina
- `preferred_marinas`: TEXT - User's preferred marina(s)
- `start_date`: TEXT - User's preferred booking start date
- `stay_length`: TEXT - User's preferred length of stay
- `interest`: TEXT - User's interest (book, list, both, operator)
- `created_at`: TIMESTAMP - When the registration was created

## Security

The database uses Row Level Security (RLS) policies:

1. Registrations can be inserted by anyone (to allow website visitors to register)
2. Registrations can only be viewed by authenticated users (for admin access)

## Accessing Registration Data

To access registration data for admin purposes, you can:

1. Use the Supabase dashboard to view the data directly
2. Create an admin panel that authenticates users before allowing access to the data
3. Use Supabase auth to authenticate admin users

## Next Steps for Implementation

1. Set up Supabase authentication if you need an admin panel
2. Consider adding email notifications using Supabase Edge Functions
3. Add additional tables as needed for marina listings, bookings, etc. 