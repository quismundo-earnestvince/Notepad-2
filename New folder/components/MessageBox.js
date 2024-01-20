import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

const MessageBox = ({ message,visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.messageText}>{message}</Text>
          <Text style={styles.closeButton} onPress={onClose}>Close</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '75%' // Add shadow
  },
  messageText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
  },
});

export default MessageBox;
