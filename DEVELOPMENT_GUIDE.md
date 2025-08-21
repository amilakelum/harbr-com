# Development Guide 🛠️

## Email System Development Setup

The email system works differently in development vs production. Here's how to handle both:

## Development Mode (Current Setup)

**What happens:**
- ✅ Form submissions work normally
- ✅ Data is saved to Supabase
- ✅ PostHog tracking works
- 📧 **Email sending is skipped** (prevents fetch errors)
- 📧 **Console logs show what emails would be sent**

**To test:**
1. Run: `npm run dev` 
2. Visit: http://localhost:5174/
3. Submit any form
4. Check browser console for email simulation logs

**Console Output Example:**
```
📧 Development mode: Email sending skipped
📧 Would send emails to: user@example.com
📧 Source: intro_video_section
📧 Additional data: {page: "/", button_text: "Get started for free"}
```

## Full Development Mode (With Emails)

**To test emails in development:**

1. **Start Vercel Dev Server:**
   ```bash
   npm run dev:vercel
   ```
   This runs both your frontend and API endpoints locally.

2. **Visit:** http://localhost:3000/
3. **Submit forms** - Emails will actually be sent!

## Production Mode

**In production (Vercel deployment):**
- ✅ All features work including emails
- 📧 Notifications sent to `devharbr@gmail.com`
- 📧 Welcome emails sent from `devharbr@gmail.com`

## Scripts Available:

```bash
# Standard development (no emails)
npm run dev              # Frontend only on port 5174

# Full development (with emails)
npm run dev:vercel       # Full stack on port 3000
npm run dev:full         # Alternative full stack command

# Production
npm run build           # Build for production
vercel --prod          # Deploy to production
```

## Current Development Flow:

1. **Quick Development:** Use `npm run dev` for fast iteration
2. **Email Testing:** Use `npm run dev:vercel` when you need to test emails
3. **Production Testing:** Deploy with `vercel --prod`

## Troubleshooting:

### "Failed to fetch" errors:
- ✅ **Fixed!** Development mode now handles this gracefully
- Form submission works, emails are simulated in console

### Want to test actual emails in development:
```bash
npm run dev:vercel
```

### Vercel dev not working:
1. Make sure you're logged in: `vercel login`
2. Link project: `vercel link`
3. Try again: `npm run dev:vercel`

## Files Modified:

- ✅ `emailService.js` - Added development mode detection
- ✅ `package.json` - Added Vercel dev scripts
- ✅ Error handling for fetch failures

## Next Steps:

1. **Test current setup:** Form should work without errors now
2. **For email testing:** Use `npm run dev:vercel` when needed
3. **Deploy to production:** `vercel --prod` for full email functionality

The system is now development-friendly! 🎉
