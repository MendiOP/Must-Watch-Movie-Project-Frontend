import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import { WatchlistProvider } from "./context/WatchlistContext";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import WatchlistPage from "./pages/WatchlistPage";

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-900">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
            </Routes>
          </main>
          <footer className="bg-gray-900 border-t border-gray-800 py-6">
            <div className="container mx-auto px-4 text-center text-gray-500">
              <p>
                © {new Date().getFullYear()} Mendi Watches. All movie data
                provided by TMDB.
              </p>
              <p className="mt-2 text-sm">
                This product uses the TMDB API but is not endorsed or certified
                by TMDB.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </WatchlistProvider>
  );
}

export default App;
