import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative transition-all duration-300 ${
        isActive ? "w-full" : "w-64"
      }`}
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          placeholder="Search movies..."
          className="w-full py-2 pl-10 pr-10 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <FiX />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
