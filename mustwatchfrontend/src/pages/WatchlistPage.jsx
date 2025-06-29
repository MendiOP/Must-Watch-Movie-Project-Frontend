import { useEffect } from "react";
import { FiBookmark, FiLoader, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../context/WatchlistContext";

const WatchlistPage = () => {
  const { watchlist, loading, removeFromWatchlist, refreshWatchlist } =
    useWatchlist();

  const clearWatchlist = () => {
    if (
      window.confirm("Are you sure you want to clear your entire watchlist?")
    ) {
      watchlist.forEach((movie) => removeFromWatchlist(movie.id));
    }
  };

  useEffect(() => {
    refreshWatchlist();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <FiLoader className="animate-spin text-4xl text-red-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Watchlist</h1>
            <p className="text-gray-400">
              {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"}{" "}
              saved
            </p>
          </div>

          {watchlist.length > 0 && (
            <button
              onClick={clearWatchlist}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FiTrash2 className="mr-2" />
              Clear All
            </button>
          )}
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/50 rounded-xl">
            <FiBookmark className="mx-auto text-5xl text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your watchlist is empty</h2>
            <p className="text-gray-400 mb-6">
              Start adding movies to your watchlist to save them for later
            </p>
            <Link
              to="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchlist.map((movie) => (
              <div key={movie.id} className="relative group">
                <MovieCard
                  movie={{
                    ...movie,
                    poster_path: movie.imgUrl,
                    release_date: movie.releaseYear.toString(),
                    vote_average: movie.rating,
                  }}
                />
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove from watchlist"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
