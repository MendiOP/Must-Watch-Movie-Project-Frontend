import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import RegisterPage from "./pages/RegisterPage";
import WatchlistPage from "./pages/WatchlistPage";

// Private Route component
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/watchlist"
            element={
              <PrivateRoute>
                <WatchlistPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} MovieDB. All movie data provided by
            TMDB.
          </p>
          <p className="mt-2 text-sm">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <Router>
          <AppContent />
        </Router>
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default App;
