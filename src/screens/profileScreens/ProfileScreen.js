import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import useAuth from '../../../hooks/useAuth';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const {username, userEmail} = useAuth()

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setModalVisible(false);
      navigation.replace('LoginScreen'); // replace so user can't go back
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://www.shutterstock.com/image-vector/man-character-face-avatar-glasses-600nw-542759665.jpg',
          }}
          style={styles.profileImage}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      </View>

      {/* Options Section */}
      <View style={styles.section}>
        <OptionRow icon="person-circle-outline" label="Edit Profile" />
        <OptionRow icon="lock-closed-outline" label="Change Password" />
        <OptionRow icon="information-circle-outline" label="About Application" />
        <OptionRow icon="mail-outline" label="Contact Developers" />
        <OptionRow icon="help-circle-outline" label="Help & Support" />
        <OptionRow
          icon="log-out-outline"
          label="Logout"
          isDestructive
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.logoutButton]}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

/** Row Component */
const OptionRow = ({ icon, label, isDestructive, onPress }) => (
  <TouchableOpacity style={styles.optionRow} activeOpacity={0.7} onPress={onPress}>
    <View style={styles.rowLeft}>
      <Ionicons
        name={icon}
        size={20}
        color={isDestructive ? '#f44336' : colors.primary}
      />
      <Text
        style={[
          styles.optionText,
          { color: isDestructive ? '#f44336' : colors.textPrimary },
        ]}
      >
        {label}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.cardBackground,
    marginBottom: 12,
    elevation: 3,
    borderRadius: 12,
    marginHorizontal: 12,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 14,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  email: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  section: {
    marginTop: 8,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginHorizontal: 12,
    elevation: 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border || '#ddd',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: colors.textPrimary,
  },
  modalMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  logoutButton: {
    backgroundColor: '#f44336',
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});
