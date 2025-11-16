import { useState, useEffect } from 'react';
import api from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import Loading from '../components/Loading';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states for projects
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    link: '',
  });

  // Form states for blog posts
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    tags: '',
    author: '',
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'projects') {
        const response = await api.get(API_ENDPOINTS.PROJECTS);
        setProjects(response.data);
      } else {
        const response = await api.get(API_ENDPOINTS.BLOG);
        setBlogPosts(response.data);
      }
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Project CRUD operations
  const handleProjectChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const projectData = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map((t) => t.trim()),
    };

    try {
      if (editingProject) {
        await api.put(API_ENDPOINTS.PROJECT_BY_ID(editingProject._id || editingProject.id), projectData);
        setSuccess('Project updated successfully!');
      } else {
        await api.post(API_ENDPOINTS.PROJECTS, projectData);
        setSuccess('Project created successfully!');
      }
      resetProjectForm();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project. Please try again.');
      console.error('Error saving project:', err);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      image: project.image || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      link: project.link || '',
    });
    setShowProjectForm(true);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.delete(API_ENDPOINTS.PROJECT_BY_ID(id));
      setSuccess('Project deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete project. Please try again.');
      console.error('Error deleting project:', err);
    }
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      image: '',
      technologies: '',
      link: '',
    });
    setEditingProject(null);
    setShowProjectForm(false);
  };

  // Blog CRUD operations
  const handleBlogChange = (e) => {
    setBlogForm({
      ...blogForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const blogData = {
      ...blogForm,
      tags: blogForm.tags.split(',').map((t) => t.trim()),
    };

    try {
      if (editingBlog) {
        await api.put(API_ENDPOINTS.BLOG_BY_ID(editingBlog._id || editingBlog.id), blogData);
        setSuccess('Blog post updated successfully!');
      } else {
        await api.post(API_ENDPOINTS.BLOG, blogData);
        setSuccess('Blog post created successfully!');
      }
      resetBlogForm();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save blog post. Please try again.');
      console.error('Error saving blog post:', err);
    }
  };

  const handleEditBlog = (post) => {
    setEditingBlog(post);
    setBlogForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      image: post.image || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      author: post.author || '',
    });
    setShowBlogForm(true);
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await api.delete(API_ENDPOINTS.BLOG_BY_ID(id));
      setSuccess('Blog post deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete blog post. Please try again.');
      console.error('Error deleting blog post:', err);
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      content: '',
      excerpt: '',
      image: '',
      tags: '',
      author: '',
    });
    setEditingBlog(null);
    setShowBlogForm(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-md font-semibold transition ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Manage Projects
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 rounded-md font-semibold transition ${
              activeTab === 'blog'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Manage Blog Posts
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
                  <button
                    onClick={() => setShowProjectForm(!showProjectForm)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    {showProjectForm ? 'Cancel' : 'Add New Project'}
                  </button>
                </div>

                {/* Project Form */}
                {showProjectForm && (
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {editingProject ? 'Edit Project' : 'Add New Project'}
                    </h3>
                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={projectForm.title}
                          onChange={handleProjectChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={projectForm.description}
                          onChange={handleProjectChange}
                          required
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image URL
                        </label>
                        <input
                          type="text"
                          name="image"
                          value={projectForm.image}
                          onChange={handleProjectChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Technologies (comma-separated)
                        </label>
                        <input
                          type="text"
                          name="technologies"
                          value={projectForm.technologies}
                          onChange={handleProjectChange}
                          placeholder="React, Node.js, MongoDB"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Link
                        </label>
                        <input
                          type="text"
                          name="link"
                          value={projectForm.link}
                          onChange={handleProjectChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                          {editingProject ? 'Update Project' : 'Create Project'}
                        </button>
                        <button
                          type="button"
                          onClick={resetProjectForm}
                          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Projects List */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Technologies
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {projects.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                            No projects yet. Create your first project!
                          </td>
                        </tr>
                      ) : (
                        projects.map((project) => (
                          <tr key={project._id || project.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{project.title}</td>
                            <td className="px-6 py-4">
                              {project.description.substring(0, 50)}
                              {project.description.length > 50 ? '...' : ''}
                            </td>
                            <td className="px-6 py-4">
                              {Array.isArray(project.technologies)
                                ? project.technologies.join(', ')
                                : ''}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleEditProject(project)}
                                className="text-blue-600 hover:text-blue-800 mr-4"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteProject(project._id || project.id)
                                }
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Blog Tab */}
            {activeTab === 'blog' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Blog Posts</h2>
                  <button
                    onClick={() => setShowBlogForm(!showBlogForm)}
                    className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
                  >
                    {showBlogForm ? 'Cancel' : 'Add New Post'}
                  </button>
                </div>

                {/* Blog Form */}
                {showBlogForm && (
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
                    </h3>
                    <form onSubmit={handleBlogSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={blogForm.title}
                          onChange={handleBlogChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Content *
                        </label>
                        <textarea
                          name="content"
                          value={blogForm.content}
                          onChange={handleBlogChange}
                          required
                          rows="6"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Excerpt
                        </label>
                        <textarea
                          name="excerpt"
                          value={blogForm.excerpt}
                          onChange={handleBlogChange}
                          rows="2"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Short summary for the blog list"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image URL
                        </label>
                        <input
                          type="text"
                          name="image"
                          value={blogForm.image}
                          onChange={handleBlogChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          name="tags"
                          value={blogForm.tags}
                          onChange={handleBlogChange}
                          placeholder="JavaScript, Tutorial, Web Development"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Author
                        </label>
                        <input
                          type="text"
                          name="author"
                          value={blogForm.author}
                          onChange={handleBlogChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
                        >
                          {editingBlog ? 'Update Post' : 'Create Post'}
                        </button>
                        <button
                          type="button"
                          onClick={resetBlogForm}
                          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Blog Posts List */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Excerpt
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Tags
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogPosts.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                            No blog posts yet. Create your first post!
                          </td>
                        </tr>
                      ) : (
                        blogPosts.map((post) => (
                          <tr key={post._id || post.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                            <td className="px-6 py-4">
                              {(post.excerpt || post.content).substring(0, 50)}
                              {(post.excerpt || post.content).length > 50 ? '...' : ''}
                            </td>
                            <td className="px-6 py-4">
                              {Array.isArray(post.tags) ? post.tags.join(', ') : ''}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleEditBlog(post)}
                                className="text-purple-600 hover:text-purple-800 mr-4"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(post._id || post.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
