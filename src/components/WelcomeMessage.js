import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';

export default function WelcomeMessage() {
  return (
    <View style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>
        Hello <Text style={styles.name}>Mudabir!</Text>
      </Text>

      {/* Accent line */}
      <View style={styles.accentLine} />

      {/* Tagline */}
      <Text style={styles.tagline}>
        Welcome to <Text style={styles.highlight}>HandyCrew</Text> – find the service you need and get started quickly.
      </Text>

      {/* Location */}
      <View style={styles.locationContainer}>
        <Ionicons name="location-sharp" size={18} color={colors.primary} />
        <Text style={styles.location}>New Delhi, India</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom:20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 38,
    marginBottom: 6,
  },
  name: {
    color: colors.primary,
    fontStyle:'italic'
  },
  accentLine: {
    width: 60, // length of the line
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  highlight: {
    color: colors.primary,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 6,
    fontWeight: '500',
  },
});
