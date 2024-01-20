import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ThemeButton(props) {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]} // Merge custom styles with the default styles
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E9B824',
    borderRadius: 20, // Adjust the border radius for curved edges
    width: 190, // Adjust the width as needed
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    // fontWeight: '400',
    
  },
});
