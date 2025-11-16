import { useState, useEffect } from 'react';
import api from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import ProjectCard from '../components/ProjectCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(API_ENDPOINTS.PROJECTS);
      setProjects(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load projects. Please try again later.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading projects..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Projects</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique challenge and
            learning experience.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No projects to display yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id || project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
