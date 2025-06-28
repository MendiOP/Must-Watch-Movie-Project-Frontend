import { Link } from "react-router-dom";
import { getPosterUrl } from "../services/tmdb";
import WatchlistButton from "./WatchlistButton";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative pb-[150%]">
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition-opacity"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentNode.innerHTML =
                '<div class="absolute inset-0 bg-gray-700 flex items-center justify-center text-gray-400"><span>Image Not Available</span></div>';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-semibold truncate">{movie.title}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-300 text-sm">
                {movie.release_date
                  ? movie.release_date.substring(0, 4)
                  : "N/A"}
              </span>
              <div className="flex items-center space-x-1 bg-gray-900/80 px-2 py-1 rounded-full">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-white text-sm">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
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
