import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Search, X, Check, Globe, ChevronDown } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { fetcher } from '../../../lib/api/client';
import { StreamingPlatform } from './PlatformSelector';

export interface Country {
  code: string;
  name: string;
  flag: string;
}

// Interfaz para las respuestas de TMDB Watch Providers
interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface WatchProvidersResponse {
  results: Provider[];
}

// Interfaz para la respuesta de regiones de TMDB
interface RegionsResponse {
  results: {
    iso_3166_1: string;
    english_name: string;
    native_name: string;
  }[];
}

interface CountrySelectorProps {
  selectedCountry: Country | null;
  onSelectCountry: (country: Country) => void;
  onFetchProviders?: (platforms: StreamingPlatform[], isLoading: boolean) => void;
}

export function CountrySelector({ 
  selectedCountry, 
  onSelectCountry,
  onFetchProviders
}: CountrySelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

  // Cargar países disponibles al montar el componente
  useEffect(() => {
    fetchAvailableRegions();
  }, []);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Obtener regiones disponibles desde la API de TMDB
  const fetchAvailableRegions = async () => {
    try {
      setLoadingCountries(true);
      
      const response = await fetcher<RegionsResponse>(
        `/watch/providers/regions`
      );
      
      if (response && response.results) {
        // Transformar las regiones en formato Country
        const transformedCountries: Country[] = response.results.map(region => ({
          code: region.iso_3166_1,
          name: region.english_name,
          flag: `https://flagcdn.com/w80/${region.iso_3166_1.toLowerCase()}.png`
        }));
        
        // Ordenar alfabéticamente por nombre
        transformedCountries.sort((a, b) => a.name.localeCompare(b.name));
        
        setCountries(transformedCountries);
        console.log(`Loaded ${transformedCountries.length} regions from TMDB`);
      }
    } catch (error) {
      console.error('Error fetching available regions:', error);
    } finally {
      setLoadingCountries(false);
    }
  };

  const handleSelectCountry = async (country: Country) => {
    onSelectCountry(country);
    closeModal();
    
    // Fetch streaming platforms for the selected country
    if (onFetchProviders) {
      await fetchWatchProvidersForCountry(country.code);
    }
  };

  // Fetch streaming platforms for a country from TMDB API
  const fetchWatchProvidersForCountry = async (countryCode: string) => {
    try {
      // Notify parent that loading started
      if (onFetchProviders) {
        onFetchProviders([], true);
      }
      
      // Call to TMDB API to get watch providers available for a specific region
      const response = await fetcher<any>(
        `/watch/providers/movie?watch_region=${countryCode}`
      );
      
      // Log para depuración
      console.log(`TMDB providers response for ${countryCode}:`, response);
      
      if (response && response.results && onFetchProviders) {
        // Convertir a nuestro formato de StreamingPlatform
        const platforms: StreamingPlatform[] = response.results
          .slice(0, 20) // Limitar a 20 proveedores 
          .map((provider: any) => ({
            id: provider.provider_id.toString(),
            name: provider.provider_name,
            image: `https://image.tmdb.org/t/p/original${provider.logo_path}`,
            color: getRandomColor()
          }));
        
        console.log(`Found ${platforms.length} platforms for ${countryCode}`);
        
        // Send the platforms to parent component with loading finished
        onFetchProviders(platforms, false);
      } else if (onFetchProviders) {
        console.log(`No providers found for ${countryCode}`);
        // If no results for this country, send empty array with loading finished
        onFetchProviders([], false);
      }
    } catch (error) {
      console.error('Error fetching watch providers:', error);
      // In case of error, pass empty array with loading finished
      if (onFetchProviders) {
        onFetchProviders([], false);
      }
    }
  };
  
  // Helper function to generate a random color for providers without specific branding
  const getRandomColor = (): string => {
    const colors = [
      '#E50914', // Netflix red
      '#00A8E1', // Prime blue
      '#0063E5', // Disney+ blue
      '#5822B4', // HBO purple
      '#1CE783', // Hulu green
      '#E21836', // Red
      '#FB8200', // Orange
      '#000000', // Black
      '#0064FF', // Blue
      '#E4002B', // Red
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.selector} onPress={openModal}>
        {selectedCountry ? (
          <View style={styles.selectedCountry}>
            <Image 
              source={{ uri: selectedCountry.flag }} 
              style={styles.selectedFlag}
            />
            <Text style={styles.selectedText}>{selectedCountry.name}</Text>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Globe size={18} color="#808080" />
            <Text style={styles.placeholderText}>Select your country</Text>
          </View>
        )}
        <ChevronDown size={20} color="#808080" />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <Pressable onPress={closeModal} style={styles.closeButton}>
                <X size={24} color="#FFFFFF" />
              </Pressable>
            </View>

            {loadingCountries ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#E50914" />
                <Text style={styles.loadingText}>Loading countries...</Text>
              </View>
            ) : (
              <ScrollView style={styles.countriesList}>
                {countries.map(country => (
                  <Pressable
                    key={country.code}
                    style={styles.countryItem}
                    onPress={() => handleSelectCountry(country)}
                  >
                    <Image source={{ uri: country.flag }} style={styles.flag} />
                    <Text style={styles.countryName}>{country.name}</Text>
                    {selectedCountry?.code === country.code && (
                      <Check size={20} color="#E50914" />
                    )}
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 14,
  },
  selectedCountry: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedFlag: {
    width: 24,
    height: 18,
    borderRadius: 2,
    marginRight: 12,
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  placeholder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#808080',
    fontSize: 16,
    marginLeft: 8,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  countriesList: {
    padding: 16,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  flag: {
    width: 30,
    height: 22,
    borderRadius: 2,
    marginRight: 16,
  },
  countryName: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  loadingContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 16,
    fontSize: 16,
  }
}); 