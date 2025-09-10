import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../config/colors";

export default function Congratulations({ onClose }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate when component mounts
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.8)"]}
      style={styles.overlay}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Icon name="close" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.message}>
          You’ve received <Text style={styles.coins}>50 Coins</Text> on first signup.
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  overlay: {
    // ...StyleSheet.absoluteFillObject, // Fullscreen overlay
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    position: "absolute",
    top: "5%",
    width: "80%",
    backgroundColor: colors.background,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
  },
  coins: {
    fontWeight: "700",
    color: colors.primary,
    fontSize: 18,
  },
});
