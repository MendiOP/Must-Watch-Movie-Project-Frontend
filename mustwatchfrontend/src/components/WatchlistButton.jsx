import { FiBookmark } from "react-icons/fi";
import { useWatchlist } from "../context/WatchlistContext";

const WatchlistButton = ({ movie }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const toggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      });
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
        inWatchlist
          ? "bg-red-600 text-white"
          : "bg-gray-800 text-white hover:bg-gray-700"
      }`}
    >
      <FiBookmark className={`${inWatchlist ? "fill-current" : ""}`} />
      <span>{inWatchlist ? "In Watchlist" : "Add to Watchlist"}</span>
    </button>
  );
};

export default WatchlistButton;
