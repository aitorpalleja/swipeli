import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

interface SwipeLabelsProps {
  likeStyle: any;
  nopeStyle: any;
}

export function SwipeLabels({ likeStyle, nopeStyle }: SwipeLabelsProps) {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.Text style={[styles.label, styles.likeLabel, likeStyle]}>
        LIKE
      </Animated.Text>
      <Animated.Text style={[styles.label, styles.nopeLabel, nopeStyle]}>
        NOPE
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 32,
    fontWeight: 'bold',
    position: 'absolute',
    padding: 10,
    borderWidth: 4,
    borderRadius: 10,
  },
  likeLabel: {
    top: 40,
    right: 40,
    color: '#00e600',
    borderColor: '#00e600',
    transform: [{ rotate: '20deg' }],
  },
  nopeLabel: {
    top: 40,
    left: 40,
    color: '#ff0000',
    borderColor: '#ff0000',
    transform: [{ rotate: '-20deg' }],
  },
});