import { useState, useEffect } from 'react';
import api from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import BlogPostCard from '../components/BlogPostCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(API_ENDPOINTS.BLOG);
      setPosts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load blog posts. Please try again later.');
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading blog posts..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development and technology
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blog posts to display yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post._id || post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
