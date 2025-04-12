import { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Movie } from '../types';
import { MovieDetails } from './MovieDetails';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useTheme } from '../../../context/ThemeContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = Math.min(SCREEN_WIDTH * 0.9, 400);
const CARD_HEIGHT = Math.min(SCREEN_HEIGHT * 0.7, 600);

interface MovieCardProps {
  movie: Movie;
  onSwipe?: (direction: 'left' | 'right') => void;
  showLabels?: boolean;
}

export function MovieCard({ movie, onSwipe, showLabels = false }: MovieCardProps) {
  const theme = useTheme();
  const [showDetails, setShowDetails] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const toggleDetails = () => {
    setShowDetails(prev => !prev);
  };

  // This function would be used if we implemented swipe gestures
  const handleSwipeChange = (direction: 'left' | 'right' | null) => {
    setSwipeDirection(direction);
    if (direction && onSwipe) {
      // Only call onSwipe when actually swiped (not just hovering)
      // onSwipe(direction);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image 
          source={{ uri: movie.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Overlay for better text readability */}
        <View style={styles.overlay} />
        
        {/* Details section with toggle */}
        <View style={[
          styles.detailsContainer, 
          { 
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            height: showDetails ? 'auto' : 80 
          }
        ]}>
          <TouchableOpacity
            style={styles.detailsToggle}
            onPress={toggleDetails}
          >
            {showDetails ? 
              <ChevronDown color="#FFFFFF" size={24} /> : 
              <ChevronUp color="#FFFFFF" size={24} />
            }
          </TouchableOpacity>
          
          <MovieDetails
            movie={movie}
            showDetails={showDetails}
            onToggleDetails={toggleDetails}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: CARD_WIDTH,
  },
  card: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#282828',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  detailsToggle: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
});