# Quick Start Guide

Get your portfolio up and running in minutes!

## Prerequisites

- Node.js (v14+)
- npm or yarn
- A back-end API running (from your Web Data Management course)

## Installation (5 minutes)

```bash
# 1. Navigate to project directory
cd portfolio-app

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Edit .env and set your API URL
# For local development:
VITE_API_URL=http://localhost:5000

# 5. Start development server
npm run dev
```

The app will open at `http://localhost:5173`

## First Steps

### 1. Test Without Back-End

If your back-end isn't ready yet:
- You'll see error messages on pages that fetch data
- You can still navigate and see the UI
- Login/Register won't work without the API

### 2. With Back-End Running

Make sure your back-end API is running on the URL specified in `.env`:

```bash
# In your back-end directory
npm start
```

Then test the front-end:

1. **Visit Home Page** - `http://localhost:5173`
   - Should load without errors

2. **Register Account** - `http://localhost:5173/register`
   - Create a test account
   - Check that you're redirected to admin dashboard

3. **Add Test Project** - In Admin Dashboard
   - Click "Manage Projects" tab
   - Click "Add New Project"
   - Fill in test data
   - Click "Create Project"

4. **View Projects** - `http://localhost:5173/projects`
   - Should see your test project

5. **Add Blog Post** - In Admin Dashboard
   - Switch to "Manage Blog Posts" tab
   - Click "Add New Post"
   - Fill in test data
   - Click "Create Post"

6. **View Blog** - `http://localhost:5173/blog`
   - Should see your blog post
   - Click "Read More" to view details

7. **Test Contact Form** - `http://localhost:5173/contact`
   - Fill in and submit
   - Check your back-end receives the message

## Common Commands

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Maintenance
npm install          # Install/update dependencies
rm -rf node_modules  # Clean reinstall
npm cache clean --force
```

## Project Structure

```
portfolio-app/
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── contexts/     # React contexts (AuthContext)
│   ├── utils/        # Utilities (api.js)
│   ├── config/       # Configuration
│   └── App.jsx       # Main app
├── public/           # Static files
└── dist/             # Build output (created on build)
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Required: Your back-end API URL
VITE_API_URL=http://localhost:5000

# For production deployment, use your deployed API URL:
# VITE_API_URL=https://your-api.onrender.com
```

**Important:**
- Vite requires the `VITE_` prefix
- Restart dev server after changing `.env`

## Default Pages

Once running, visit these pages:

- `http://localhost:5173/` - Home
- `http://localhost:5173/projects` - Projects
- `http://localhost:5173/blog` - Blog
- `http://localhost:5173/contact` - Contact
- `http://localhost:5173/login` - Login
- `http://localhost:5173/register` - Register
- `http://localhost:5173/admin` - Admin (requires login)

## Troubleshooting

### Can't connect to API

**Error:** "Failed to load projects/blog posts"

**Solution:**
1. Check `.env` has correct API URL
2. Ensure back-end is running
3. Check browser console for CORS errors
4. Verify back-end CORS allows your front-end URL

### Build fails

**Error:** Build errors or warnings

**Solution:**
```bash
# Clean install
rm -rf node_modules
rm package-lock.json
npm install

# Try build again
npm run build
```

### Port already in use

**Error:** "Port 5173 is already in use"

**Solution:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Authentication not working

**Error:** Can't login or register

**Solution:**
1. Check back-end API is running
2. Verify API endpoints in browser DevTools → Network tab
3. Check that back-end returns `{ token, user }` on login/register
4. Clear localStorage: DevTools → Application → Local Storage → Clear

## Next Steps

1. **Customize Content**
   - Edit `src/pages/Home.jsx` with your information
   - Update footer links in `src/components/Footer.jsx`
   - Change color scheme in Tailwind classes

2. **Add Your Data**
   - Login to admin dashboard
   - Add your real projects
   - Write your blog posts

3. **Deploy**
   - See `DEPLOYMENT_GUIDE.md` for detailed instructions
   - Deploy back-end first
   - Then deploy front-end with back-end URL

4. **Customize**
   - Add your own images
   - Modify color scheme
   - Add more features

## Resources

- **Full Documentation:** `README.md`
- **Deployment Guide:** `DEPLOYMENT_GUIDE.md`
- **Project Summary:** `PROJECT_SUMMARY.md`
- **Submission Checklist:** `SUBMISSION_CHECKLIST.md`

## Need Help?

Check the troubleshooting sections in:
- `README.md` - General issues
- `DEPLOYMENT_GUIDE.md` - Deployment issues

## Quick Reference

### API Endpoints Expected

Your back-end should have these endpoints:

```
POST   /api/users/register
POST   /api/users/login
GET    /api/projects
POST   /api/projects          (protected)
PUT    /api/projects/:id      (protected)
DELETE /api/projects/:id      (protected)
GET    /api/blog
GET    /api/blog/:id
POST   /api/blog              (protected)
PUT    /api/blog/:id          (protected)
DELETE /api/blog/:id          (protected)
POST   /api/blog/:id/comments
POST   /api/contact
```

### Expected Response Formats

**Login/Register:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

**Projects:**
```json
[
  {
    "_id": "project-id",
    "title": "Project Title",
    "description": "Description",
    "image": "image-url",
    "technologies": ["React", "Node.js"],
    "link": "project-url"
  }
]
```

**Blog Posts:**
```json
[
  {
    "_id": "post-id",
    "title": "Post Title",
    "content": "Post content",
    "excerpt": "Short excerpt",
    "image": "image-url",
    "tags": ["JavaScript", "Tutorial"],
    "author": "Author Name",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "comments": [
      {
        "author": "Commenter Name",
        "content": "Comment text",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
]
```

---

**Happy coding! 🚀**
