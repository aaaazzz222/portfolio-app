import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const BlogDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState('');
  const [commentSuccess, setCommentSuccess] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(API_ENDPOINTS.BLOG_BY_ID(id));
      setPost(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load blog post. Please try again later.');
      console.error('Error fetching blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    setCommentError('');
    setCommentSuccess('');

    try {
      await api.post(API_ENDPOINTS.BLOG_COMMENTS(id), {
        content: comment,
        author: user?.name || 'Anonymous',
      });
      setCommentSuccess('Comment posted successfully!');
      setComment('');
      // Refresh the post to get the new comment
      fetchPost();
    } catch (err) {
      setCommentError(
        err.response?.data?.message || 'Failed to post comment. Please try again.'
      );
      console.error('Error posting comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <Loading message="Loading blog post..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!post) {
    return <ErrorMessage message="Blog post not found." />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <Link
          to="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          {post.image && (
            <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
          )}

          <div className="p-8">
            <div className="text-sm text-gray-500 mb-4">
              {post.createdAt && formatDate(post.createdAt)}
              {post.author && <span className="ml-4">By {post.author}</span>}
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose max-w-none text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>

          {/* Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              {commentError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                  {commentError}
                </div>
              )}
              {commentSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
                  {commentSuccess}
                </div>
              )}

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                rows="4"
                required
              />

              <button
                type="submit"
                disabled={submitting}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md mb-8">
              <Link to="/login" className="font-semibold hover:underline">
                Log in
              </Link>{' '}
              to post a comment.
            </div>
          )}

          {/* Comments List */}
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-4">
              {post.comments.map((comment, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                  <div className="font-semibold text-gray-800">
                    {comment.author || 'Anonymous'}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {comment.createdAt && formatDate(comment.createdAt)}
                  </div>
                  <div className="text-gray-700">{comment.content}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
