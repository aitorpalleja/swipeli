import Constants from 'expo-constants';

interface AppConfig {
  TMDB_API_KEY: string;
  TMDB_BASE_URL: string;
  TMDB_IMAGE_BASE_URL: string;
}

// Expo managed approach
const expoConfig = Constants.expoConfig?.extra as Partial<AppConfig>;

// Default values for development
const defaultConfig: AppConfig = {
  TMDB_API_KEY: 'c289edaf89ac2d948cbe244f91338ecd',
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/original',
};

// Combine with priority to expo config if available
export const env: AppConfig = {
  ...defaultConfig,
  ...expoConfig,
}; 