import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, Star, Trophy, TrendingUp, Flame } from 'lucide-react-native';
import { useUpcomingMovies, usePopularMovies, useTopRatedMovies } from '../../src/features/movies/api/movies';
import { SafeAreaView } from 'react-native-safe-area-context';

type TabType = 'popular' | 'upcoming' | 'toprated';

export default function DiscoverScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('popular');

  // Fetch popular movies
  const { 
    movies: popularMovies, 
    isLoading: isLoadingPopular, 
    error: popularError 
  } = usePopularMovies();

  // Fetch upcoming movies
  const { 
    movies: upcomingMovies, 
    isLoading: isLoadingUpcoming, 
    error: upcomingError 
  } = useUpcomingMovies();

  // Fetch top rated movies
  const {
    movies: topRatedMovies,
    isLoading: isLoadingTopRated,
    error: topRatedError
  } = useTopRatedMovies();

  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Filter upcoming movies to only show future releases
  const futureReleases = useMemo(() => {
    return upcomingMovies.filter(movie => {
      // Only include movies with release dates in the future
      return movie.releaseDate && movie.releaseDate > today;
    });
  }, [upcomingMovies, today]);

  const isLoading = isLoadingPopular || isLoadingUpcoming || isLoadingTopRated;
  const hasError = popularError || upcomingError || topRatedError;

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Loading movies...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasError) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorTitle, { color: theme.colors.primary }]}>
            Couldn't load movies
          </Text>
          <Text style={[styles.errorMessage, { color: theme.colors.text }]}>
            Please check your internet connection and try again.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Check if we have any future releases
  const hasFutureReleases = futureReleases.length > 0;

  // Determine which movies to display based on active tab
  let moviesContent;

  if (activeTab === 'popular') {
    moviesContent = popularMovies.map(movie => (
      <View key={movie.id} style={styles.movieCard}>
        <Image 
          source={{ uri: movie.posterPath 
            ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` 
            : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop' 
          }}
          style={styles.moviePoster}
        />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle} numberOfLines={1}>
            {movie.title}
          </Text>
          <View style={styles.movieMetadata}>
            <View style={styles.metadataItem}>
              <Flame size={12} color="#E67E22" />
              <Text style={styles.metadataText}>Popular</Text>
            </View>
            <View style={styles.metadataItem}>
              <Star size={12} color="#FFD700" />
              <Text style={styles.metadataText}>{movie.rating.toFixed(1)}</Text>
            </View>
          </View>
          <Text style={styles.movieDescription} numberOfLines={2}>
            {movie.description || 'No description available.'}
          </Text>
        </View>
      </View>
    ));
  } else if (activeTab === 'upcoming') {
    if (hasFutureReleases) {
      moviesContent = futureReleases.map(movie => (
        <View key={movie.id} style={styles.movieCard}>
          <Image 
            source={{ uri: movie.posterPath 
              ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` 
              : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop' 
            }}
            style={styles.moviePoster}
          />
          <View style={styles.movieDetails}>
            <Text style={styles.movieTitle} numberOfLines={1}>
              {movie.title}
            </Text>
            <View style={styles.movieMetadata}>
              {movie.releaseDate && (
                <View style={styles.metadataItem}>
                  <Calendar size={12} color="#808080" />
                  <Text style={styles.metadataText}>{movie.releaseDate}</Text>
                </View>
              )}
              <View style={styles.metadataItem}>
                <Star size={12} color="#FFD700" />
                <Text style={styles.metadataText}>{movie.rating.toFixed(1)}</Text>
              </View>
            </View>
            <Text style={styles.movieDescription} numberOfLines={2}>
              {movie.description || 'No description available.'}
            </Text>
          </View>
        </View>
      ));
    } else {
      moviesContent = (
        <View style={styles.emptyStateContainer}>
          <Calendar size={48} color="#808080" />
          <Text style={styles.emptyStateTitle}>No upcoming releases found</Text>
          <Text style={styles.emptyStateMessage}>
            Check back later for new movie releases
          </Text>
        </View>
      );
    }
  } else if (activeTab === 'toprated') {
    moviesContent = topRatedMovies.map(movie => (
      <View key={movie.id} style={styles.movieCard}>
        <Image 
          source={{ uri: movie.posterPath 
            ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` 
            : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop' 
          }}
          style={styles.moviePoster}
        />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle} numberOfLines={1}>
            {movie.title}
          </Text>
          <View style={styles.movieMetadata}>
            <View style={styles.metadataItem}>
              <Trophy size={12} color="#9B59B6" />
              <Text style={styles.metadataText}>Top Rated</Text>
            </View>
            <View style={styles.metadataItem}>
              <Star size={12} color="#FFD700" />
              <Text style={styles.metadataText}>{movie.rating.toFixed(1)}</Text>
            </View>
          </View>
          <Text style={styles.movieDescription} numberOfLines={2}>
            {movie.description || 'No description available.'}
          </Text>
        </View>
      </View>
    ));
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover Movies</Text>
          
          <View style={styles.tabsContainer}>
            <Pressable 
              style={[
                styles.tab, 
                activeTab === 'popular' && styles.activeTab
              ]}
              onPress={() => setActiveTab('popular')}
            >
              <Flame 
                size={18} 
                color={activeTab === 'popular' ? '#FFFFFF' : '#808080'} 
              />
              <Text style={[
                styles.tabText,
                activeTab === 'popular' && styles.activeTabText
              ]}>Popular</Text>
            </Pressable>

            <Pressable 
              style={[
                styles.tab, 
                activeTab === 'upcoming' && styles.activeTab
              ]}
              onPress={() => setActiveTab('upcoming')}
            >
              <Calendar 
                size={18} 
                color={activeTab === 'upcoming' ? '#FFFFFF' : '#808080'} 
              />
              <Text style={[
                styles.tabText,
                activeTab === 'upcoming' && styles.activeTabText
              ]}>Coming Soon</Text>
            </Pressable>
            
            <Pressable 
              style={[
                styles.tab, 
                activeTab === 'toprated' && styles.activeTab
              ]}
              onPress={() => setActiveTab('toprated')}
            >
              <Trophy 
                size={18} 
                color={activeTab === 'toprated' ? '#FFFFFF' : '#808080'} 
              />
              <Text style={[
                styles.tabText,
                activeTab === 'toprated' && styles.activeTabText
              ]}>Top Rated</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={styles.moviesContainer}
          showsVerticalScrollIndicator={false}
        >
          {moviesContent}
        </ScrollView>
      </View>
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
  header: {
    padding: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeTab: {
    backgroundColor: '#E50914',
  },
  tabText: {
    color: '#808080',
    marginLeft: 6,
    fontSize: 14,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
  },
  moviesContainer: {
    padding: 16,
  },
  movieCard: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  moviePoster: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },
  movieDetails: {
    flex: 1,
    padding: 12,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieMetadata: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metadataText: {
    color: '#808080',
    fontSize: 12,
    marginLeft: 4,
  },
  movieDescription: {
    color: '#A0A0A0',
    fontSize: 13,
    lineHeight: 18,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 40,
  },
  emptyStateTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
  },
  emptyStateMessage: {
    color: '#808080',
    fontSize: 16,
    textAlign: 'center',
  },
}); 