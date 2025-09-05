import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors'; // make sure this path is correct

export default function WelcomeMessage() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello <Text style={styles.name}>Mudabir!</Text>
      </Text>
      <Text style={styles.tagline}>
        Welcome to HandyCrew – choose your service and get started seamlessly.
      </Text>
      <View style={styles.locationContainer}>
        <Ionicons name="location-sharp" size={16} color={colors.gray} />
        <Text style={styles.location}>New Delhi, India</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
    marginLeft: 5,
  },
});
