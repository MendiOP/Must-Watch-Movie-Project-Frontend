import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: {
    api_key: API_KEY,
    language: 'en-US'
  }
});

export const fetchTrendingMovies = async () => {
  const response = await tmdb.get('/trending/movie/day');
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await tmdb.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits,videos'
    }
  });
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await tmdb.get('/search/movie', {
    params: {
      query
    }
  });
  return response.data.results;
};

export const getPosterUrl = (path, size = 'w500') => {
  return path 
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';
};

// Add these new functions
export const fetchMoviesWithPagination = async (page = 1) => {
  const response = await tmdb.get('/discover/movie', {
    params: { page, sort_by: 'popularity.desc' }
  });
  return {
    movies: response.data.results,
    totalPages: response.data.total_pages,
    totalResults: response.data.total_results
  };
};

export const fetchGenres = async () => {
  const response = await tmdb.get('/genre/movie/list');
  return response.data.genres;
};

export const searchMoviesWithPagination = async (query, page = 1) => {
  const response = await tmdb.get('/search/movie', {
    params: { query, page }
  });
  return {
    movies: response.data.results,
    totalPages: response.data.total_pages,
    totalResults: response.data.total_results
  };
};

export const discoverMovies = async (filters = {}, page = 1) => {
  const params = {
    page,
    ...filters
  };
  const response = await tmdb.get('/discover/movie', { params });
  return {
    movies: response.data.results,
    totalPages: response.data.total_pages,
    totalResults: response.data.total_results
  };
};

export default tmdb;