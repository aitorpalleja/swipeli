import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, Dimensions, Modal, ScrollView } from 'react-native';
import { Check, X, Plus } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PLATFORM_CARD_WIDTH = Math.min(Math.max(SCREEN_WIDTH * 0.4, 160), 200);

export interface StreamingPlatform {
  id: string;
  name: string;
  image: string;
  color: string;
}

interface PlatformSelectorProps {
  platforms: StreamingPlatform[];
  selectedPlatforms: string[];
  onTogglePlatform: (platformId: string) => void;
}

export function PlatformSelector({ 
  platforms, 
  selectedPlatforms, 
  onTogglePlatform 
}: PlatformSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  
  const hasMorePlatforms = platforms.length > 4;
  const visiblePlatforms = hasMorePlatforms ? platforms.slice(0, 4) : platforms;
  
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const renderPlatformCard = (platform: StreamingPlatform, index: number) => (
    <Animated.View 
      key={platform.id}
      entering={FadeInRight.delay(index * 100).duration(400)}
      style={styles.platformCardContainer}
    >
      <Pressable
        style={[
          styles.platformCard,
          selectedPlatforms.includes(platform.id) && styles.platformCardSelected,
          { borderColor: platform.color }
        ]}
        onPress={() => onTogglePlatform(platform.id)}
      >
        <Image
          source={{ uri: platform.image }}
          style={styles.platformImage}
        />
        <View style={styles.platformOverlay} />
        <Text style={styles.platformName}>{platform.name}</Text>
        {selectedPlatforms.includes(platform.id) && (
          <View style={[styles.checkmark, { backgroundColor: platform.color }]}>
            <Check size={16} color="#FFFFFF" />
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
  
  return (
    <View>
      <View style={styles.platformsGrid}>
        {visiblePlatforms.map((platform, index) => renderPlatformCard(platform, index))}
        
        {hasMorePlatforms && (
          <Animated.View 
            entering={FadeInRight.delay(400).duration(400)}
            style={styles.platformCardContainer}
          >
            <Pressable
              style={[styles.platformCard, styles.showMoreCard]}
              onPress={openModal}
            >
              <View style={styles.showMoreContent}>
                <Plus size={24} color="#FFFFFF" />
                <Text style={styles.showMoreText}>Show More</Text>
                <Text style={styles.showMoreCount}>+{platforms.length - 4}</Text>
              </View>
            </Pressable>
          </Animated.View>
        )}
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>All Streaming Platforms</Text>
              <Pressable onPress={closeModal} style={styles.closeButton}>
                <X size={24} color="#FFFFFF" />
              </Pressable>
            </View>
            
            <ScrollView>
              <View style={styles.modalPlatformsGrid}>
                {platforms.map((platform, index) => (
                  <View key={platform.id} style={styles.platformCardContainer}>
                    <Pressable
                      style={[
                        styles.platformCard,
                        selectedPlatforms.includes(platform.id) && styles.platformCardSelected,
                        { borderColor: platform.color }
                      ]}
                      onPress={() => {
                        onTogglePlatform(platform.id);
                      }}
                    >
                      <Image
                        source={{ uri: platform.image }}
                        style={styles.platformImage}
                      />
                      <View style={styles.platformOverlay} />
                      <Text style={styles.platformName}>{platform.name}</Text>
                      {selectedPlatforms.includes(platform.id) && (
                        <View style={[styles.checkmark, { backgroundColor: platform.color }]}>
                          <Check size={16} color="#FFFFFF" />
                        </View>
                      )}
                    </Pressable>
                  </View>
                ))}
              </View>
            </ScrollView>
            
            <Pressable 
              style={styles.doneButton}
              onPress={closeModal}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  platformsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  platformCardContainer: {
    width: PLATFORM_CARD_WIDTH,
    marginBottom: 16,
  },
  platformCard: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  platformCardSelected: {
    borderWidth: 2,
  },
  platformImage: {
    width: '100%',
    height: '100%',
  },
  platformOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  platformName: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreCard: {
    backgroundColor: 'rgba(229, 9, 20, 0.2)',
    borderColor: '#E50914',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  showMoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  showMoreCount: {
    color: '#E50914',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#141414',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 36,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  modalPlatformsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  doneButton: {
    backgroundColor: '#E50914',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 