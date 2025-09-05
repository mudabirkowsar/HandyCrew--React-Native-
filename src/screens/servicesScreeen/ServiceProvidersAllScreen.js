import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import providers from '../../../data/serviceProviders.json';
import colors from '../../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ServiceProvidersAllScreen({ route, navigation }) {
    const { category } = route.params;

    // Filter providers by category
    const filteredProviders = providers.filter((p) => p.serviceType === category);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {/* Row with Image + Details */}
            <View style={styles.headerRow}>
                <View style={styles.avatarWrapper}>
                    <Image source={{ uri: item.profileImage }} style={styles.avatar} />
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.name}>
                        {item.name}{' '}
                        {item.isVerified && (
                            <Ionicons name="checkmark-circle" size={18} color="green" />
                        )}
                    </Text>
                    <Text style={styles.detail}>
                        {item.experience} yrs experience • ⭐ {item.rating}
                    </Text>
                    <Text style={styles.price}>₹{item.pricePerHour}/hr</Text>
                    <Text style={styles.location}>
                        {item.location.city}, {item.location.state}
                    </Text>
                </View>
            </View>

            {/* Services Offered */}
            <View style={styles.servicesRow}>
                {item.servicesOffered.slice(0, 3).map((service, index) => (
                    <View key={index} style={styles.serviceTag}>
                        <Text style={styles.serviceText}>{service}</Text>
                    </View>
                ))}
            </View>

            {/* Separator Line */}
            <View style={styles.separator} />

            {/* Action Buttons */}
            <View style={styles.actionsRow}>
                <TouchableOpacity
                    style={styles.detailBtn}
                    onPress={() => navigation.navigate('ProviderDetailScreen', { provider: item })}
                >
                    <Text style={styles.detailBtnText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.hireBtn}
                    onPress={() => navigation.navigate("AddressScreen")}
                >
                    <Text style={styles.hireBtnText}>Hire Me</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your <Text style={{ color: colors.primary }}>{category}</Text> Services</Text>

            <FlatList
                data={filteredProviders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={styles.empty}>No providers found for {category}</Text>
                }
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
        paddingTop: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: 16,
        textAlign:'center',
    },
    card: {
        backgroundColor: colors.cardBackground,
        padding: 16,
        borderRadius: 14,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 3,
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    avatarWrapper: {
        width: 90,
        height: 90,
        borderRadius: 45, // circular wrapper
        borderWidth: 3,
        borderColor: colors.primary, // border color
        overflow: 'hidden',           // make image fit inside border
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 45, // match wrapper for circular image
    },

    infoSection: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 19,
        fontWeight: '700',
        color: colors.primary,
        marginBottom: 4,
    },
    detail: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 2,
    },
    price: {
        fontSize: 15,
        color: colors.secondary,
        fontWeight: '600',
        marginBottom: 2,
    },
    location: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    servicesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6,
        marginBottom: 12,
    },
    serviceTag: {
        backgroundColor: colors.background,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: colors.secondary,
    },
    serviceText: {
        fontSize: 12,
        color: colors.secondary,
    },
    separator: {
        height: 1,
        backgroundColor: '#D1D1D1',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    detailBtn: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    detailBtnText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '600',
    },
    hireBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    hireBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    empty: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: 16,
        color: colors.gray,
    },
});

