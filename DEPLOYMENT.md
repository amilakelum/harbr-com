# Harbr Website Deployment Guide

This guide will help you deploy the Harbr website with Supabase as the backend service.

## Prerequisites

- Node.js and npm installed on your machine
- A Supabase account
- A web hosting service (Vercel, Netlify, etc.) for the frontend

## Step 1: Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Once your project is created, go to the SQL Editor in your Supabase dashboard.
3. Copy the contents of `supabase/schema.sql` and run them in the SQL Editor to create the necessary tables and security policies.
4. Go to the Project Settings > API to get your project URL and anon key.

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist already).
2. Add the following environment variables:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Step 3: Create an Admin User

To access the admin page, you need to create an authenticated user in Supabase:

1. Go to Authentication > Users in your Supabase dashboard.
2. Click "Add User" and create an admin user with email and password.
3. Use these credentials to log in to the admin page at `/admin`.

## Step 4: Build and Deploy the Website

### Local Development

1. Run `npm install` to install dependencies.
2. Run `npm run dev` to start the development server.
3. Visit `http://localhost:5173` to view the website.

### Production Deployment

#### Option 1: Vercel

1. Push your code to a GitHub repository.
2. Create a new project on [Vercel](https://vercel.com).
3. Connect your GitHub repository.
4. Add the environment variables (from Step 2) in the Vercel dashboard.
5. Deploy the site.

#### Option 2: Netlify

1. Push your code to a GitHub repository.
2. Create a new site on [Netlify](https://netlify.com).
3. Connect your GitHub repository.
4. Add the environment variables (from Step 2) in the Netlify dashboard.
5. Set the build command to `npm run build` and the publish directory to `dist`.
6. Deploy the site.

## Troubleshooting

### Form submissions not working
- Check if your Supabase credentials are correctly set in the environment variables.
- Verify that the database tables and RLS policies have been created correctly.

### Cannot access admin page
- Make sure you've created a user in the Supabase Authentication dashboard.
- Check if you're using the correct credentials to log in.

## Security Considerations

- The current setup allows anyone to submit the registration form, but only authenticated users can view the registrations.
- Consider implementing additional security measures for production, such as rate limiting for form submissions.
- Never expose your Supabase service role key in the frontend code; only use the anon key for client-side access. 