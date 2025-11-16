import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Full-Stack Developer passionate about creating beautiful and functional web applications
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/projects"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-gray-700 text-lg mb-4">
                I'm a passionate full-stack developer with experience in building modern web
                applications using cutting-edge technologies. I specialize in creating responsive,
                user-friendly interfaces and robust back-end systems.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                My expertise includes React, Node.js, Express, MongoDB, and various other tools and
                frameworks. I'm constantly learning and staying up-to-date with the latest web
                development trends.
              </p>
              <p className="text-gray-700 text-lg">
                When I'm not coding, you can find me exploring new technologies, contributing to
                open-source projects, or writing about my development journey on my blog.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">⚛️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Front-End Development</h3>
              <p className="text-gray-600">React, JavaScript, HTML5, CSS3, Tailwind CSS</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-green-600 text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Back-End Development</h3>
              <p className="text-gray-600">Node.js, Express, REST APIs, Authentication</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-purple-600 text-4xl mb-4">💾</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Database & Tools</h3>
              <p className="text-gray-600">MongoDB, Git, GitHub, Deployment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl mb-8">
            I'm always open to discussing new projects and opportunities
          </p>
          <Link
            to="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition inline-block"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
