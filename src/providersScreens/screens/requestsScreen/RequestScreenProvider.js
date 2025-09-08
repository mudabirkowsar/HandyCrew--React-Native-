import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import colors from '../../../config/colors';

export default function RequestScreenProvider() {
    // Example requests data
    const [requests, setRequests] = useState([
        {
            id: '1',
            user: 'Ankit Sharma',
            service: 'Leak Repair',
            date: '2025-09-08',
            status: 'Pending',
            userImage: 'https://static.vecteezy.com/system/resources/thumbnails/025/776/255/small/3d-illustration-of-businessman-with-laptop-businessman-working-in-office-cartoon-character-3d-rendering-3d-illustration-ai-generation-photo.jpg',
        },
        {
            id: '2',
            user: 'Priya Singh',
            service: 'Pipe Replacement',
            date: '2025-09-07',
            status: 'Pending',
            userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs7x78dz9qIb-_TsfeYdxyn__ikoehh0MpPUEbPS_feulue2NwU13cLOxvmorrlv5Ku3A&usqp=CAU',
        },
        {
            id: '3',
            user: 'Rohit Verma',
            service: 'Drain Cleaning',
            date: '2025-09-06',
            status: 'Pending',
            userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEGhTnzEAIgl3NngEtjn2JXL2NHtTD_Bcn1a_-89lJ7dw_PZwuxTZDO_XYGUTorauMkqM&usqp=CAU',
        },
    ]);

    // Accept a request
    const handleAccept = (id) => {
        setRequests((prev) =>
            prev.map((req) =>
                req.id === id ? { ...req, status: 'Accepted' } : req
            )
        );
        Alert.alert('Success', 'Request accepted!');
    };

    // Reject a request
    const handleReject = (id) => {
        setRequests((prev) =>
            prev.map((req) =>
                req.id === id ? { ...req, status: 'Rejected' } : req
            )
        );
        Alert.alert('Info', 'Request rejected.');
    };

    const renderRequest = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.userImage }} style={styles.userImage} />
            <View style={styles.infoContainer}>
                <Text style={styles.userName}>{item.user}</Text>
                <Text style={styles.serviceName}>{item.service}</Text>
                <Text style={styles.dateText}>Requested on: {item.date}</Text>
                <Text style={[
                    styles.status,
                    item.status === 'Pending' ? styles.pending :
                        item.status === 'Accepted' ? styles.accepted : styles.rejected
                ]}>
                    {item.status}
                </Text>

                {item.status === 'Pending' && (
                    <View style={styles.actionRow}>
                        <TouchableOpacity
                            style={[styles.actionBtn, styles.acceptBtn]}
                            onPress={() => handleAccept(item.id)}
                        >
                            <Text style={styles.actionText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionBtn, styles.rejectBtn]}
                            onPress={() => handleReject(item.id)}
                        >
                            <Text style={styles.actionText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Incoming Requests</Text>
            {requests.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No requests available</Text>
                </View>
            ) : (
                <FlatList
                    data={requests}
                    keyExtractor={(item) => item.id}
                    renderItem={renderRequest}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingTop: 50, paddingHorizontal: 16 },
    pageTitle: { fontSize: 24, fontWeight: '700', color: colors.primary, marginBottom: 16 },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    userImage: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
    infoContainer: { flex: 1 },
    userName: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
    serviceName: { fontSize: 14, color: colors.secondary, marginVertical: 2 },
    dateText: { fontSize: 12, color: 'gray' },
    status: { fontSize: 12, fontWeight: '700', marginTop: 4 },
    pending: { color: 'orange' },
    accepted: { color: 'green' },
    rejected: { color: 'red' },
    actionRow: { flexDirection: 'row', marginTop: 8 },
    actionBtn: { flex: 1, paddingVertical: 6, borderRadius: 6, alignItems: 'center', marginRight: 8 },
    acceptBtn: { backgroundColor: 'green' },
    rejectBtn: { backgroundColor: 'red', marginRight: 0 },
    actionText: { color: '#fff', fontWeight: '700' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16, color: 'gray' },
});
