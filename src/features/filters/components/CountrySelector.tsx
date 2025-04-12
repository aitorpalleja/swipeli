import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, ScrollView, Modal } from 'react-native';
import { Search, X, Check, Globe, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';

export interface Country {
  code: string;
  name: string;
  flag: string;
}

// Lista de países principales con códigos de región para servicios de streaming
const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: 'https://flagcdn.com/w80/us.png' },
  { code: 'GB', name: 'United Kingdom', flag: 'https://flagcdn.com/w80/gb.png' },
  { code: 'CA', name: 'Canada', flag: 'https://flagcdn.com/w80/ca.png' },
  { code: 'ES', name: 'Spain', flag: 'https://flagcdn.com/w80/es.png' },
  { code: 'MX', name: 'Mexico', flag: 'https://flagcdn.com/w80/mx.png' },
  { code: 'FR', name: 'France', flag: 'https://flagcdn.com/w80/fr.png' },
  { code: 'DE', name: 'Germany', flag: 'https://flagcdn.com/w80/de.png' },
  { code: 'IT', name: 'Italy', flag: 'https://flagcdn.com/w80/it.png' },
  { code: 'BR', name: 'Brazil', flag: 'https://flagcdn.com/w80/br.png' },
  { code: 'AU', name: 'Australia', flag: 'https://flagcdn.com/w80/au.png' },
  { code: 'JP', name: 'Japan', flag: 'https://flagcdn.com/w80/jp.png' },
  { code: 'KR', name: 'South Korea', flag: 'https://flagcdn.com/w80/kr.png' },
  { code: 'IN', name: 'India', flag: 'https://flagcdn.com/w80/in.png' },
];

interface CountrySelectorProps {
  selectedCountry: Country | null;
  onSelectCountry: (country: Country) => void;
}

export function CountrySelector({ selectedCountry, onSelectCountry }: CountrySelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSelectCountry = (country: Country) => {
    onSelectCountry(country);
    closeModal();
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

            <ScrollView style={styles.countriesList}>
              {COUNTRIES.map(country => (
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
  countriesList: {
    maxHeight: 500,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  flag: {
    width: 30,
    height: 20,
    borderRadius: 2,
    marginRight: 16,
  },
  countryName: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
}); 