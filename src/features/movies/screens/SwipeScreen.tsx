import { useState, useCallback } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Dimensions } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { MovieCard } from '../components/MovieCard';
import { MatchModal } from '../components/MatchModal';
import { ActionButtons } from '../components/ActionButtons';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useMovies } from '../hooks/useMovies';
import { MovieFilters } from '../types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SwipeScreenProps {
  onGoHome: () => void;
  initialFilters?: Partial<MovieFilters>;
}

export function SwipeScreen({ onGoHome, initialFilters }: SwipeScreenProps) {
  const theme = useTheme();
  const [showMatch, setShowMatch] = useState(false);
  
  // Use our enhanced useMovies hook with filters
  const {
    currentMovie,
    movies,
    loading,
    error,
    nextMovie,
    refreshMovies,
    updateFilters
  } = useMovies(initialFilters);

  // Handle user actions (swipe/button press)
  const handleAction = useCallback((liked: boolean) => {
    if (liked) {
      setShowMatch(true);
    } else {
      nextMovie();
    }
  }, [nextMovie]);

  // Close match screen
  const handleCloseMatch = useCallback(() => {
    setShowMatch(false);
    nextMovie();
  }, [nextMovie]);

  // Continue swiping
  const handleContinueSwiping = useCallback(() => {
    setShowMatch(false);
    nextMovie();
  }, [nextMovie]);

  // Loading state
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>
          Loading movies...
        </Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <EmptyState
        icon="AlertCircle"
        title="Couldn't load movies"
        message={error}
        actionLabel="Try Again"
        onAction={refreshMovies}
      />
    );
  }

  // Empty state
  if (!currentMovie || movies.length === 0) {
    return (
      <EmptyState
        icon="Film"
        title="No movies available"
        message="We couldn't find movies matching your criteria. Try adjusting your filters."
        actionLabel="Adjust Filters"
        onAction={onGoHome}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.cardContainer}>
        <MovieCard movie={currentMovie} />
      </View>

      <View style={styles.actionsContainer}>
        <ActionButtons 
          onAccept={() => handleAction(true)} 
          onReject={() => handleAction(false)} 
        />
      </View>

      <MatchModal
        movie={currentMovie}
        visible={showMatch}
        onClose={handleCloseMatch}
        onGoHome={onGoHome}
        onContinue={handleContinueSwiping}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: SCREEN_HEIGHT * 0.05,
  },
  actionsContainer: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
});