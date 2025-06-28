import { FiBookmark, FiHome } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center">
            <span className="font-bold text-white">MW</span>
          </div>
          <span className="text-xl font-bold">Mendi Watches</span>
        </Link>

        <nav>
          <ul className="flex space-x-6">
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
