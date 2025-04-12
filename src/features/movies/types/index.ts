export interface Movie {
  id: number;
  title: string;
  image: string;
  posterPath?: string;
  backdropPath?: string;
  rating: number;
  year: number;
  duration?: string;
  description: string;
  platforms?: string[];
  genres?: Genre[];
  trailer?: string;
  director?: string;
  cast?: Cast[];
  releaseDate?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character?: string;
  profilePath?: string;
}

export interface MovieCredits {
  cast: Cast[];
  crew: {
    id: number;
    name: string;
    job: string;
    department: string;
  }[];
}

export interface MovieVideos {
  id: number;
  results: {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
  }[];
}

export interface MovieCardProps {
  movie: Movie;
  onSwipe?: (direction: 'left' | 'right') => void;
}

export interface MovieFilters {
  platforms: string[];
  genres: number[];
  years?: {
    start: number;
    end: number;
  };
  rating?: number;
  latest?: boolean;
  region?: string;
}

export type MovieApiResponse = {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
};

export interface MovieResult {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface MatchModalProps {
  movie: Movie;
  visible: boolean;
  onClose: () => void;
  onGoHome: () => void;
  onContinue: () => void;
}