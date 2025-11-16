# Full-Stack Portfolio Website

A modern, responsive full-stack portfolio website built with React and integrated with a Node.js back-end API. This project showcases a complete personal portfolio with projects gallery, blog functionality, contact form, and a protected admin dashboard for content management.

## Live Demo

- **Front-End URL**: [To be deployed on Vercel/Netlify]
- **Back-End API URL**: [To be deployed on Render/Railway]

## Features

### Public Features
- **Home/About Page**: Professional landing page with personal information and skills showcase
- **Projects Gallery**: Display portfolio projects with images, descriptions, and technologies used
- **Blog**: Browse and read blog posts with tags and categories
- **Blog Detail**: Read full blog posts and post comments (authentication required)
- **Contact Form**: Send messages directly through the website

### Admin Features (Protected)
- **Authentication**: Secure login and registration system with JWT tokens
- **Admin Dashboard**: Protected admin panel accessible only to authenticated users
- **Projects Management**: Full CRUD operations for portfolio projects
- **Blog Management**: Full CRUD operations for blog posts
- **Real-time Updates**: All changes reflect immediately in the public pages

## Technology Stack

### Front-End
- **React 18**: Component-based UI library
- **React Router v6**: Client-side routing with protected routes
- **Context API**: Global state management for authentication
- **Axios**: HTTP client for API requests with interceptors
- **Tailwind CSS**: Modern utility-first CSS framework
- **Vite**: Fast build tool and development server

### Back-End Integration
- **REST API**: Integration with Node.js/Express back-end
- **JWT Authentication**: Token-based authentication with automatic token handling
- **Axios Interceptors**: Automatic token injection and error handling

## Project Structure

```
portfolio-app/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx       # Auth-aware navigation header
│   │   ├── Footer.jsx       # Site footer
│   │   ├── ProjectCard.jsx  # Project display card
│   │   ├── BlogPostCard.jsx # Blog post card
│   │   ├── Loading.jsx      # Loading spinner component
│   │   ├── ErrorMessage.jsx # Error display component
│   │   └── ProtectedRoute.jsx # Route protection HOC
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   ├── Projects.jsx     # Projects gallery
│   │   ├── Blog.jsx         # Blog list
│   │   ├── BlogDetail.jsx   # Single blog post with comments
│   │   ├── Contact.jsx      # Contact form
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   └── AdminDashboard.jsx # Admin panel
│   ├── contexts/            # React contexts
│   │   └── AuthContext.jsx  # Authentication context
│   ├── utils/               # Utility functions
│   │   └── api.js           # Axios instance and interceptors
│   ├── config/              # Configuration
│   │   └── api.js           # API endpoints configuration
│   ├── App.jsx              # Main app component with routing
│   └── index.css            # Tailwind CSS imports
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration
└── package.json             # Project dependencies
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A running back-end API (from the Web Data Management course)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your back-end API URL:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

   The production-ready files will be in the `dist/` folder.

## API Integration

### API Endpoints Used

#### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

#### Projects
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create new project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

#### Blog
- `GET /api/blog` - Fetch all blog posts
- `GET /api/blog/:id` - Fetch single blog post
- `POST /api/blog` - Create new blog post (protected)
- `PUT /api/blog/:id` - Update blog post (protected)
- `DELETE /api/blog/:id` - Delete blog post (protected)
- `POST /api/blog/:postId/comments` - Add comment to blog post

#### Contact
- `POST /api/contact` - Send contact form message

### Authentication Flow

1. User registers or logs in through the UI
2. Server returns JWT token and user data
3. Token is stored in localStorage
4. Axios interceptor automatically adds token to protected requests
5. If token is invalid (401), user is redirected to login

## Deployment

### Front-End Deployment (Vercel)

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

   Or connect your GitHub repository to Vercel for automatic deployments.

3. **Configure environment variables**

   In your Vercel project settings, add:
   ```
   VITE_API_URL=<your-deployed-backend-url>
   ```

### Front-End Deployment (Netlify)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist/` folder to Netlify
   - Or use Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod
     ```

3. **Configure environment variables**

   In Netlify dashboard > Site settings > Environment variables:
   ```
   VITE_API_URL=<your-deployed-backend-url>
   ```

## Key Features Implementation

### 1. Component-Based Architecture
All UI elements are broken down into reusable components with proper props passing.

### 2. React Router Implementation
- Public routes for all visitors
- Protected routes that redirect to login if not authenticated
- Dynamic routing for blog posts (`/blog/:id`)

### 3. Global State Management
- AuthContext provides authentication state throughout the app
- User data and token stored in localStorage
- Auth-aware UI components (Header shows different links based on auth state)

### 4. API Integration
- All pages fetch data using useEffect hooks
- Loading and error states handled gracefully
- Controlled forms for all user input
- JWT tokens automatically included in protected requests

### 5. Admin Dashboard
- Tabbed interface for managing Projects and Blog Posts
- Inline forms for Create and Update operations
- Confirmation dialogs for Delete operations
- Real-time feedback with success/error messages

### 6. Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive grid layouts
- Mobile-friendly navigation
- Touch-friendly UI elements

## Usage Guide

### For Visitors
1. Browse projects and blog posts without authentication
2. Send messages via the contact form
3. Register for an account to post comments on blog posts

### For Admins
1. Register an account or log in
2. Access the Admin Dashboard from the header
3. Switch between Projects and Blog tabs
4. Create, edit, or delete content
5. Changes appear immediately on the public pages

## Development Notes

### Adding New Features
1. Create new components in `src/components/`
2. Create new pages in `src/pages/`
3. Add routes in `src/App.jsx`
4. Update API endpoints in `src/config/api.js`

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the existing color scheme (blue for primary, purple for accent)
- Maintain consistent spacing and typography

### Security Considerations
- JWT tokens stored in localStorage
- Protected routes redirect unauthenticated users
- API requests include authentication headers
- Input validation on all forms

## Troubleshooting

### API Connection Issues
- Verify VITE_API_URL is set correctly in `.env`
- Ensure back-end server is running
- Check browser console for CORS errors

### Authentication Issues
- Clear localStorage if experiencing login problems
- Verify JWT token format from back-end
- Check token expiration settings

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## Contributing

This project was created as a capstone project for the Web Programming course. Feel free to fork and customize for your own portfolio!

## License

MIT License - Feel free to use this project for your own portfolio.

## Acknowledgments

- Built as part of the Web Programming - Building the Modern User Interface course
- Integrates with the Portfolio & Blog API from the Web Data Management and Application course

---

**Author**: [Your Name]
**Course**: Web Programming – Building the Modern User Interface
**Project**: Full-Stack Portfolio SPA Capstone
