import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../config/colors';

export default function SignupScreen({ navigation }) {
  const [focusedField, setFocusedField] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Sign Up as Provider Button */}
      <TouchableOpacity
        style={styles.providerBtn}
        onPress={() => navigation.navigate('ProviderSignupScreen')}
      >
        <Text style={styles.providerBtnText}>Sign Up as Provider</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Create Account ✨</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      {/* Name Input */}
      <View
        style={[
          styles.inputContainer,
          focusedField === 'name' && styles.inputFocused,
        ]}
      >
        <Icon
          name="person-outline"
          size={20}
          color={focusedField === 'name' ? colors.primary : colors.textSecondary}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={colors.textSecondary}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      {/* Email Input */}
      <View
        style={[
          styles.inputContainer,
          focusedField === 'email' && styles.inputFocused,
        ]}
      >
        <Icon
          name="mail-outline"
          size={20}
          color={focusedField === 'email' ? colors.primary : colors.textSecondary}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.textSecondary}
          keyboardType="email-address"
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      {/* Password Input */}
      <View
        style={[
          styles.inputContainer,
          focusedField === 'password' && styles.inputFocused,
        ]}
      >
        <Icon
          name="lock-closed-outline"
          size={20}
          color={focusedField === 'password' ? colors.primary : colors.textSecondary}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={!passwordVisible}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <View
        style={[
          styles.inputContainer,
          focusedField === 'confirmPassword' && styles.inputFocused,
        ]}
      >
        <Icon
          name="lock-closed-outline"
          size={20}
          color={focusedField === 'confirmPassword' ? colors.primary : colors.textSecondary}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={!confirmPasswordVisible}
          onFocus={() => setFocusedField('confirmPassword')}
          onBlur={() => setFocusedField(null)}
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          <Icon
            name={confirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Signup Button */}
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Or Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>

      {/* Social Signup Buttons with Images */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../../../assets/images/googleIcon.png')}
            style={styles.socialImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../../../assets/images/appleIcon.png')}
            style={styles.socialImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../../../assets/images/facebookIcon.png')}
            style={styles.socialImage}
          />
        </TouchableOpacity>
      </View>

      {/* Login Redirect Text */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  providerBtn: {
    position: 'absolute',
    top: 50,
    right: 25,
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    zIndex: 10,
  },
  providerBtnText: {
    color: colors.textWhite,
    fontSize: 12,
    // fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 18,
    backgroundColor: colors.cardBackground,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  inputFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: colors.textPrimary,
  },
  signupButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 5,
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  divider: {
    flex: 1,
    height: 1.5,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: 10,
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
