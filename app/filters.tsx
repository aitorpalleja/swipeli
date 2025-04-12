import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../src/context/ThemeContext';
import { Filter, Check, ArrowRight, ChevronLeft, Globe } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { PlatformSelector, StreamingPlatform } from '../src/features/filters/components/PlatformSelector';
import { GenreSelector } from '../src/features/filters/components/GenreSelector';
import { CountrySelector, Country } from '../src/features/filters/components/CountrySelector';
import { useMovieGenres } from '../src/features/movies/api/movies';
import { SafeAreaView } from 'react-native-safe-area-context';

// Demo data for streaming platforms
const US_STREAMING_PLATFORMS: StreamingPlatform[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop',
    color: '#E50914'
  },
  {
    id: 'prime',
    name: 'Prime Video',
    image: 'https://images.unsplash.com/photo-1613053341085-db794820ce43?q=80&w=1000&auto=format&fit=crop',
    color: '#00A8E1'
  },
  {
    id: 'disney',
    name: 'Disney+',
    image: 'https://images.unsplash.com/photo-1604877594191-6f699df1aae7?q=80&w=1000&auto=format&fit=crop',
    color: '#0063E5'
  },
  {
    id: 'hbo',
    name: 'HBO Max',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e0e2038?q=80&w=1000&auto=format&fit=crop',
    color: '#5822B4'
  },
  {
    id: 'hulu',
    name: 'Hulu',
    image: 'https://images.unsplash.com/photo-1567027757540-7b572280fa22?q=80&w=1000&auto=format&fit=crop',
    color: '#1CE783'
  },
  {
    id: 'peacock',
    name: 'Peacock',
    image: 'https://images.unsplash.com/photo-1585247226801-bc613c441316?q=80&w=1000&auto=format&fit=crop',
    color: '#001631'
  },
  {
    id: 'paramount',
    name: 'Paramount+',
    image: 'https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?q=80&w=1000&auto=format&fit=crop',
    color: '#0064FF'
  },
  {
    id: 'apple',
    name: 'Apple TV+',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop',
    color: '#000000'
  }
];

// European streaming platforms
const EU_STREAMING_PLATFORMS: StreamingPlatform[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop',
    color: '#E50914'
  },
  {
    id: 'prime',
    name: 'Prime Video',
    image: 'https://images.unsplash.com/photo-1613053341085-db794820ce43?q=80&w=1000&auto=format&fit=crop',
    color: '#00A8E1'
  },
  {
    id: 'disney',
    name: 'Disney+',
    image: 'https://images.unsplash.com/photo-1604877594191-6f699df1aae7?q=80&w=1000&auto=format&fit=crop',
    color: '#0063E5'
  },
  {
    id: 'skyshowtime',
    name: 'SkyShowtime',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e0e2038?q=80&w=1000&auto=format&fit=crop',
    color: '#00ACE8'
  },
  {
    id: 'movistar',
    name: 'Movistar+',
    image: 'https://images.unsplash.com/photo-1585247226801-bc613c441316?q=80&w=1000&auto=format&fit=crop',
    color: '#019DF4'
  },
  {
    id: 'canal',
    name: 'Canal+',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop',
    color: '#000000'
  },
  {
    id: 'now',
    name: 'NOW TV',
    image: 'https://images.unsplash.com/photo-1567027757540-7b572280fa22?q=80&w=1000&auto=format&fit=crop',
    color: '#02B9EF'
  }
];

// Latin America streaming platforms
const LATAM_STREAMING_PLATFORMS: StreamingPlatform[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop',
    color: '#E50914'
  },
  {
    id: 'prime',
    name: 'Prime Video',
    image: 'https://images.unsplash.com/photo-1613053341085-db794820ce43?q=80&w=1000&auto=format&fit=crop',
    color: '#00A8E1'
  },
  {
    id: 'disney',
    name: 'Disney+',
    image: 'https://images.unsplash.com/photo-1604877594191-6f699df1aae7?q=80&w=1000&auto=format&fit=crop',
    color: '#0063E5'
  },
  {
    id: 'clarovideo',
    name: 'Claro Video',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e0e2038?q=80&w=1000&auto=format&fit=crop',
    color: '#E21836'
  },
  {
    id: 'globoplay',
    name: 'Globoplay',
    image: 'https://images.unsplash.com/photo-1585247226801-bc613c441316?q=80&w=1000&auto=format&fit=crop',
    color: '#FB8200'
  },
  {
    id: 'telecine',
    name: 'Telecine Play',
    image: 'https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?q=80&w=1000&auto=format&fit=crop',
    color: '#E4002B'
  },
  {
    id: 'hbogo',
    name: 'HBO Go',
    image: 'https://images.unsplash.com/photo-1567027757540-7b572280fa22?q=80&w=1000&auto=format&fit=crop',
    color: '#5822B4'
  }
];

