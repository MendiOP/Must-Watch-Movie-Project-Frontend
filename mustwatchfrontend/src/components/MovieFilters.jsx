import { useEffect, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import { fetchGenres } from "../services/tmdb";

const MovieFilters = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const filters = {};
    if (selectedGenres.length > 0) {
      filters.with_genres = selectedGenres.join(",");
    }
    if (year) filters.primary_release_year = year;
    if (rating) filters["vote_average.gte"] = rating;

    onFilterChange(filters);
  }, [selectedGenres, year, rating, onFilterChange]);

  const handleGenreToggle = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id)
        ? prev.filter((genreId) => genreId !== id)
        : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setYear("");
    setRating("");
  };

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="mb-8 bg-gray-800 rounded-xl p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Filter Movies</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-white"
        >
          <FiChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:block mt-4`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Genre Filter */}
          <div>
            <h4 className="font-medium mb-2">Genres</h4>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedGenres.includes(genre.id)
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <h4 className="font-medium mb-2">Release Year</h4>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <h4 className="font-medium mb-2">Minimum Rating</h4>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Any Rating</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num}>
                  {num}+
                </option>
              ))}
            </select>
          </div>
        </div>

        {(selectedGenres.length > 0 || year || rating) && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="flex items-center text-gray-400 hover:text-white"
            >
              <FiX className="mr-1" />
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieFilters;
