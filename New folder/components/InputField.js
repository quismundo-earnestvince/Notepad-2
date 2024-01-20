import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({ label, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={`Enter ${label}`}
        secureTextEntry={secureTextEntry} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 9,
    marginBottom: 15,
    backgroundColor: '#CBDBD9',
    width: 220,
    marginLeft: 0,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  label: {
    fontSize: 10,
    // fontWeight: '550',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingBottom: 5,
    // fontFamily: 'Ineria Serif',
  },
  input: {
    marginTop: 5,
    fontSize: 10,
    // fontFamily: 'Ineria Serif',
  },
});

export default InputField;
