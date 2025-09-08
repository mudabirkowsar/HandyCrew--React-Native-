import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import colors from '../../../config/colors';
import { useNavigation } from '@react-navigation/native';

export default function ChatScreenProvider() {
    const navigation = useNavigation();

    // Example users with last messages
    const [users, setUsers] = useState([
        {
            id: '1',
            name: 'Ankit Sharma',
            lastMessage: 'Hello! Are you available tomorrow?',
            time: '10:15 AM',
            userImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
            id: '2',
            name: 'Priya Singh',
            lastMessage: 'Can you replace my pipe on Monday?',
            time: '09:30 AM',
            userImage: 'https://randomuser.me/api/portraits/women/45.jpg',
        },
        {
            id: '3',
            name: 'Rohit Verma',
            lastMessage: 'Drain cleaning service needed tomorrow morning.',
            time: '08:50 AM',
            userImage: 'https://randomuser.me/api/portraits/men/65.jpg',
        },
    ]);

    const renderUser = ({ item }) => (
        <TouchableOpacity
            style={styles.userCard}
            onPress={() => navigation.navigate('UserChatScreen', { user: item })}
        >
            <Image source={{ uri: item.userImage }} style={styles.userImage} />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.lastMessage}
                </Text>
            </View>
            <Text style={styles.messageTime}>{item.time}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Chats</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={renderUser}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.primary,
        marginBottom: 16,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    lastMessage: {
        fontSize: 14,
        color: 'gray',
        marginTop: 2,
    },
    messageTime: {
        fontSize: 12,
        color: 'gray',
    },
});
