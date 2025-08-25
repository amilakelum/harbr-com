# Resend Email Setup Guide 📧

This guide will help you set up automatic email notifications when users submit your forms.

## What This Does:

When someone submits the form on your website:

1. **📩 You get notified** - A notification email is sent to `devharbr@gmail.com` with the subscriber details
2. **📝 Manual follow-up** - You handle welcome emails and follow-ups manually for personalized touch
3. **💾 Data is tracked** - Analytics are tracked via PostHog for insights

## Setup Steps:

### 1. Get Your Resend API Key

1. **Sign up at Resend**: Go to [https://resend.com](https://resend.com) and create an account using `amilakelum44@gmail.com`
2. **Verify your email**: Check your inbox and verify your account
3. **Get API Key**:
   - Login to Resend dashboard
   - Go to **API Keys** section
   - Click **Create API Key**
   - Name it "Harbr Production"
   - Copy the API key (starts with `re_`)

### 2. Add API Key to Environment

#### For Local Development:

Update your `.env` file:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

#### For Production (Vercel):

1. Go to your Vercel dashboard
2. Navigate to your project → Settings → Environment Variables
3. Add a new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_actual_api_key_here`
   - **Environment**: Production

### 3. Domain Setup (Optional but Recommended)

To send emails from your own domain instead of Resend's:

1. **Add Domain in Resend**:

   - Go to Resend dashboard → Domains
   - Add `harbr.com`
   - Add the required DNS records to your domain provider

2. **Update API Endpoint**:
   - Edit `/api/send-emails.js`
   - Change `from: 'Harbr Notifications <noreply@harbr.com>'` to use your domain

### 4. Test the Integration

#### Local Testing:

```bash
npm run dev
```

1. Fill out the form on your homepage
2. Check the console for success/error messages
3. Check both email inboxes (yours and the test email)

#### Production Testing:

```bash
vercel --prod
```

1. Test the live site form
2. Monitor Vercel function logs for any errors

## Email Templates:

### Admin Notification Email (to you):

- **To**: `devharbr@gmail.com`
- **From**: `Harbr Notifications <onboarding@resend.dev>`
- **Subject**: `🚢 New Harbr subscription from [email]`
- **Content**: Subscriber details, source, timestamp, manual follow-up reminder

### Manual Welcome Process:

- **Welcome emails**: Handled manually for personalized touch
- **Follow-up**: Personal outreach for demos and consultations
- **Flexibility**: Customize message based on subscriber source and needs

## Customization:

### Update Email Templates:

Edit `/api/send-emails.js` to customize:

- Email content and styling
- From addresses
- Subject lines
- Call-to-action buttons

### Update Admin Email:

Change `adminEmail` variable in `/api/send-emails.js`:

```javascript
const adminEmail = "your-new-email@example.com";
```

## Monitoring:

- **Resend Dashboard**: View delivery status, opens, clicks
- **Vercel Logs**: Monitor API endpoint performance
- **Browser Console**: Check for client-side errors

## Troubleshooting:

### Common Issues:

1. **"Failed to send email" errors**:

   - Verify RESEND_API_KEY is correctly set
   - Check API key is valid in Resend dashboard
   - Check Vercel function logs

2. **Emails not received**:

   - Check spam folders
   - Verify domain configuration (if using custom domain)
   - Check Resend dashboard for delivery status

3. **"process is not defined" errors**:
   - Make sure you're using the API endpoint, not importing Resend in frontend code

## Pricing:

- **Free Tier**: 100 emails/day, 3,000 emails/month
- **Perfect for**: Testing and small-scale operations
- **Paid Plans**: Start at $20/month for higher volumes

## Files Created/Modified:

- ✅ `/api/send-emails.js` - Email sending endpoint
- ✅ `/src/lib/emailService.js` - Email service utility
- ✅ `/src/lib/supabaseUtils.js` - Updated to trigger emails
- ✅ `.env` - Added RESEND_API_KEY

## Next Steps:

1. ✅ Get your Resend API key
2. ✅ Add it to your environment variables
3. ✅ Deploy to production
4. ✅ Test the form submission
5. ✅ Check both email inboxes
6. ✅ Customize email templates as needed

You're all set! 🚀

When someone fills out your form, you'll get notified immediately and they'll receive a professional welcome email from you personally.
