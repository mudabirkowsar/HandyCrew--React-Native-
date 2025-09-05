// src/components/SearchBar.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../config/colors';

export default function SearchBar() {
  const [focused, setFocused] = useState(false);
  const borderAnim = useState(new Animated.Value(0))[0];

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.primary],
  });

  return (
    <Animated.View style={[styles.container, { borderColor }]}>
      <Ionicons
        name="search"
        size={22}
        color={focused ? colors.primary : colors.gray}
        style={{ marginRight: 10 }}
      />
      <TextInput
        placeholder="Search for services..."
        placeholderTextColor={colors.gray}
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <TouchableOpacity activeOpacity={0.7}>
        <MaterialIcons
          name="keyboard-voice"
          size={22}
          color={focused ? colors.primary : colors.gray}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 12,
    left: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
});
