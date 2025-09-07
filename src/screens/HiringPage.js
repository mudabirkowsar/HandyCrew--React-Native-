import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Modal, TouchableOpacity, PanResponder } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { width } = Dimensions.get('window');
const SLIDE_WIDTH = width - 40; // Slider width minus padding
const THUMB_SIZE = 60; // Circle size

export default function HiringPage({ navigation }) {
  const [hired, setHired] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [thankModalVisible, setThankModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newX = gestureState.dx;
        if (newX < 0) newX = 0;
        if (newX > SLIDE_WIDTH - THUMB_SIZE) newX = SLIDE_WIDTH - THUMB_SIZE;
        slideAnim.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx >= SLIDE_WIDTH - THUMB_SIZE - 10) {
          // Successful slide
          Animated.timing(slideAnim, {
            toValue: SLIDE_WIDTH - THUMB_SIZE,
            duration: 100,
            useNativeDriver: false,
          }).start(() => {
            setConfirmModalVisible(true); // Show first modal
          });
        } else {
          // Slide back
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const confirmHire = () => {
    setConfirmModalVisible(false);
    setHired(true);
    setThankModalVisible(true); // Show thanks modal
  };

  const cancelHire = () => {
    setConfirmModalVisible(false);
    // Reset slider if canceled
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const closeThankModal = () => {
    setThankModalVisible(false);
    navigation.replace("TabNavigation")
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Hiring Page</Text>
        <Text style={styles.subtitle}>
          Slide the button below to hire the user.
        </Text>
      </View>

      <View style={styles.sliderContainer}>
        <Animated.View
          style={[
            styles.sliderThumb,
            { transform: [{ translateX: slideAnim }] },
            hired && { backgroundColor: '#27ae60' },
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.thumbText}>{hired ? 'Hired' : '➔'}</Text>
        </Animated.View>
        {!hired && <Text style={styles.sliderLabel}>Slide to Hire</Text>}
      </View>

      {/* Confirm Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Hire</Text>
            <Text style={styles.modalText}>Do you want to hire this user?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={cancelHire}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={confirmHire}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Thank You Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={thankModalVisible}
        onRequestClose={closeThankModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Thank You!</Text>
            <Text style={styles.modalText}>Thanks for hiring me 🎉</Text>
            <TouchableOpacity style={{ backgroundColor: "#009688", paddingHorizontal: 20, paddingVertical: 15, borderRadius: 10 }} onPress={closeThankModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2f3640',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#636e72',
    textAlign: 'center',
  },
  sliderContainer: {
    height: THUMB_SIZE,
    width: SLIDE_WIDTH,
    backgroundColor: '#dfe6e9',
    borderRadius: THUMB_SIZE / 2,
    justifyContent: 'center',
    marginBottom: 30,
  },
  sliderThumb: {
    position: 'absolute',
    height: THUMB_SIZE,
    width: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#00b894',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  thumbText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  sliderLabel: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#636e72',
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2d3436',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#636e72',
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#b2bec3',
  },
  confirmButton: {
    backgroundColor: '#00b894',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
