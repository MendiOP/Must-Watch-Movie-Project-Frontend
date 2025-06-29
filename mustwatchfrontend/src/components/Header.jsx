import { FiBookmark, FiHome, FiLogOut, FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center">
            <span className="font-bold text-white">MDB</span>
          </div>
          <span className="text-xl font-bold">MovieDB</span>
        </Link>

        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                to="/"
                className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                  location.pathname === "/" ? "text-red-500" : ""
                }`}
              >
                <FiHome className="text-lg" />
                <span>Home</span>
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    to="/watchlist"
                    className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                      location.pathname === "/watchlist" ? "text-red-500" : ""
                    }`}
                  >
                    <FiBookmark className="text-lg" />
                    <span>My Watchlist</span>
                  </Link>
                </li>

                <li className="relative group">
                  <button className="flex items-center space-x-1">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      <FiUser />
                    </div>
                    <span className="hidden md:inline">{user.name}</span>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-700"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
