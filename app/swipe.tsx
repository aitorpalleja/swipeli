import { useRouter, useLocalSearchParams } from 'expo-router';
import { SwipeScreen } from '../src/features/movies/screens/SwipeScreen';
import { MovieFilters } from '../src/features/movies/types';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SwipeRoute() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parse filter params
  const filters: Partial<MovieFilters> = {};
  
  // Check if we should show latest movies (no filters selected)
  const showLatest = params.latest === 'true';
  
  // Get country code for region-specific content
  if (params.country && typeof params.country === 'string') {
    filters.region = params.country;
  }
  
  // Only add other filters if not showing latest
  if (!showLatest) {
    // Parse platforms from URL params (comma-separated list)
    if (params.platforms && typeof params.platforms === 'string' && params.platforms !== '') {
      filters.platforms = params.platforms.split(',');
    }
    
    // Parse genres from URL params (comma-separated list of numbers)
    if (params.genres && typeof params.genres === 'string' && params.genres !== '') {
      filters.genres = params.genres.split(',').map(Number);
    }
    
    // Parse years range if available
    if (params.yearStart && params.yearEnd) {
      filters.years = {
        start: Number(params.yearStart),
        end: Number(params.yearEnd)
      };
    }
    
    // Parse minimum rating
    if (params.rating) {
      filters.rating = Number(params.rating);
    }
  } else {
    // Set flag to show latest movies
    filters.latest = true;
  }
  
  const handleGoHome = () => {
    router.replace('/(tabs)');
  };

  return <SafeAreaView style={{ flex: 1 }}>
    <SwipeScreen onGoHome={handleGoHome} initialFilters={filters} />
  </SafeAreaView>;
} 