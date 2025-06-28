import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import {
  fetchMoviesWithPagination,
  searchMoviesWithPagination,
} from "../services/tmdb";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch movies when searchQuery or currentPage changes
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;
        if (searchQuery) {
          data = await searchMoviesWithPagination(searchQuery, currentPage);
        } else {
          data = await fetchMoviesWithPagination(currentPage);
        }

        setMovies(data.movies);
        setTotalPages(data.totalPages);
        setTotalResults(data.totalResults);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        console.error(err);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [searchQuery, currentPage]);

  const handleSearch = (query) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Movies</h1>
          <p className="text-gray-400 mb-6">
            Explore our collection of the most popular films
          </p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="w-full md:w-64">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="text-sm text-gray-400">
              {totalResults} {totalResults === 1 ? "movie" : "movies"} found
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FiLoader className="animate-spin text-4xl text-red-500" />
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">No movies found</h2>
            <p className="text-gray-400">Try adjusting your search query</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
