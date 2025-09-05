// src/components/YouMayLike.js
import React from 'react';
import { View, ScrollView, ImageBackground, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import services from '../../data/services.json';

const { width } = Dimensions.get('window');

// Pick 6 random services
const getRandomServices = (allServices, count = 6) => {
  const shuffled = [...allServices].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function YouMayLike() {
  const randomServices = getRandomServices(services, 6);
  const heights = [180, 220, 200, 240, 200, 180];

  const handleCardPress = (item) => {
    console.log('Pressed:', item.name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Services You May Like</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.grid}>
          {randomServices.map((item, index) => (
            <TouchableOpacity
              key={item.id.toString()}
              style={[styles.card, { height: heights[index] }]}
              onPress={() => handleCardPress(item)}
              activeOpacity={0.8}
            >
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.imageBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.overlay} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.category}>{item.category}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#222',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: (width - 45) / 2, // 2 cards per row
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
  },
  textContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: colors.primary || '#00bfa5',
    fontWeight: '600',
  },
});
