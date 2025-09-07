import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';

export default function ProfileScreen() {
  const navigation = useNavigation();

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
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>johndoe@example.com</Text>
        </View>
      </View>

      {/* Options Section */}
      <View style={styles.section}>
        <OptionRow
          icon="person-circle-outline"
          label="Edit Profile"
        // onPress={() => navigation.navigate('EditProfileScreen')}
        />
        <OptionRow
          icon="lock-closed-outline"
          label="Change Password"
        // onPress={() => navigation.navigate('ChangePasswordScreen')}
        />
        <OptionRow
          icon="information-circle-outline"
          label="About Application"
        // onPress={() => navigation.navigate('AboutScreen')}
        />
        <OptionRow
          icon="mail-outline"
          label="Contact Developers"
        // onPress={() => navigation.navigate('ContactScreen')}
        />
        <OptionRow
          icon="help-circle-outline"
          label="Help & Support"
        // onPress={() => navigation.navigate('HelpScreen')}
        />
        <OptionRow
          icon="log-out-outline"
          label="Logout"
          isDestructive
          onPress={() => {
            // logout logic here
            console.log('User logged out');
          }}
        />
      </View>
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
});