// Demo data for initial genres (used as fallback if API fails)
const FALLBACK_GENRES = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
  { id: 99, name: 'Documentary' },
  { id: 16, name: 'Animation' },
  { id: 14, name: 'Fantasy' }
];

export default function FiltersScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [availablePlatforms, setAvailablePlatforms] = useState<StreamingPlatform[]>([]);
  const [isLoadingPlatforms, setIsLoadingPlatforms] = useState(false);
  
  // Handle received platforms from TMDB API
  const handleFetchProviders = (platforms: StreamingPlatform[], isLoading: boolean) => {
    // Just set the platforms from the API response, without fallback
    setAvailablePlatforms(platforms);
    setIsLoadingPlatforms(isLoading);
  };
  
  // Reset selected platforms when country changes
  useEffect(() => {
    setSelectedPlatforms([]);
    
    // Reset available platforms when country changes
    if (!selectedCountry) {
      setAvailablePlatforms([]);
    }
  }, [selectedCountry]);
  
  // Fetch genres from API
  const { genres, isLoading: isLoadingGenres } = useMovieGenres();
  const availableGenres = genres.length > 0 ? genres : FALLBACK_GENRES;

  // Toggle platform selection
  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(current =>
      current.includes(platformId)
        ? current.filter(id => id !== platformId)
        : [...current, platformId]
    );
  };

  // Toggle genre selection
  const toggleGenre = (genreId: number) => {
    setSelectedGenres(current =>
      current.includes(genreId)
        ? current.filter(id => id !== genreId)
        : [...current, genreId]
    );
  };

  // Navigate to swipe screen with selected filters
  const handleContinue = () => {
    // Navigate to swipe with filter parameters
    router.push({
      pathname: '/swipe',
      params: {
        platforms: selectedPlatforms.join(','),
        genres: selectedGenres.join(','),
        country: selectedCountry?.code || 'US',
        latest: selectedPlatforms.length === 0 && selectedGenres.length === 0 ? 'true' : 'false'
      }
    });
  };
  
  // Go back to discover screen
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.backButtonContainer}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <ChevronLeft color="#FFFFFF" size={24} />
          </Pressable>
        </View>
        
        <View style={styles.header}>
          <Filter color={theme.colors.primary} size={32} />
          <Text style={styles.title}>Customize Your Experience</Text>
          <Text style={styles.subtitle}>Select your preferred streaming platforms and genres</Text>
        </View>

        <Animated.View entering={FadeInDown.delay(100).duration(600)}>
          <Text style={styles.sectionTitle}>
            <Globe size={20} color={theme.colors.primary} style={styles.sectionIcon} /> Your Region
          </Text>
          <CountrySelector
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
            onFetchProviders={(platforms, isLoading) => handleFetchProviders(platforms, isLoading)}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text style={styles.sectionTitle}>Streaming Platforms</Text>
          {availablePlatforms.length > 0 ? (
            <PlatformSelector
              platforms={availablePlatforms}
              selectedPlatforms={selectedPlatforms}
              onTogglePlatform={togglePlatform}
            />
          ) : selectedCountry ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>
                {isLoadingPlatforms 
                  ? "Loading streaming platforms..." 
                  : "No streaming platforms available for this region"}
              </Text>
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>
                Select a country to see available streaming platforms
              </Text>
            </View>
          )}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(600)}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <GenreSelector
            genres={availableGenres}
            selectedGenres={selectedGenres}
            onToggleGenre={(id) => toggleGenre(Number(id))}
          />
        </Animated.View>

        <Animated.View 
          style={styles.statsContainer}
          entering={FadeInDown.delay(400).duration(600)}
        >
          <Text style={styles.statsText}>
            {selectedPlatforms.length === 0 && selectedGenres.length === 0 
              ? 'No filters selected • Show latest movies' 
              : `${selectedPlatforms.length} platforms • ${selectedGenres.length} genres selected`}
            {selectedCountry && ` • ${selectedCountry.name}`}
          </Text>
          <Pressable 
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
            <ArrowRight color="#FFFFFF" size={20} />
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  backButtonContainer: {
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 8,
  },
  statsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  statsText: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 16,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E50914',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyStateContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  emptyStateText: {
    color: '#808080',
    fontSize: 16,
    textAlign: 'center',
  },
}); 