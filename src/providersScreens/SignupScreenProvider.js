import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';

export default function SignupScreenProvider({ navigation }) {
    const [focusedField, setFocusedField] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Error state
    const [errors, setErrors] = useState({});

    // Validation
    const validate = () => {
        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Full name is required';
        }
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = 'Enter a valid email address';
            }
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProviderSignup = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            // simulate signup api
            await new Promise((resolve) => setTimeout(resolve, 2000));
            navigation.navigate('FormDetail');
        } catch (error) {
            setErrors({ general: 'Something went wrong, please try again' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Create Account ✨</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>

            {/* Name Input */}
            <View
                style={[
                    styles.inputContainer,
                    focusedField === 'name' && styles.inputFocused,
                    errors.name && styles.inputError,
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
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            {/* Email Input */}
            <View
                style={[
                    styles.inputContainer,
                    focusedField === 'email' && styles.inputFocused,
                    errors.email && styles.inputError,
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
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Password Input */}
            <View
                style={[
                    styles.inputContainer,
                    focusedField === 'password' && styles.inputFocused,
                    errors.password && styles.inputError,
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
                    value={password}
                    onChangeText={setPassword}
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
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* Confirm Password Input */}
            <View
                style={[
                    styles.inputContainer,
                    focusedField === 'confirmPassword' && styles.inputFocused,
                    errors.confirmPassword && styles.inputError,
                ]}
            >
                <Icon
                    name="lock-closed-outline"
                    size={20}
                    color={
                        focusedField === 'confirmPassword'
                            ? colors.primary
                            : colors.textSecondary
                    }
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor={colors.textSecondary}
                    secureTextEntry={!confirmPasswordVisible}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
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
            {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            {/* Signup Button */}
            <TouchableOpacity
                style={styles.signupButton}
                onPress={handleProviderSignup}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                )}
            </TouchableOpacity>

            {/* Or Divider */}
            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.divider} />
            </View>

            {/* Social Signup Buttons */}
            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={require('../../assets/images/googleIcon.png')}
                        style={styles.socialImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={require('../../assets/images/appleIcon.png')}
                        style={styles.socialImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={require('../../assets/images/facebookIcon.png')}
                        style={styles.socialImage}
                    />
                </TouchableOpacity>
            </View>

            {/* Login Redirect */}
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
        marginBottom: 5,
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
    inputError: {
        borderColor: 'red',
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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 12,
        marginLeft: 5,
    },
    signupButton: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 10,
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
