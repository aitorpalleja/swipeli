import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { AlertCircle, Film, RefreshCw, Search } from 'lucide-react-native';

type IconName = 'AlertCircle' | 'Film' | 'RefreshCw' | 'Search';

interface EmptyStateProps {
  icon: IconName;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  icon, 
  title, 
  message, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  const theme = useTheme();
  
  // Render the appropriate icon based on the icon name
  function renderIcon() {
    switch(icon) {
      case 'AlertCircle':
        return <AlertCircle size={48} color={theme.colors.primary} strokeWidth={1.5} />;
      case 'Film':
        return <Film size={48} color={theme.colors.primary} strokeWidth={1.5} />;
      case 'RefreshCw':
        return <RefreshCw size={48} color={theme.colors.primary} strokeWidth={1.5} />;
      case 'Search':
        return <Search size={48} color={theme.colors.primary} strokeWidth={1.5} />;
      default:
        return <AlertCircle size={48} color={theme.colors.primary} strokeWidth={1.5} />;
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {renderIcon()}
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.message, { color: '#808080' }]}>{message}</Text>
        
        {actionLabel && onAction && (
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={onAction}
          >
            <Text style={styles.buttonText}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
}); 