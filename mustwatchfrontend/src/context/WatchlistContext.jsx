/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { watchlistAPI } from "../services/api";
import { useAuth } from "./AuthContext";

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchWatchlist = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      const response = await watchlistAPI.getWatchlist();
      console.log("Fetched watchlist:", response);
      setWatchlist(response.data);
    } catch (err) {
      console.error("Failed to fetch watchlist:", err);
      setError("Failed to fetch watchlist");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchWatchlist();
    } else {
      setWatchlist([]);
      setError(null);
    }
  }, [user, fetchWatchlist]);

  const addToWatchlist = async (movie) => {
    if (!user) return false;

    setAddLoading(true);
    setError(null);
    try {
      const movieData = {
        title: movie.title,
        director: movie.director || "Unknown",
        imgUrl: movie.poster_path,
        releaseYear: movie.release_date
          ? parseInt(movie.release_date.substring(0, 4))
          : 0,
        rating: movie.vote_average || 0,
        genre: movie.genres?.map((g) => g.name).join(", ") || "Unknown",
      };

      const addedMovie = await watchlistAPI.addToWatchlist(movieData);
      // Update state locally by appending the new movie
      setWatchlist((prev) => [...prev, addedMovie.data || movieData]);
      return true;
    } catch (err) {
      console.error("Failed to add to watchlist:", err);
      setError("Failed to add to watchlist");
      return false;
    } finally {
      setAddLoading(false);
    }
  };

  const removeFromWatchlist = async (id) => {
    setRemoveLoading(true);
    setError(null);
    try {
      await watchlistAPI.removeFromWatchlist(id);
      setWatchlist((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      console.error("Failed to remove from watchlist:", err);
      setError("Failed to remove from watchlist");
    } finally {
      setRemoveLoading(false);
    }
  };

  const isInWatchlist = (id) => {
    return watchlist.some((movie) => movie.id === id);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        loading,
        addLoading,
        removeLoading,
        error,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        refreshWatchlist: fetchWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
