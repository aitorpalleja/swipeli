import { useState, useCallback } from 'react';
import { useNowPlayingMovies, usePopularMovies, useUpcomingMovies, useTopRatedMovies, useMovieGenres } from '../api/movies';
import { Movie, MovieFilters } from '../types';

export function useMovies(initialFilters?: Partial<MovieFilters>) {
  const [filters, setFilters] = useState<Partial<MovieFilters>>(initialFilters || {});
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  
  // Get region parameter for API requests
  const region = filters.region || 'US';
  
  // Fetch movies using our API hooks
  const { 
    movies: nowPlayingMovies, 
    isLoading: isLoadingNowPlaying,
    error: nowPlayingError,
    refreshMovies: refreshNowPlaying
  } = useNowPlayingMovies(1, region);
  
  const { 
    movies: popularMovies, 
    isLoading: isLoadingPopular,
    error: popularError,
    refreshMovies: refreshPopular
  } = usePopularMovies(1, region);

  const {
    movies: upcomingMovies,
    isLoading: isLoadingUpcoming,
    error: upcomingError,
    refreshMovies: refreshUpcoming
  } = useUpcomingMovies(1, region);
  
  // Fetch genres
  const { genres, isLoading: isLoadingGenres } = useMovieGenres();
  
  // Check if we should show latest movies (no filters)
  const showLatest = filters.latest === true;
  
  // Combine different movie lists based on filters
  let allMovies: Movie[] = [];
  
  if (showLatest) {
    // If latest filter is active, just use upcoming movies
    allMovies = upcomingMovies;
  } else {
    // Otherwise use a mix of now playing and popular
    allMovies = [...nowPlayingMovies, ...popularMovies];
  }
  
  // Remove duplicates by movie ID
  const uniqueMovies = Array.from(
    new Map(allMovies.map(movie => [movie.id, movie])).values()
  );
  
  // Only apply content filters if not in "latest" mode
  const filteredMovies = showLatest ? uniqueMovies : applyFilters(uniqueMovies, filters);
  
  const loading = isLoadingNowPlaying || isLoadingPopular || isLoadingUpcoming || isLoadingGenres;
  const error = nowPlayingError || popularError || upcomingError;
  
  const refreshMovies = useCallback(() => {
    refreshNowPlaying();
    refreshPopular();
    refreshUpcoming();
    setCurrentMovieIndex(0);
  }, [refreshNowPlaying, refreshPopular, refreshUpcoming]);
  
  const updateFilters = useCallback((newFilters: Partial<MovieFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentMovieIndex(0);
  }, []);
  
  const nextMovie = useCallback(() => {
    if (currentMovieIndex >= filteredMovies.length - 1) {
      // If we've reached the end, refresh or loop back
      setCurrentMovieIndex(0);
    } else {
      setCurrentMovieIndex(currentMovieIndex + 1);
    }
  }, [currentMovieIndex, filteredMovies.length]);
  
  return {
    movies: filteredMovies,
    currentMovie: filteredMovies[currentMovieIndex] || null,
    loading,
    error: error ? 'Failed to load movies' : null,
    filters,
    genres,
    refreshMovies,
    updateFilters,
    nextMovie,
    currentMovieIndex,
  };
}

/**
 * Apply filters to movies list
 */
function applyFilters(movies: Movie[], filters: Partial<MovieFilters> = {}): Movie[] {
  if (!filters || Object.keys(filters).length === 0) {
    return movies;
  }
  
  return movies.filter(movie => {
    // Filter by genres if specified
    if (filters.genres?.length) {
      const movieGenreIds = movie.genres?.map(g => g.id) || [];
      if (!filters.genres.some(genreId => movieGenreIds.includes(genreId))) {
        return false;
      }
    }
    
    // Filter by minimum rating
    if (typeof filters.rating === 'number' && movie.rating < filters.rating) {
      return false;
    }
    
    // Filter by years range
    if (filters.years && movie.year) {
      if (movie.year < filters.years.start || movie.year > filters.years.end) {
        return false;
      }
    }
    
    // For platforms, we would need to implement a service to get that data
    // This is just a placeholder
    if (filters.platforms?.length) {
      // In a real app, we would check if movie is available on selected platforms
      // For now, we'll just return true
    }
    
    return true;
  });
}