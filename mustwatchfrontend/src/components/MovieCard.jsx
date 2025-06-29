import { Link } from "react-router-dom";
import { getPosterUrl } from "../services/tmdb";
import WatchlistButton from "./WatchlistButton";

const MovieCard = ({ movie }) => {
  // Handle backend movies that use different property names
  const posterPath = movie.imgUrl || movie.poster_path;
  const title = movie.title;
  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : movie.releaseYear?.toString() || "N/A";
  const rating = movie.vote_average || movie.rating || "N/A";

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative pb-[150%]">
          <img
            src={getPosterUrl(posterPath)}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition-opacity"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentNode.innerHTML =
                '<div class="absolute inset-0 bg-gray-700 flex items-center justify-center text-gray-400"><span>Image Not Available</span></div>';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-semibold truncate">{title}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-300 text-sm">{releaseYear}</span>
              <div className="flex items-center space-x-1 bg-gray-900/80 px-2 py-1 rounded-full">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-white text-sm">
                  {typeof rating === "number" ? rating.toFixed(1) : rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-3">
        <WatchlistButton movie={movie} />
      </div>
    </div>
  );
};

export default MovieCard;
