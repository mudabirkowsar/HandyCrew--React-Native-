import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import colors from '../../../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UserChatScreen({ route }) {
    const { user } = route.params;
    const [messages, setMessages] = useState([
        { id: '1', sender: 'user', text: 'Hi there!' },
        { id: '2', sender: 'provider', text: 'Hello! How can I help you?' },
        { id: '3', sender: 'user', text: 'I need a leak repair tomorrow.' },
    ]);

    const [newMessage, setNewMessage] = useState('');
    const flatListRef = useRef();

    const sendMessage = () => {
        if (newMessage.trim() === '') return;

        const message = {
            id: Date.now().toString(),
            sender: 'provider',
            text: newMessage,
        };

        setMessages([...messages, message]);
        setNewMessage('');

        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);

        Keyboard.dismiss();
    };

    const renderMessage = ({ item }) => (
        <View
            style={[
                styles.chatBubble,
                item.sender === 'provider' ? styles.provider : styles.user,
            ]}
        >
            <Text style={styles.chatText}>{item.text}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <View style={styles.container}>
                <Text style={styles.pageTitle}>{user.name}</Text>

                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item.id}
                        renderItem={renderMessage}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        keyboardShouldPersistTaps="handled"
                    />
                </View>

                {/* Input at bottom */}
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        placeholderTextColor="gray"
                        value={newMessage}
                        onChangeText={setNewMessage}
                    />
                    <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                        <MaterialCommunityIcons name="send" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
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
    chatBubble: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 4,
        maxWidth: '75%',
    },
    user: {
        backgroundColor: '#362323',
        alignSelf: 'flex-start',
    },
    provider: {
        backgroundColor: colors.primary,
        alignSelf: 'flex-end',
    },
    chatText: {
        color: '#fff',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        paddingBottom:30,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 15,
        marginRight: 8,
        color: colors.textPrimary,
    },
    sendBtn: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
