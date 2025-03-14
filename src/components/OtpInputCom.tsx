import { TextInput, View, StyleSheet } from 'react-native';
import React, { forwardRef } from 'react';

const OtpInput = forwardRef(({ value, onChangeText }: any, ref: any) => {
  return (
    <TextInput
      ref={ref}
      style={styles.otpInput}
      keyboardType="numeric"
      maxLength={1}
      value={value}
      onChangeText={onChangeText}
      autoFocus={false}
    
    />
  );
});

const styles = StyleSheet.create({
  otpInput: {
    width: 35,
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#868686',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 5,
    color:'#4d4d4d'
  },
});

export default OtpInput;
