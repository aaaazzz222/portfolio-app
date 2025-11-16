# Deployment Guide

This guide provides step-by-step instructions for deploying both the front-end React application and the back-end API.

## Table of Contents
1. [Back-End Deployment (Render)](#back-end-deployment-render)
2. [Front-End Deployment (Vercel)](#front-end-deployment-vercel)
3. [Front-End Deployment (Netlify)](#front-end-deployment-netlify)
4. [Post-Deployment Configuration](#post-deployment-configuration)

---

## Back-End Deployment (Render)

### Prerequisites
- Your back-end API code in a GitHub repository
- A Render account (free tier available)

### Steps

1. **Log in to Render**
   - Go to [render.com](https://render.com)
   - Sign up or log in with GitHub

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository containing the back-end code
   - Select the repository

3. **Configure the Service**
   - **Name**: `portfolio-api` (or any name you prefer)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` or `node server.js`
   - **Plan**: Free

4. **Set Environment Variables**
   Click "Advanced" and add your environment variables:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   NODE_ENV=production
   CORS_ORIGIN=<your-frontend-url>
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for the deployment to complete
   - Copy the deployed URL (e.g., `https://portfolio-api.onrender.com`)

6. **Test the API**
   ```bash
   curl https://your-api-url.onrender.com/api/projects
   ```

---

## Front-End Deployment (Vercel)

### Method 1: Using Vercel Dashboard (Recommended)

1. **Log in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Set Environment Variables**
   Add the following environment variable:
   ```
   VITE_API_URL=https://your-deployed-backend-url.onrender.com
   ```
   (Use the URL from your Render deployment)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `https://your-project.vercel.app`

### Method 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd portfolio-app
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add VITE_API_URL
   ```
   Enter your deployed back-end URL when prompted

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## Front-End Deployment (Netlify)

### Method 1: Using Netlify Dashboard

1. **Build the Project Locally**
   ```bash
   npm run build
   ```

2. **Log in to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up or log in

3. **Deploy**
   - Drag and drop the `dist/` folder to Netlify
   - Or click "Add new site" → "Import an existing project"

4. **Configure Build Settings** (if using Git)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

5. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add:
     ```
     VITE_API_URL=https://your-deployed-backend-url.onrender.com
     ```

6. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `https://your-site.netlify.app`

### Method 2: Using Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize**
   ```bash
   netlify init
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

---

## Post-Deployment Configuration

### 1. Update CORS Settings (Back-End)

Update your back-end CORS configuration to allow requests from your deployed front-end:

```javascript
// In your back-end server.js or app.js
const cors = require('cors');

app.use(cors({
  origin: 'https://your-frontend-url.vercel.app',
  credentials: true
}));
```

### 2. Test All Functionality

Visit your deployed front-end and test:
- [ ] Home page loads correctly
- [ ] Projects page fetches and displays projects
- [ ] Blog page fetches and displays posts
- [ ] Blog detail page works with dynamic routing
- [ ] Contact form submits successfully
- [ ] Login/Register functionality works
- [ ] Admin dashboard is accessible after login
- [ ] CRUD operations work in admin dashboard
- [ ] Comment posting works on blog posts

### 3. Custom Domain (Optional)

#### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

#### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records as instructed

---

## Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure back-end CORS is configured with your front-end URL
- Check that the front-end is using the correct API URL

**2. Environment Variables Not Working**
- Make sure to prefix with `VITE_` in Vite projects
- Redeploy after adding environment variables
- Check that variables are set in deployment platform

**3. 404 Errors on Refresh**
- Ensure `vercel.json` or `netlify.toml` is configured for SPA routing
- Verify build output directory is set correctly

**4. API Requests Failing**
- Check browser console for errors
- Verify API URL in environment variables
- Test API endpoints directly with curl or Postman

**5. Authentication Not Working**
- Clear browser localStorage
- Check JWT token format and expiration
- Verify back-end is returning correct response format

---

## Maintenance

### Updating the Application

**Using Git Integration (Recommended)**
- Push changes to GitHub
- Vercel/Netlify will automatically redeploy

**Manual Deployment**
```bash
# Build
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod
```

### Monitoring
- Set up monitoring in Vercel/Netlify dashboard
- Monitor API logs in Render dashboard
- Set up error tracking (e.g., Sentry) for production issues

---

## Submission Checklist

Before submitting your capstone project, ensure:

- [ ] Back-end API is deployed and accessible
- [ ] Front-end is deployed and accessible
- [ ] All environment variables are configured
- [ ] CORS is properly configured
- [ ] All pages load without errors
- [ ] Authentication flow works end-to-end
- [ ] CRUD operations work in admin dashboard
- [ ] README.md is updated with live URLs
- [ ] Both source code repositories are accessible
- [ ] Project demonstrates all required features

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review deployment platform documentation
3. Check browser console and network tab for errors
4. Verify environment variables are set correctly

---

**Good luck with your deployment!**
