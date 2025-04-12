import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Star, Info, Youtube } from 'lucide-react-native';
import { Movie } from '../types';
import { RatingStars } from './RatingStars';

interface MovieDetailsProps {
  movie: Movie;
  showDetails: boolean;
  onToggleDetails: () => void;
}

export function MovieDetails({ movie, showDetails, onToggleDetails }: MovieDetailsProps) {
  const openTrailer = () => {
    window.open(movie.trailer, '_blank');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{movie.title}</Text>
        <RatingStars rating={movie.rating} />
      </View>

      <View style={styles.basicInfo}>
        <Text style={styles.year}>{movie.year}</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.duration}>{movie.duration}</Text>
      </View>

      <View style={styles.platforms}>
        {movie.platforms.map((platform, index) => (
          <View key={platform} style={styles.platformTag}>
            <Text style={styles.platformText}>{platform}</Text>
          </View>
        ))}
      </View>

      {showDetails && (
        <View style={styles.details}>
          <Text style={styles.description}>{movie.description}</Text>
          
          <View style={styles.genresContainer}>
            {movie.genres.map((genre) => (
              <View key={genre} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>

          <View style={styles.credits}>
            <Text style={styles.creditsLabel}>Director:</Text>
            <Text style={styles.creditsText}>{movie.director}</Text>
          </View>

          <View style={styles.credits}>
            <Text style={styles.creditsLabel}>Cast:</Text>
            <Text style={styles.creditsText}>{movie.cast.join(', ')}</Text>
          </View>

          <Pressable style={styles.trailerButton} onPress={openTrailer}>
            <Youtube color="#FFFFFF" size={20} />
            <Text style={styles.trailerText}>Watch Trailer</Text>
          </Pressable>
        </View>
      )}

      <Pressable style={styles.toggleButton} onPress={onToggleDetails}>
        <Info color="#FFFFFF" size={20} />
        <Text style={styles.toggleText}>
          {showDetails ? 'Show Less' : 'Show More'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 16,
  },
  basicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  year: {
    color: '#808080',
    fontSize: 14,
  },
  dot: {
    color: '#808080',
    marginHorizontal: 8,
  },
  duration: {
    color: '#808080',
    fontSize: 14,
  },
  platforms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  platformTag: {
    backgroundColor: '#E50914',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  platformText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  details: {
    marginTop: 16,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  genreTag: {
    backgroundColor: '#404040',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  genreText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  credits: {
    marginBottom: 8,
  },
  creditsLabel: {
    color: '#808080',
    fontSize: 12,
    marginBottom: 4,
  },
  creditsText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  trailerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#404040',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    marginTop: 16,
  },
  trailerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  toggleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});