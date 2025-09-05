import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import colors from '../../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProviderDetailScreen({ route }) {
  const { provider } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: provider.profileImage }} style={styles.avatar} />
        <Text style={styles.name}>
          {provider.name}{' '}
          {provider.isVerified && <Ionicons name="checkmark-circle" size={20} color="green" />}
        </Text>
        <Text style={styles.detail}>
          {provider.serviceType} • {provider.experience} yrs experience
        </Text>
        <Text style={styles.detail}>⭐ {provider.rating}</Text>
        <Text style={styles.price}>₹{provider.pricePerHour}/hr</Text>
      </View>

      {/* Scrollable Details */}
      <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
        <View style={styles.detailsSection}>
          {/* Contact Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Info</Text>
            <Text style={styles.text}>📞 {provider.phone}</Text>
            <Text style={styles.text}>✉️ {provider.email}</Text>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <Text style={styles.text}>
              {provider.location.city}, {provider.location.state} - {provider.location.zipcode}
            </Text>
          </View>

          {/* Services Offered */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services Offered</Text>
            <View style={styles.servicesRow}>
              {provider.servicesOffered.map((service, index) => (
                <View key={index} style={styles.serviceTag}>
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Availability */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Availability</Text>
            {Object.entries(provider.availability).map(([day, time]) => (
              <Text key={day} style={styles.text}>
                {day.charAt(0).toUpperCase() + day.slice(1)}: {time}
              </Text>
            ))}
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {provider.reviews.map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <Text style={styles.reviewRating}>⭐ {review.rating}</Text>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Hire Me Button */}
      <View style={styles.hireBtnContainer}>
        <TouchableOpacity
          style={styles.hireBtn}
          onPress={() => alert(`You hired ${provider.name}`)}
        >
          <Text style={styles.hireBtnText}>Hire Me</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileSection: {
    width: '100%',
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD', // subtle separation line
    paddingTop:40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth:3,
    borderColor: colors.primary
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  detail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '600',
    marginVertical: 6,
    textAlign: 'center',
  },
  detailsSection: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  servicesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceTag: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  serviceText: {
    fontSize: 12,
    color: colors.secondary,
  },
  reviewCard: {
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  reviewUser: {
    fontWeight: '600',
    color: colors.primary,
  },
  reviewRating: {
    color: colors.secondary,
    fontSize: 12,
  },
  reviewComment: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  hireBtnContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  hireBtn: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hireBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
