import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiFlag,
  FiLoader,
  FiMessageSquare,
  FiPlay,
  FiStar,
  FiX,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import WatchlistButton from "../components/WatchlistButton";
import { fetchMovieDetails, getPosterUrl } from "../services/tmdb";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  // useEffect(() => {
  //   if (movie) {
  //     document.title = `${movie.title} - Movie Details`;
  //   }
  // }, [movie]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <FiLoader className="animate-spin text-4xl text-red-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center">
          <p className="text-red-400">{error}</p>
          <Link
            to="/"
            className="mt-4 inline-block text-red-400 hover:text-red-300"
          >
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const trailer = movie.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  // Format currency values
  const formatCurrency = (value) => {
    if (!value) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>{movie.title} - Movie Details</title>
      </Helmet>

      {/* Backdrop */}
      <div className="relative h-96">
        {movie.backdrop_path ? (
          <img
            src={getPosterUrl(movie.backdrop_path, "original")}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-gray-800 w-full h-full flex items-center justify-center">
            <span className="text-gray-500 text-xl">No backdrop available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <Link
              to="/"
              className="inline-flex items-center text-gray-300 hover:text-white mb-4"
            >
              <FiArrowLeft className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center bg-gray-800/80 px-3 py-1 rounded-full">
                <FiCalendar className="mr-1 text-gray-400" />
                <span>{movie.release_date}</span>
              </div>
              <div className="flex items-center bg-gray-800/80 px-3 py-1 rounded-full">
                <FiClock className="mr-1 text-gray-400" />
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex items-center bg-gray-800/80 px-3 py-1 rounded-full">
                <FiStar className="mr-1 text-yellow-400" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center bg-gray-800/80 px-3 py-1 rounded-full">
                <FiDollarSign className="mr-1 text-green-400" />
                <span>{formatCurrency(movie.revenue)}</span>
              </div>
            </div>
            <WatchlistButton movie={movie} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster and Info */}
          <div className="md:w-1/3">
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <img
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentNode.innerHTML =
                    '<div class="h-full bg-gray-700 flex items-center justify-center text-gray-400"><span>Image Not Available</span></div>';
                }}
              />
            </div>

            {trailer && (
              <div className="mt-6">
                <button
                  onClick={() => setShowTrailer(true)}
                  className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                >
                  <FiPlay className="mr-2" />
                  Watch Trailer
                </button>
              </div>
            )}

            <div className="mt-6 bg-gray-800 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-red-600/30 text-red-400 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div className="mt-6 bg-gray-800 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span>{movie.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Original Language</span>
                  <span>{movie.original_language.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Budget</span>
                  <span>{formatCurrency(movie.budget)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue</span>
                  <span>{formatCurrency(movie.revenue)}</span>
                </div>
              </div>
            </div>

            {/* Production Countries */}
            {movie.production_countries?.length > 0 && (
              <div className="mt-6 bg-gray-800 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3">Production Countries</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.production_countries.map((country) => (
                    <span
                      key={country.iso_3166_1}
                      className="flex items-center bg-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      <FiFlag className="mr-1" />
                      {country.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Spoken Languages */}
            {movie.spoken_languages?.length > 0 && (
              <div className="mt-6 bg-gray-800 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3">Spoken Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.spoken_languages.map((lang) => (
                    <span
                      key={lang.iso_639_1}
                      className="flex items-center bg-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      <FiMessageSquare className="mr-1" />
                      {lang.english_name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:w-2/3">
            {/* Tagline */}
            {movie.tagline && (
              <p className="text-xl italic text-gray-400 mb-6">
                "{movie.tagline}"
              </p>
            )}

            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-300 mb-6">
              {movie.overview || "No overview available."}
            </p>

            {/* Collection */}
            {movie.belongs_to_collection && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Part of Collection</h2>
                <div className="flex items-center bg-gray-800 rounded-lg p-4">
                  {movie.belongs_to_collection.poster_path ? (
                    <img
                      src={getPosterUrl(
                        movie.belongs_to_collection.poster_path,
                        "w185"
                      )}
                      alt={movie.belongs_to_collection.name}
                      className="w-16 h-24 object-cover rounded-lg mr-4"
                    />
                  ) : (
                    <div className="bg-gray-700 w-16 h-24 rounded-lg mr-4 flex items-center justify-center">
                      <span className="text-xs">
                        {movie.belongs_to_collection.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg">
                      {movie.belongs_to_collection.name}
                    </h3>
                    <Link
                      to={`/collection/${movie.belongs_to_collection.id}`}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      View Collection
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3">Production Companies</h3>
                <ul className="space-y-2">
                  {movie.production_companies.map((company) => (
                    <li key={company.id} className="flex items-center">
                      {company.logo_path ? (
                        <img
                          src={getPosterUrl(company.logo_path, "w92")}
                          alt={company.name}
                          className="h-8 mr-2"
                        />
                      ) : (
                        <div className="bg-gray-700 w-8 h-8 rounded mr-2 flex items-center justify-center">
                          <span className="text-xs text-center">
                            {company.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span>{company.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3">Top Cast</h3>
                <div className="space-y-3">
                  {movie.credits.cast.slice(0, 5).map((person) => (
                    <div key={person.id} className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        {person.profile_path ? (
                          <img
                            src={getPosterUrl(person.profile_path, "w185")}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                            <span className="text-xs">
                              {person.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-gray-400">
                          {person.character}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl h-[80vh]">
            {" "}
            {/* Added height */}
            <div className="relative w-full h-full">
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute -top-10 right-0 text-white hover:text-red-500"
              >
                <FiX className="text-2xl" />
              </button>
              <div className="w-full h-full">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;
