# 🚀 Deployment Guide

This guide helps you deploy the Cloud-Powered Task Manager to the cloud with a live URL that anyone can visit.

## Quick Deploy (Easiest)

### Option 1: **Railway** (Recommended ⭐)

Railway is the easiest option. It:
- ✅ Supports Docker & docker-compose
- ✅ Free tier (plenty for testing)
- ✅ Automatic HTTPS
- ✅ Auto-deploys on every push to GitHub
- ✅ Easy environment variable setup

#### Steps:

1. **Go to Railway.app**
   ```
   https://railway.app
   ```

2. **Click "Start a New Project"**

3. **Select "Deploy from GitHub"**

4. **Connect your GitHub account** (if not already)

5. **Select this repository:**
   ```
   cloud-powered-task-manager
   ```

6. **Railway will detect docker-compose.yml automatically**

7. **Set Environment Variables:**
   - Go to your project's "Variables" tab
   - Click "New Variable"
   - Add the following:
   
   ```
   PORT=5000
   NODE_ENV=production
   CORS_ORIGIN=https://YOUR-RAILWAY-URL-HERE.up.railway.app
   JWT_SECRET=R9kL3pQvM2xN5jW8yF1tH7sG4aB6cD9eE2rT5uI8oP0lK
   JWT_EXPIRES_IN=7d
   CLOUDANT_URL=                    (leave blank for in-memory DB)
   CLOUDANT_API_KEY=                (leave blank for in-memory DB)
   CLOUDANT_DATABASE=tasks-db
   ```

8. **Wait for deployment** (~3-5 minutes)

9. **Get your URL:**
   - Railway will give you a URL like `https://cloud-powered-task-manager-production.up.railway.app`
   - This is your live app! 🎉

10. **Add to GitHub:**
    ```bash
    gh repo edit premsahu-3125/cloud-powered-task-manager --homepage "https://YOUR-RAILWAY-URL.up.railway.app"
    ```

---

### Option 2: **Render** (Alternative)

Render is similar to Railway with a free tier:

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub repo
4. Use these settings:
   - **Environment:** Docker
   - **Build Command:** (leave empty, uses Dockerfile)
   - **Start Command:** (leave empty, uses Dockerfile)
5. Add the same environment variables as above
6. Deploy and wait for URL

---

### Option 3: **Fly.io** (Advanced)

Fly.io is powerful and free:

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Authenticate: `flyctl auth login`
3. Create app: `flyctl launch`
4. Answer prompts and deploy
5. Get URL from dashboard

---

## After Deployment

### ✅ Verify It Works

1. Open your Railway URL in browser
2. Try logging in with test account:
   - **Email:** `test@example.com`
   - **Password:** `Test@123`
3. Create a few tasks to verify DB works

### ✅ Add to GitHub About Section

Once your URL is live:

```bash
# Option 1: Using GitHub CLI
gh repo edit premsahu-3125/cloud-powered-task-manager \
  --homepage "https://YOUR-URL-HERE.up.railway.app"

# Option 2: Manual
# Go to GitHub repo → Settings → About
# Add the URL in the "Website" field
```

This makes the link visible in your repo's About section! 🔗

---

## Environment Variables Explained

| Variable | Value | Notes |
|----------|-------|-------|
| `PORT` | `5000` | Backend port |
| `NODE_ENV` | `production` | For production deployment |
| `CORS_ORIGIN` | Your Railway URL | Must match frontend URL |
| `JWT_SECRET` | Keep the provided one | Secret key for JWT tokens |
| `JWT_EXPIRES_IN` | `7d` | Token expiration time |
| `CLOUDANT_URL` | (blank) | Optional: IBM Cloudant URL |
| `CLOUDANT_API_KEY` | (blank) | Optional: IBM Cloudant API key |

---

## Troubleshooting

### "Connection refused" errors
- Make sure `CORS_ORIGIN` matches your exact Railway URL
- Wait 30 seconds for services to fully start

### "Cannot find module"
- Check Railway logs for errors
- The Docker build should handle `npm install` automatically

### "Database errors"
- If you didn't provide Cloudant credentials, the app uses in-memory storage (data lost on restart)
- To persist data, add Cloudant credentials

---

## Costs

| Service | Cost |
|---------|------|
| Railway | Free tier: ~$5 credit/month (enough for demo) |
| Render | Free tier: Limited, but free |
| Fly.io | Free tier: Available, with limits |

For a portfolio project, free tier is perfect! 🎯

---

## Next: Add Deployment Badge to README

Once deployed, update your README.md:

```markdown
## 🚀 Live Demo

[Open the app in your browser](https://YOUR-URL-HERE.up.railway.app) 🎉

Or try with Docker:
```

---

## Getting Help

- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Fly Docs: https://fly.io/docs

**Happy deploying!** 🚀
