// API Configuration
// Update this URL to your deployed back-end API URL when deploying
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/api/users/login',
  REGISTER: '/api/users/register',

  // Projects endpoints
  PROJECTS: '/api/projects',
  PROJECT_BY_ID: (id) => `/api/projects/${id}`,

  // Blog endpoints
  BLOG: '/api/blog',
  BLOG_BY_ID: (id) => `/api/blog/${id}`,
  BLOG_COMMENTS: (postId) => `/api/blog/${postId}/comments`,

  // Contact endpoint
  CONTACT: '/api/contact',
};
