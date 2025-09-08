// HomeScreenProvider.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import colors from "../../../config/colors";

export default function HomeScreenProvider({ navigation }) {
  // Provider data
  const provider = {
    id: 4001,
    name: "Ramesh Kumar",
    serviceType: "Plumber",
    experience: 5,
    rating: 4.7,
    pricePerHour: 25,
    phone: "+91-9876543210",
    email: "ramesh.plumber@example.com",
    location: {
      city: "New Delhi",
      state: "Delhi",
      zipcode: "110001",
      latitude: 28.6139,
      longitude: 77.209,
    },
    availability: {
      monday: "09:00-18:00",
      tuesday: "09:00-18:00",
      wednesday: "09:00-18:00",
      thursday: "09:00-18:00",
      friday: "09:00-18:00",
      saturday: "09:00-14:00",
      sunday: "Off",
    },
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXxls9u_fRkoQHQVhVid9MGdPPi7_V5uYzHA&s",
    servicesOffered: ["Leak Repair", "Pipe Replacement", "Drain Cleaning"],
    isVerified: true,
    reviews: [
      {
        user: "Ankit Sharma",
        rating: 5,
        comment: "Excellent service, quick response!",
      },
      {
        user: "Priya Singh",
        rating: 4,
        comment: "Good work, arrived on time.",
      },
    ],
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image source={{ uri: provider.profileImage }} style={styles.avatar} />
        <Text style={styles.name}>{provider.name}</Text>
        <Text style={styles.serviceType}>{provider.serviceType}</Text>
        {provider.isVerified && <Text style={styles.verified}>✔ Verified</Text>}
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{provider.experience} yrs</Text>
          <Text style={styles.statLabel}>Experience</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>₹{provider.pricePerHour}</Text>
          <Text style={styles.statLabel}>Per Hour</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{provider.rating} ⭐</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      {/* Contact Info */}
      <Text style={styles.sectionTitle}>Contact Info</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>📞 {provider.phone}</Text>
        <Text style={styles.infoText}>✉ {provider.email}</Text>
        <Text style={styles.infoText}>
          📍 {provider.location.city}, {provider.location.state} -{" "}
          {provider.location.zipcode}
        </Text>
      </View>

      {/* Availability */}
      <Text style={styles.sectionTitle}>Availability</Text>
      <View style={styles.infoBox}>
        {Object.entries(provider.availability).map(([day, time], idx) => (
          <Text key={idx} style={styles.infoText}>
            {day.charAt(0).toUpperCase() + day.slice(1)}: {time}
          </Text>
        ))}
      </View>

      {/* Services Offered */}
      <Text style={styles.sectionTitle}>Services Offered</Text>
      <View style={styles.infoBox}>
        {provider.servicesOffered.map((service, idx) => (
          <Text key={idx} style={styles.infoText}>
            • {service}
          </Text>
        ))}
      </View>

      {/* Reviews */}
      <Text style={styles.sectionTitle}>Customer Reviews</Text>
      {provider.reviews.map((review, idx) => (
        <View key={idx} style={styles.reviewCard}>
          <Text style={styles.reviewUser}>
            {review.user} - {review.rating}⭐
          </Text>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
      ))}

      {/* Actions */}
      <Text style={styles.sectionTitle}>Actions</Text>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => navigation.navigate("FormDetail")}
      >
        <Text style={styles.actionText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => navigation.navigate("Availability")}
      >
        <Text style={styles.actionText}>Set Availability</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "red" }]}>
        <Text style={styles.actionText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16, paddingTop:40, paddingBottom:100, },
  profileCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "700", color: colors.textPrimary },
  serviceType: { fontSize: 16, color: "gray", marginTop: 4 },
  verified: { fontSize: 14, color: "green", marginTop: 4 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  statValue: { fontSize: 18, fontWeight: "700", color: colors.primary },
  statLabel: { fontSize: 12, color: "gray", marginTop: 4 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 1,
  },
  infoText: { fontSize: 14, color: colors.textPrimary, marginBottom: 4 },
  reviewCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  reviewUser: { fontSize: 14, fontWeight: "600", color: colors.textPrimary },
  reviewComment: { fontSize: 13, color: "gray", marginTop: 4 },
  actionBtn: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  actionText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
