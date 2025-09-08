// FormDetail.js
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    Switch,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import React, { useState } from "react";
import colors from "../../config/colors";

export default function FormDetail({navigation}) {
    const [form, setForm] = useState({
        name: "",
        serviceType: "",
        experience: "",
        pricePerHour: "",
        phone: "",
        email: "",
        city: "",
        state: "",
        zipcode: "",
        latitude: "",
        longitude: "",
        availability: {
            monday: { available: false, start: "", end: "" },
            tuesday: { available: false, start: "", end: "" },
            wednesday: { available: false, start: "", end: "" },
            thursday: { available: false, start: "", end: "" },
            friday: { available: false, start: "", end: "" },
            saturday: { available: false, start: "", end: "" },
            sunday: { available: false, start: "", end: "" },
        },
        servicesOffered: "",
        profileImage: "",
        isVerified: false,
    });

    const [availabilityModal, setAvailabilityModal] = useState(false);
    const [serviceModal, setServiceModal] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const [confirmModal, setConfirmModal] = useState(false); // ✅ confirmation modal

    const services = [
        "Plumber",
        "Electrician",
        "Carpenter",
        "Painter",
        "Cleaner",
        "Driver",
        "Cook",
    ];

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const handleAvailabilityChange = (day, key, value) => {
        setForm({
            ...form,
            availability: {
                ...form.availability,
                [day]: {
                    ...form.availability[day],
                    [key]: value,
                },
            },
        });
    };

    const handleSubmit = () => {
        setConfirmModal(true);
    };

    const confirmSubmission = () => {
        setConfirmModal(false);
        // ✅ do actual submit logic here (e.g., API call)
        navigation.navigate("TabNavProvider")
        console.log("Form submitted:", form);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={80}
        >
            <View style={styles.container}>
                {/* Page Heading */}
                <Text style={styles.pageTitle}>Enter your detail</Text>

                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.sectionTitle}>Basic Info</Text>
                    <TextInput
                        style={[
                            styles.input,
                            focusedInput === "name" && styles.inputFocused,
                        ]}
                        placeholder="Name"
                        placeholderTextColor="gray"
                        value={form.name}
                        onChangeText={(text) => handleChange("name", text)}
                        onFocus={() => setFocusedInput("name")}
                        onBlur={() => setFocusedInput(null)}
                    />

                    {/* Service Type Dropdown */}
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setServiceModal(true)}
                    >
                        <Text
                            style={{
                                color: form.serviceType
                                    ? colors.textPrimary
                                    : "gray",
                            }}
                        >
                            {form.serviceType || "Select Service Type"}
                        </Text>
                    </TouchableOpacity>

                    {/* Service Modal */}
                    <Modal
                        visible={serviceModal}
                        transparent
                        animationType="slide"
                        onRequestClose={() => setServiceModal(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalBox}>
                                <Text style={styles.modalTitle}>
                                    Select Service Type
                                </Text>
                                {services.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.optionBtn}
                                        onPress={() => {
                                            handleChange("serviceType", item);
                                            setServiceModal(false);
                                        }}
                                    >
                                        <Text style={styles.optionText}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity
                                    style={styles.saveBtn}
                                    onPress={() => setServiceModal(false)}
                                >
                                    <Text style={styles.saveBtnText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* Experience + Price in one row */}
                    <View style={styles.row}>
                        <TextInput
                            style={[
                                styles.input,
                                styles.rowInput,
                                focusedInput === "experience" &&
                                styles.inputFocused,
                            ]}
                            placeholder="Experience (Years)"
                            placeholderTextColor="gray"
                            value={form.experience}
                            keyboardType="numeric"
                            onChangeText={(text) =>
                                handleChange("experience", text)
                            }
                            onFocus={() => setFocusedInput("experience")}
                            onBlur={() => setFocusedInput(null)}
                        />
                        <TextInput
                            style={[
                                styles.input,
                                styles.rowInput,
                                focusedInput === "pricePerHour" &&
                                styles.inputFocused,
                            ]}
                            placeholder="Price per Hour"
                            placeholderTextColor="gray"
                            value={form.pricePerHour}
                            keyboardType="numeric"
                            onChangeText={(text) =>
                                handleChange("pricePerHour", text)
                            }
                            onFocus={() => setFocusedInput("pricePerHour")}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <TextInput
                        style={[
                            styles.input,
                            focusedInput === "phone" && styles.inputFocused,
                        ]}
                        placeholder="Phone"
                        placeholderTextColor="gray"
                        value={form.phone}
                        onChangeText={(text) => handleChange("phone", text)}
                        onFocus={() => setFocusedInput("phone")}
                        onBlur={() => setFocusedInput(null)}
                    />
                    <TextInput
                        style={[
                            styles.input,
                            focusedInput === "email" && styles.inputFocused,
                        ]}
                        placeholder="Email"
                        placeholderTextColor="gray"
                        value={form.email}
                        onChangeText={(text) => handleChange("email", text)}
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                    />

                    <Text style={styles.sectionTitle}>Location</Text>
                    <TextInput
                        style={[
                            styles.input,
                            focusedInput === "city" && styles.inputFocused,
                        ]}
                        placeholder="City"
                        placeholderTextColor="gray"
                        value={form.city}
                        onChangeText={(text) => handleChange("city", text)}
                        onFocus={() => setFocusedInput("city")}
                        onBlur={() => setFocusedInput(null)}
                    />
                    <TextInput
                        style={[
                            styles.input,
                            focusedInput === "state" && styles.inputFocused,
                        ]}
                        placeholder="State"
                        placeholderTextColor="gray"
                        value={form.state}
                        onChangeText={(text) => handleChange("state", text)}
                        onFocus={() => setFocusedInput("state")}
                        onBlur={() => setFocusedInput(null)}
                    />
                    <TextInput
                        style={[
                            styles.input,
                            focusedInput === "zipcode" && styles.inputFocused,
                        ]}
                        placeholder="Zipcode"
                        placeholderTextColor="gray"
                        value={form.zipcode}
                        onChangeText={(text) => handleChange("zipcode", text)}
                        onFocus={() => setFocusedInput("zipcode")}
                        onBlur={() => setFocusedInput(null)}
                    />

                    <Text style={styles.sectionTitle}>Availability</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setAvailabilityModal(true)}
                    >
                        <Text style={{ color: colors.textPrimary }}>
                            Set Availability
                        </Text>
                    </TouchableOpacity>

                    {/* Availability Modal */}
                    <Modal
                        visible={availabilityModal}
                        transparent
                        animationType="slide"
                        onRequestClose={() => setAvailabilityModal(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalBox}>
                                <Text style={styles.modalTitle}>
                                    Set Availability
                                </Text>

                                {Object.keys(form.availability).map((day) => (
                                    <View key={day} style={styles.dayRow}>
                                        <Text style={styles.dayLabel}>
                                            {day.charAt(0).toUpperCase() +
                                                day.slice(1)}
                                        </Text>
                                        <Switch
                                            value={
                                                form.availability[day].available
                                            }
                                            onValueChange={(val) =>
                                                handleAvailabilityChange(
                                                    day,
                                                    "available",
                                                    val
                                                )
                                            }
                                        />
                                        {form.availability[day].available && (
                                            <View style={styles.timeInputs}>
                                                <TextInput
                                                    placeholder="Start"
                                                    placeholderTextColor="gray"
                                                    style={styles.timeInput}
                                                    value={
                                                        form.availability[day]
                                                            .start
                                                    }
                                                    onChangeText={(text) =>
                                                        handleAvailabilityChange(
                                                            day,
                                                            "start",
                                                            text
                                                        )
                                                    }
                                                />
                                                <TextInput
                                                    placeholder="End"
                                                    placeholderTextColor="gray"
                                                    style={styles.timeInput}
                                                    value={
                                                        form.availability[day]
                                                            .end
                                                    }
                                                    onChangeText={(text) =>
                                                        handleAvailabilityChange(
                                                            day,
                                                            "end",
                                                            text
                                                        )
                                                    }
                                                />
                                            </View>
                                        )}
                                    </View>
                                ))}

                                <TouchableOpacity
                                    style={styles.saveBtn}
                                    onPress={() => setAvailabilityModal(false)}
                                >
                                    <Text style={styles.saveBtnText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <TextInput
                        style={[
                            styles.input,
                            focusedInput === "servicesOffered" &&
                            styles.inputFocused,
                        ]}
                        placeholder="Services Offered (comma separated)"
                        placeholderTextColor="gray"
                        value={form.servicesOffered}
                        onChangeText={(text) =>
                            handleChange("servicesOffered", text)
                        }
                        onFocus={() => setFocusedInput("servicesOffered")}
                        onBlur={() => setFocusedInput(null)}
                    />

                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitBtnText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* ✅ Confirmation Modal */}
            <Modal
                visible={confirmModal}
                transparent
                animationType="fade"
                onRequestClose={() => setConfirmModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.confirmBox}>
                        <Text style={styles.modalTitle}>
                            Do you want to continue?
                        </Text>
                        <Text style={styles.confirmText}>
                            Is all your data correct?
                        </Text>

                        <View style={styles.confirmButtons}>
                            <TouchableOpacity
                                style={[styles.confirmBtn, { backgroundColor: "gray" }]}
                                onPress={() => setConfirmModal(false)}
                            >
                                <Text style={styles.confirmBtnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.confirmBtn}
                                onPress={confirmSubmission}
                            >
                                <Text style={styles.confirmBtnText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 50,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "black",
        paddingHorizontal: 16,
    },
    scrollContainer: { padding: 16, paddingBottom: 40 },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.primary,
        marginTop: 8,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        backgroundColor: "#fff",
        color: colors.textPrimary,
    },
    inputFocused: {
        borderColor: colors.primary,
        borderWidth: 2,
    },
    row: { flexDirection: "row", gap: 10 },
    rowInput: { flex: 1 },
    dropdown: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 20,
    },
    modalBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        width: "100%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
        color: colors.primary,
    },
    optionBtn: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    optionText: {
        fontSize: 16,
        color: colors.textPrimary,
    },
    dayRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    dayLabel: { flex: 1, fontSize: 14, color: colors.textPrimary },
    timeInputs: { flexDirection: "row", gap: 8 },
    timeInput: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 6,
        padding: 8,
        fontSize: 12,
        width: 70,
        backgroundColor: "#fff",
        color: colors.textPrimary,
    },
    saveBtn: {
        marginTop: 20,
        backgroundColor: colors.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
    submitBtn: {
        backgroundColor: colors.primary,
        marginTop: 20,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    submitBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },

    // Confirmation Modal Styles
    confirmBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        width: "90%",
    },
    confirmText: {
        fontSize: 16,
        color: colors.textPrimary,
        marginBottom: 20,
    },
    confirmButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    confirmBtn: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
    },
    confirmBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
});
