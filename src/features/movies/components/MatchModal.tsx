import { StyleSheet, Modal, View, Text, Image, Pressable } from 'react-native';
import { Heart, Play, Chrome as Home, ArrowRight } from 'lucide-react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useRef, useEffect } from 'react';
import { MatchModalProps } from '../types';

export function MatchModal({ movie, visible, onClose, onGoHome, onContinue }: MatchModalProps) {
  const confettiRef = useRef<any>(null);

  useEffect(() => {
    if (visible && confettiRef.current) {
      // Reset and start confetti when modal becomes visible
      confettiRef.current.start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <ConfettiCannon
            count={100}
            origin={{ x: -10, y: 0 }}
            autoStart={false}
            ref={confettiRef}
            fadeOut={true}
            fallSpeed={3000}
            explosionSpeed={350}
            colors={['#E50914', '#FFD700', '#FF69B4', '#4B0082']}
          />
          
          <Heart color="#E50914" size={64} fill="#E50914" />
          <Text style={styles.title}>It's a Match!</Text>
          <Text style={styles.subtitle}>You've found your next movie to watch</Text>
          
          <Image source={{ uri: movie.image }} style={styles.movieImage} />
          <Text style={styles.movieTitle}>{movie.title}</Text>
          
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.watchButton]} onPress={onClose}>
              <Play color="#FFFFFF" size={24} />
              <Text style={styles.buttonText}>Watch Now</Text>
            </Pressable>
            
            <Pressable style={[styles.button, styles.continueButton]} onPress={onContinue}>
              <ArrowRight color="#FFFFFF" size={24} />
              <Text style={styles.buttonText}>Keep Swiping</Text>
            </Pressable>
            
            <Pressable style={[styles.button, styles.homeButton]} onPress={onGoHome}>
              <Home color="#FFFFFF" size={24} />
              <Text style={styles.buttonText}>Back to Home</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 24,
    textAlign: 'center',
  },
  movieImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  watchButton: {
    backgroundColor: '#E50914',
  },
  continueButton: {
    backgroundColor: '#2ECC71',
  },
  homeButton: {
    backgroundColor: '#404040',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});