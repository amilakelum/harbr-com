# Harbr - Smart Marina Stays

A modern web application that revolutionizes how boat owners and members book & interact with marinas.

## Features

- Landing page showcasing the marina booking service
- User registration form
- Admin dashboard to view registrations
- Secure backend powered by Supabase

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Supabase (Database, Authentication, API)
- **Deployment**: Ready for deployment on Vercel or Netlify

## Getting Started

### Prerequisites

- Node.js and npm
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd harbr-com
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Then edit `.env.local` with your Supabase credentials.

4. Start the development server
```bash
npm run dev
```

## Supabase Backend Setup

This project uses Supabase as the backend service. Please refer to the following documentation:

- [Supabase Schema](./supabase/README.md) - Database schema and configuration
- [Deployment Guide](./DEPLOYMENT.md) - Step-by-step deployment instructions

## Admin Access

An admin dashboard is available at `/admin` to view all registrations.
You'll need to create a user in Supabase Authentication to access this page.

## Project Structure

- `src/` - Application source code
  - `components/` - React components
  - `pages/` - Page components
  - `lib/` - Utilities and Supabase client
- `public/` - Static assets
- `supabase/` - Supabase configuration and schema

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
