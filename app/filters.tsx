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
  const toggleGenre = (genreId: string | number) => {
    // Ensure genreId is a number
    const numericId = typeof genreId === 'string' ? parseInt(genreId, 10) : genreId;
    
    setSelectedGenres(current =>
      current.includes(numericId)
        ? current.filter(id => id !== numericId)
        : [...current, numericId]
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
          <Filter color="#FFFFFF" size={24} />
          <Text style={styles.title}>Filters</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose your country</Text>
          <Text style={styles.sectionDescription}>
            We'll show you content available in your region
          </Text>
          
          <CountrySelector
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
            onFetchProviders={handleFetchProviders}
          />
        </View>
        
        {selectedCountry && (
          <Animated.View 
            style={styles.section}
            entering={FadeInDown.duration(500).delay(200)}
          >
            <Text style={styles.sectionTitle}>Streaming platforms</Text>
            <Text style={styles.sectionDescription}>
              Select where you have active subscriptions
            </Text>
            
            <PlatformSelector 
              platforms={availablePlatforms}
              selectedPlatforms={selectedPlatforms}
              onTogglePlatform={togglePlatform}
              isLoading={isLoadingPlatforms}
            />
          </Animated.View>
        )}
        
        {selectedCountry && (
          <Animated.View 
            style={styles.section}
            entering={FadeInDown.duration(500).delay(300)}
          >
            <Text style={styles.sectionTitle}>Genres</Text>
            <Text style={styles.sectionDescription}>
              Select genres you're interested in
            </Text>
            
            <GenreSelector 
              genres={availableGenres}
              selectedGenres={selectedGenres}
              onToggleGenre={toggleGenre}
              isLoading={isLoadingGenres}
            />
          </Animated.View>
        )}
        
        <View style={styles.buttonContainer}>
          <Pressable 
            style={[
              styles.continueButton,
              selectedCountry ? styles.continueButtonActive : {}
            ]}
            onPress={handleContinue}
            disabled={!selectedCountry}
          >
            <Text style={styles.continueButtonText}>
              Continue to Movie Swipe
            </Text>
            <ArrowRight color="#FFFFFF" size={20} />
          </Pressable>
        </View>
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
    paddingBottom: 40,
  },
  backButtonContainer: {
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    color: '#AAAAAA',
    fontSize: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#E50914',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
}); 