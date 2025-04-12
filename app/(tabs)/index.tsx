import { StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Play } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function PlayScreen() {
  const theme = useTheme();
  const router = useRouter();

  const handleStartSwiping = () => {
    router.push('/filters');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Backdrop image */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop' }}
        style={styles.backgroundImage}
      />
      
      {/* Gradient overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(20,20,20,0.8)', '#141414']}
        style={styles.gradient}
      />
      
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Swipeli</Text>
          <Text style={styles.subtitle}>Start Swiping and Find Your Movie Match</Text>
        </View>
        
        <View style={styles.playButtonContainer}>
          <Pressable 
            style={styles.playButton}
            onPress={handleStartSwiping}
          >
            <Play color="#FFFFFF" size={32} />
          </Pressable>
          <Text style={styles.playText}>Press Play</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.15,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    marginTop: 8,
    textAlign: 'center',
  },
  playButtonContainer: {
    alignItems: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E50914',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  playText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});