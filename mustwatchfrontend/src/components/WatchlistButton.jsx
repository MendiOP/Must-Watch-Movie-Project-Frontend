import { FiBookmark } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWatchlist } from "../context/WatchlistContext";

const WatchlistButton = ({ movie }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const toggleWatchlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (inWatchlist) {
      await removeFromWatchlist(movie.id);
    } else {
      const success = await addToWatchlist(movie);
      if (!success) {
        alert("Failed to add to watchlist. Please try again.");
      }
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
