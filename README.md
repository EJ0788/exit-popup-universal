# Universal Exit-Intent Popup for Real Estate Lead Capture

A single Vercel-hosted exit-intent popup that works for multiple clients. Each client uses their own Zapier webhook for lead routing.

## Features

✅ Professional exit-intent detection  
✅ Mobile-responsive design  
✅ Smooth animations  
✅ localStorage conversion tracking  
✅ 3 guide boxes with hover effects  
✅ One codebase, infinite clients  

---

## Deployment to Vercel

### Step 1: Create GitHub Repository

1. Go to GitHub.com and create a new repository
2. Name it: `exit-popup-universal`
3. Make it public or private (your choice)

### Step 2: Upload Files

Upload these files to your repo:
```
exit-popup-universal/
├── package.json
├── vercel.json
└── public/
    └── popup.js
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `exit-popup-universal` repository
5. Click "Deploy"
6. Wait 30-60 seconds
7. Copy your deployment URL (e.g., `https://exit-popup-universal.vercel.app`)

---

## Client Implementation

### For YOU (Corridor Homes):

Paste this into Lofty → Tools → Header Meta Tags (or Custom Code):

```html
<script src="https://YOUR-PROJECT.vercel.app/popup.js?webhook=https://hooks.zapier.com/hooks/catch/25665596/ufkn2ln/"></script>
```

### For FUTURE CLIENTS:

1. Have them create their own Zapier account
2. Set up their Zap: Webhook → Lofty CRM
3. Get their webhook URL
4. Give them this code (with THEIR webhook):

```html
<script src="https://YOUR-PROJECT.vercel.app/popup.js?webhook=THEIR_ZAPIER_URL"></script>
```

**That's it!** One line of code per client.

---

## How It Works

1. Client embeds script tag on their site
2. Script loads with their unique webhook URL as parameter
3. Popup appears on exit-intent
4. Lead submits email
5. Data posts to their Zapier webhook
6. Zapier forwards to their Lofty CRM

---

## Customization (Optional)

To customize popup text for a specific client, you can:

1. Add query parameters for custom text
2. Or create client-specific versions: `popup-clientname.js`

For now, the default copy works for all real estate agents.

---

## Maintenance

**One codebase to rule them all:**

- Push updates to GitHub
- Vercel auto-deploys
- All clients get updates instantly
- No need to touch individual client sites

---

## Support

If a client asks: "Can I self-host this?"

**Answer:** Yes! Give them the `popup.js` file and they can host it anywhere. Just make sure they update the script `src` URL.

---

## Testing

Test on your site:
1. Paste script tag into Lofty
2. Open site in incognito mode
3. Move mouse to top of browser window
4. Popup should appear within 100ms
5. Submit test email
6. Verify it hits Lofty CRM

---

## Pricing for Clients

**Suggested pricing:**
- Setup: $500 one-time
- Includes: Zapier setup + script installation + training
- Monthly: $0 (they pay Zapier $20/mo if over free tier)

**Your cost:** $0/month (Vercel free tier)

---

## Questions?

This is your turnkey solution. Deploy once, sell forever.
