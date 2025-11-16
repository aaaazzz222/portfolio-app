import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">
          {post.createdAt && formatDate(post.createdAt)}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt || post.content?.substring(0, 150) + '...'}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
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

        <Link
          to={`/blog/${post._id || post.id}`}
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
