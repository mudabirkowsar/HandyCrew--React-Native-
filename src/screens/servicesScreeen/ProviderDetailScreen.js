import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProviderDetailScreen({ navigation, route }) {
  const { provider } = route.params;
  const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <View style={styles.container}>
      {/* Profile Section with Gradient */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.profileSection}
      >
        <Image source={{ uri: provider.profileImage }} style={styles.avatar} />

        <Text style={styles.name}>
          {provider.name}{' '}
          {provider.isVerified && (
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
          )}
        </Text>
        <Text style={styles.detail}>{provider.serviceType}</Text>

        {/* Quick Info Badges */}
        <View style={styles.infoBadges}>
          <View style={styles.badge}>
            <Ionicons name="time" size={16} color={colors.primary} />
            <Text style={styles.badgeText}>{provider.experience} yrs</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="star" size={16} color={colors.secondary} />
            <Text style={styles.badgeText}>{provider.rating}</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="cash" size={16} color={colors.secondary} />
            <Text style={styles.badgeText}>₹{provider.pricePerHour}/hr</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Scrollable Details */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Info</Text>
          <View style={styles.infoRow}>
            <Ionicons name="call" size={16} color={colors.primary} />
            <Text style={styles.text}>{provider.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail" size={16} color={colors.primary} />
            <Text style={styles.text}>{provider.email}</Text>
          </View>
        </View>

        {/* Location with Map */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.text}>
            {provider.location.city}, {provider.location.state} - {provider.location.zipcode}
          </Text>
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${provider.location.latitude},${provider.location.longitude}&zoom=14&size=400x200&markers=color:red%7C${provider.location.latitude},${provider.location.longitude}&key=YOUR_API_KEY`,
            }}
            style={styles.mapPreview}
          />
        </View>

        {/* Services Offered */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services Offered</Text>
          <View style={styles.servicesRow}>
            {provider.servicesOffered.map((service, index) => (
              <View key={index} style={styles.serviceTag}>
                <MaterialCommunityIcons name="wrench" size={14} color={colors.secondary} />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews with collapse */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {(showAllReviews ? provider.reviews : provider.reviews.slice(0, 1)).map(
            (review, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <Text style={styles.reviewRating}>⭐ {review.rating}</Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            )
          )}
          {provider.reviews.length > 1 && (
            <TouchableOpacity onPress={() => setShowAllReviews(!showAllReviews)}>
              <Text style={styles.toggleReviews}>
                {showAllReviews ? 'See less' : 'See more reviews'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Hire Button */}
      <View style={styles.hireBtnContainer}>
        <TouchableOpacity
          style={styles.hireBtn}
          onPress={() => navigation.navigate('AddressScreen')}
        >
          <Text style={styles.hireBtnText}>Hire Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: { fontSize: 22, fontWeight: '700', color: '#fff', textAlign: 'center' },
  detail: { fontSize: 14, color: '#f0f0f0', marginBottom: 8 },
  infoBadges: { flexDirection: 'row', marginTop: 8 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  badgeText: { fontSize: 13, marginLeft: 4, color: colors.textPrimary },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 8 },
  text: { fontSize: 14, color: colors.textSecondary, marginBottom: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  servicesRow: { flexDirection: 'row', flexWrap: 'wrap' },
  serviceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  serviceText: { fontSize: 12, marginLeft: 4, color: colors.secondary },
  mapPreview: { width: '100%', height: 180, borderRadius: 12, marginTop: 10 },
  reviewCard: { backgroundColor: colors.cardBackground, padding: 12, borderRadius: 12, marginBottom: 10 },
  reviewUser: { fontWeight: '600', color: colors.textPrimary },
  reviewRating: { fontSize: 12, color: colors.secondary },
  reviewComment: { fontSize: 13, marginTop: 4, color: colors.textSecondary },
  toggleReviews: { color: colors.primary, fontWeight: '600', marginTop: 4 },
  hireBtnContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  hireBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  hireBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
