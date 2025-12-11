# QUICK START - Deploy in 5 Minutes

## Step 1: Create GitHub Repo (2 minutes)

1. Go to https://github.com/new
2. Repository name: `exit-popup-universal`
3. Public or Private (your choice)
4. Click "Create repository"
5. Upload these 4 files:
   - `package.json`
   - `vercel.json`
   - `public/popup.js` (create folder called "public" first)
   - `README.md`

## Step 2: Deploy to Vercel (2 minutes)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select `exit-popup-universal` repo
5. Click "Deploy" (use default settings)
6. Wait 60 seconds
7. **COPY YOUR URL** (looks like: `https://exit-popup-universal-xyz123.vercel.app`)

## Step 3: Install on Your Site (1 minute)

Paste this into Lofty → Tools → Custom Style & Script → Script box:

```html
<script src="https://YOUR-VERCEL-URL-HERE.vercel.app/popup.js?webhook=https://hooks.zapier.com/hooks/catch/25665596/ufkn2ln/"></script>
```

Replace:
- `YOUR-VERCEL-URL-HERE` with your actual Vercel URL
- The webhook URL is already yours (from earlier)

## Step 4: Test (30 seconds)

1. Open your site in incognito mode
2. Move mouse toward top of browser
3. Popup appears!
4. Submit test email
5. Check Lofty CRM for lead

---

## Done! 🎉

Now you have a hosted popup that:
- Works on any website
- Costs $0/month to host
- Can be used by unlimited clients
- Updates instantly when you push to GitHub

---

## For Future Clients:

Just give them this one line (with THEIR webhook):

```html
<script src="https://YOUR-VERCEL-URL.vercel.app/popup.js?webhook=THEIR_ZAPIER_URL"></script>
```

That's it!
