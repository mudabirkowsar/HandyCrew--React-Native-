// src/components/SearchBar.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../config/colors';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function SearchBar() {
  const [focused, setFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const borderAnim = useState(new Animated.Value(0))[0];

  const [coins, setCoins] = useState(null)

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

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setCoins(docSnap.data().coins)
          }
        }
      } catch (error) {
        console.log("Error", error.message)
      }
    }
    fetchCoins();
  }, [])

  return (
    <View style={styles.outerContainer}>
      {/* Top Row */}
      <View style={styles.topRow}>
        {/* Notification Icon - Left */}
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={28} color={colors.primary} />
        </TouchableOpacity>

        {/* Location in center */}
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={18} color="#fff" />
          <Text style={styles.locationText}>Kulgam</Text>
        </View>

        {/* Coin pill at right */}
        <TouchableOpacity
          style={styles.coinContainer}
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome5 name="coins" size={14} color="#FFD700" />
          <Text style={styles.coinText}>{coins}</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
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

      {/* Coins Info Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Coins Info</Text>
            <Text style={styles.modalText}>
              💰 You earn <Text style={{ fontWeight: 'bold' }}>50 coins</Text> for every hire.
            </Text>
            <Text style={styles.modalText}>
              🎯 You can use your coins to hire someone in the app.
            </Text>
            <Text style={styles.modalText}>
              🚀 Keep hiring to collect more rewards!
            </Text>

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Got it</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: colors.background || '#f2f2f2',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ebe52',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 30,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 5,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3D6',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  coinText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
    color: colors.textPrimary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.primary,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
