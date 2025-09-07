import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../src/config/colors';

export default function AddressScreen({ navigation }) {
    const [address, setAddresses] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [altPhone, setAltPhone] = useState('');
    const [street, setStreet] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [addressType, setAddressType] = useState('Home');
    const [focusedInput, setFocusedInput] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleSave = () => {
        setModalVisible(true);
    };

    const handleSubmit = () => {
        const newAddress = {
            name,
            phone,
            altPhone,
            street,
            landmark,
            city,
            state,
            country,
            zipcode,
            addressType,
        };
        setAddresses((prev) => [...prev, newAddress]);
        navigation.navigate('FinalHire');

        // Reset form
        setName('');
        setPhone('');
        setAltPhone('');
        setStreet('');
        setLandmark('');
        setCity('');
        setState('');
        setCountry('');
        setZipcode('');
        setAddressType('Home');
        setModalVisible(false);
    };

    const renderInput = (
        placeholder,
        value,
        setValue,
        keyboardType,
        inputName,
        extraStyle = {}
    ) => (
        <TextInput
            style={[
                styles.input,
                extraStyle,
                focusedInput === inputName && styles.inputFocused,
            ]}
            placeholder={placeholder}
            placeholderTextColor={colors.gray}
            value={value}
            onChangeText={setValue}
            keyboardType={keyboardType}
            onFocus={() => setFocusedInput(inputName)}
            onBlur={() => setFocusedInput('')}
        />
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Address</Text>

            {renderInput('Full Name', name, setName, 'default', 'name')}
            {renderInput('Phone Number', phone, setPhone, 'phone-pad', 'phone')}
            {renderInput(
                'Alternate Phone (Optional)',
                altPhone,
                setAltPhone,
                'phone-pad',
                'altPhone'
            )}
            {renderInput('Street Address', street, setStreet, 'default', 'street')}
            {renderInput(
                'Landmark / Apartment / Building',
                landmark,
                setLandmark,
                'default',
                'landmark'
            )}

            <View style={styles.row}>
                {renderInput('City', city, setCity, 'default', 'city', styles.rowInput)}
                {renderInput(
                    'State',
                    state,
                    setState,
                    'default',
                    'state',
                    styles.rowInput
                )}
            </View>

            <View style={styles.row}>
                {renderInput(
                    'Country',
                    country,
                    setCountry,
                    'default',
                    'country',
                    styles.rowInput
                )}
                {renderInput(
                    'Zip Code',
                    zipcode,
                    setZipcode,
                    'number-pad',
                    'zipcode',
                    styles.rowInput
                )}
            </View>

            {/* Address Type Pills */}
            <Text style={styles.label}>Address Type</Text>
            <View style={styles.typeContainer}>
                {['Home', 'Work', 'Other'].map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.typePill,
                            addressType === type && styles.typePillSelected,
                        ]}
                        onPress={() => setAddressType(type)}
                    >
                        <Text
                            style={[
                                styles.typeText,
                                addressType === type && styles.typeTextSelected,
                            ]}
                        >
                            {type}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Address</Text>
            </TouchableOpacity>

            {/* Custom Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Confirm Save</Text>
                        <Text style={styles.modalMessage}>
                            Do you want to save this address?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.continueButton]}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.modalButtonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colors.background,
        flexGrow: 1,
        paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.primary,
        marginBottom: 25,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 12,
        padding: 14,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    inputFocused: {
        borderColor: colors.primary,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
        marginRight: 10,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 8,
        color: colors.textPrimary,
    },
    typeContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    typePill: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    typePillSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    typeText: {
        fontSize: 14,
        color: colors.textPrimary,
    },
    typeTextSelected: {
        color: '#fff',
        fontWeight: '700',
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
    modalBackground: {
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
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.primary,
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: colors.secondary,
    },
    continueButton: {
        backgroundColor: colors.primary,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
});
