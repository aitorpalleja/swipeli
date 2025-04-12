import { Movie } from '@/features/movies/types';

const API_KEY = 'c289edaf89ac2d948cbe244f91338ecd';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export async function getLatestMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    
    return data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      image: `${IMAGE_BASE_URL}${movie.backdrop_path}`,
      rating: movie.vote_average / 2, // Convert to 5-star rating
      year: new Date(movie.release_date).getFullYear(),
      duration: '120 min', // TMDB doesn't provide duration in this endpoint
      description: movie.overview,
      platforms: ['Netflix', 'Prime Video'], // Would need a separate service for this
      genres: ['Action', 'Adventure'], // Would need to fetch genres separately
      trailer: `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`,
      director: 'TBD', // Would need separate credits call
      cast: ['TBD'], // Would need separate credits call
    }));
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}