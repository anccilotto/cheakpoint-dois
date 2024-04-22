import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Overview() {
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countryData = await response.json();
      setCountries(countryData);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setIsLoading(false);
    }
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCountryPress(item)}>
      <View style={styles.countryItem}>
        <Text style={styles.countryName}>{item.name.common}</Text>
        <Text>{item.capital}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleCountryPress = (country) => {
    navigation.navigate('CountryDetails', { country });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Países</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={countries}
          renderItem={renderCountryItem}
          keyExtractor={(item) => item.cca3}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  countryItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#837575',
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
