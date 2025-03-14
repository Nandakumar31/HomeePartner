import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const ReusableFormInput = ({ label, value, onChangeText, keyboardType, max, secure, edit = true, style = {} }: any) => {
    return (
        <TextInput
            label={label}
            value={value}
            textColor='#4d4d4d'
            onChangeText={onChangeText}
            style={[styles.input, style]}
            mode="outlined"
            keyboardType={keyboardType}
            maxLength={max}
            editable={edit}
            secureTextEntry={secure}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '85%',
        marginBottom: 15,
        backgroundColor:'#fff'

    },
});

export default ReusableFormInput;
