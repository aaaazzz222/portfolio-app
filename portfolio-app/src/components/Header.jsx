import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition">
            Portfolio
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-200 transition">
              Home
            </Link>
            <Link to="/projects" className="hover:text-gray-200 transition">
              Projects
            </Link>
            <Link to="/blog" className="hover:text-gray-200 transition">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-gray-200 transition">
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition font-medium"
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-transparent border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-600 transition font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
