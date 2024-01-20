import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomCheckbox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      {checked ? (
        <Ionicons name="checkbox-outline" size={24} color="blue" />
      ) : (
        <Ionicons name="square-outline" size={24} color="blue" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    // Customize checkbox styles as needed
  },
});

export default CustomCheckbox;
