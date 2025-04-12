import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { LogIn, User, Lock, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const theme = useTheme();

  const handleGoogleLogin = () => {
    // Este es un mockup, no tiene funcionalidad real
    console.log('Google login pressed');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      {/* Backdrop image */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=2000&auto=format&fit=crop' }}
        style={styles.backgroundImage}
      />
      
      {/* Gradient overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(20,20,20,0.8)', '#141414']}
        style={styles.gradient}
      />
      
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <LogIn color={theme.colors.primary} size={40} />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your movie journey</Text>
        </View>
        
        <View style={styles.loginContainer}>
          <Pressable 
            style={styles.googleButton}
            onPress={handleGoogleLogin}
          >
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }} 
              style={styles.googleIcon} 
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Pressable>
          
          <Text style={styles.orText}>or</Text>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <User size={18} color="#808080" />
              <Text style={styles.inputPlaceholder}>Email</Text>
            </View>
            
            <View style={styles.inputWrapper}>
              <Lock size={18} color="#808080" />
              <Text style={styles.inputPlaceholder}>Password</Text>
            </View>
            
            <Pressable style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign In</Text>
              <ChevronRight color="#FFFFFF" size={20} />
            </Pressable>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account? <Text style={styles.footerLink}>Sign Up</Text>
            </Text>
            <Text style={styles.footerText}>
              <Text style={styles.footerLink}>Forgot Password?</Text>
            </Text>
          </View>
        </View>
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
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  loginContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    marginBottom: 40,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  orText: {
    textAlign: 'center',
    color: '#808080',
    marginVertical: 16,
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputPlaceholder: {
    color: '#808080',
    marginLeft: 12,
    fontSize: 16,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E50914',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginRight: 8,
  },
  footer: {
    marginTop: 24,
  },
  footerText: {
    textAlign: 'center',
    color: '#808080',
    fontSize: 14,
    marginBottom: 8,
  },
  footerLink: {
    color: '#E50914',
    fontWeight: '500',
  },
}); 