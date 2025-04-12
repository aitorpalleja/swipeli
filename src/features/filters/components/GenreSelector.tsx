import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Genre } from '../../../features/movies/types';

type GenreItem = Genre | string;

interface GenreSelectorProps {
  genres: GenreItem[];
  selectedGenres: (string | number)[];
  onToggleGenre: (genreId: string | number) => void;
}

export function GenreSelector({ 
  genres, 
  selectedGenres, 
  onToggleGenre 
}: GenreSelectorProps) {
  return (
    <View style={styles.genresGrid}>
      {genres.map((genre, index) => {
        // Handle both string and Genre types
        const genreId = typeof genre === 'string' ? genre : genre.id;
        const genreName = typeof genre === 'string' ? genre : genre.name;
        const isSelected = selectedGenres.includes(genreId);
        
        return (
          <Animated.View
            key={genreId.toString()}
            entering={FadeInRight.delay(index * 50).duration(400)}
          >
            <Pressable
              style={[
                styles.genreChip,
                isSelected && styles.genreChipSelected
              ]}
              onPress={() => onToggleGenre(genreId)}
            >
              <Text style={[
                styles.genreText,
                isSelected && styles.genreTextSelected
              ]}>
                {genreName}
              </Text>
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  genresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
    gap: 10,
  },
  genreChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#282828',
    marginRight: 8,
    marginBottom: 8,
  },
  genreChipSelected: {
    backgroundColor: '#E50914',
  },
  genreText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  genreTextSelected: {
    fontWeight: '600',
  },
}); 