// src/components/ServicesList.js
import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import services from '../../data/services.json';

const { width } = Dimensions.get('window');


export default function ServicesList() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Our Services</Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {services.map((item) => (
                    <View key={item.id.toString()} style={styles.card}>
                        {/* Image on the left */}
                        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

                        {/* Text section on the right */}
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.category}>{item.category}</Text>
                            <Text style={styles.price}>{item.priceRange}</Text>
                            <Text style={styles.details}>⭐ {item.rating} • {item.estimatedTime}</Text>

                            {/* Explore button */}
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Explore</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: colors.white || '#fff',
        width: width - 30,
        padding: 10,
        marginBottom: 15,
        borderRadius: 12,
        elevation: 4,
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 12,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    category: {
        fontSize: 14,
        color: colors.primary || '#009688',
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    details: {
        fontSize: 12,
        color: '#777',
        marginBottom: 10,
    },
    button: {
        backgroundColor: colors.primary || '#009688',
        paddingVertical: 12,      // increased vertical padding
        paddingHorizontal: 25,    // increased horizontal padding
        borderRadius: 10,         // slightly bigger radius
        alignSelf: 'flex-start',  // keeps it aligned to start
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,             // increased font size
    },
});
