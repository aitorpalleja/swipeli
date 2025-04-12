import { env } from '../../../config/env';
import { useApi } from '../../../lib/api/swr';
import { fetcher } from '../../../lib/api/client';
import {
  Movie,
  MovieApiResponse,
  MovieCredits,
  MovieFilters,
  MovieVideos,
} from '../types';

/**
 * Transforms a movie result to our app's Movie format
 */
function transformMovieResult(movieResult: any): Movie {
  return {
    id: movieResult.id,
    title: movieResult.title,
    image: movieResult.backdrop_path 
      ? `${env.TMDB_IMAGE_BASE_URL}${movieResult.backdrop_path}`
      : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop',
    posterPath: movieResult.poster_path,
    backdropPath: movieResult.backdrop_path,
    rating: movieResult.vote_average / 2, // Convert to 5-star rating
    year: movieResult.release_date 
      ? new Date(movieResult.release_date).getFullYear()
      : 0,
    description: movieResult.overview,
    releaseDate: movieResult.release_date,
    genres: movieResult.genres || [],
    // These fields require additional API calls
    platforms: [], 
    cast: [],
    director: '',
  };
}

/**
 * Fetch now playing movies
 */
export function useNowPlayingMovies(page = 1, region = 'US') {
  const { data, error, isLoading, mutate } = useApi<MovieApiResponse>(
    `/movie/now_playing?language=en-US&page=${page}&region=${region}`
  );

  // Transform API response to our Movie format
  const movies = data?.results.map(transformMovieResult) || [];

  return {
    movies,
    error,
    isLoading,
    totalPages: data?.total_pages || 0,
    refreshMovies: mutate,
  };
}

/**
 * Fetch popular movies
 */
export function usePopularMovies(page = 1, region = 'US') {
  const { data, error, isLoading, mutate } = useApi<MovieApiResponse>(
    `/movie/popular?language=en-US&page=${page}&region=${region}`
  );

  const movies = data?.results.map(transformMovieResult) || [];

  return {
    movies,
    error,
    isLoading,
    totalPages: data?.total_pages || 0,
    refreshMovies: mutate,
  };
}

/**
 * Fetch upcoming movies
 */
export function useUpcomingMovies(page = 1, region = 'US') {
  const { data, error, isLoading, mutate } = useApi<MovieApiResponse>(
    `/movie/upcoming?language=en-US&page=${page}&region=${region}`
  );

  const movies = data?.results.map(transformMovieResult) || [];

  return {
    movies,
    error,
    isLoading,
    totalPages: data?.total_pages || 0,
    refreshMovies: mutate,
  };
}

/**
 * Fetch a single movie by ID with details
 */
export function useMovieDetails(movieId: number | null) {
  const { data, error, isLoading } = useApi<any>(
    movieId ? `/movie/${movieId}?append_to_response=videos,credits` : null
  );

  let movie: Movie | null = null;
  
  if (data) {
    movie = transformMovieResult(data);
    
    // Add additional data from appended responses
    if (data.credits?.cast) {
      movie.cast = data.credits.cast.slice(0, 10).map((actor: any) => ({
        id: actor.id,
        name: actor.name,
        character: actor.character,
        profilePath: actor.profile_path,
      }));
    }
    
    if (data.credits?.crew) {
      const director = data.credits.crew.find((person: any) => person.job === 'Director');
      movie.director = director?.name || '';
    }
    
    if (data.videos?.results) {
      const trailer = data.videos.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      movie.trailer = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '';
    }
    
    if (data.genres) {
      movie.genres = data.genres;
    }
    
    // Add duration
    if (data.runtime) {
      const hours = Math.floor(data.runtime / 60);
      const minutes = data.runtime % 60;
      movie.duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }
  }
  
  return {
    movie,
    error,
    isLoading,
  };
}

/**
 * Search movies
 */
export function useSearchMovies(query: string, page = 1) {
  const { data, error, isLoading } = useApi<MovieApiResponse>(
    query ? `/search/movie?query=${encodeURIComponent(query)}&page=${page}` : null
  );

  const movies = data?.results.map(transformMovieResult) || [];

  return {
    movies,
    error,
    isLoading,
    totalPages: data?.total_pages || 0,
  };
}

/**
 * Fetch movie genres
 */
export function useMovieGenres() {
  const { data, error, isLoading } = useApi<{ genres: { id: number; name: string }[] }>(
    '/genre/movie/list'
  );

  return {
    genres: data?.genres || [],
    error,
    isLoading,
  };
}

/**
 * Fetch top rated movies
 */
export function useTopRatedMovies(page = 1, region = 'US') {
  const { data, error, isLoading, mutate } = useApi<MovieApiResponse>(
    `/movie/top_rated?language=en-US&page=${page}&region=${region}`
  );

  const movies = data?.results.map(transformMovieResult) || [];

  return {
    movies,
    error,
    isLoading,
    totalPages: data?.total_pages || 0,
    refreshMovies: mutate,
  };
} 