import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current; // opacity
    const scaleAnim = useRef(new Animated.Value(1.8)).current; // zoom

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    setTimeout(() => {
        navigation.replace("LoginScreen")
    }, 2000);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/images/splashScreen.png')}
                style={[
                    styles.logo,
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                ]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
});
