import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import React from 'react';

const ResendTimer = ({ timer, isResendEnabled, onResend }: any) => {
    return (
        <View style={styles.resendContainer}>
            <Text style={styles.timerText}>00:{timer}</Text>
            <TouchableOpacity
                style={[styles.resendButton, { opacity: isResendEnabled ? 1 : 0.5 }]}
                onPress={onResend}
                disabled={!isResendEnabled}
            >
                <Text style={styles.resendButtonText}>Resend OTP</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '80%',
    },
    timerText: {
        fontSize: 14,
        color: '#4d4d4d',
    },
    resendButton: {

    },
    resendButtonText: {
        color: '#4d4d4d',
        fontSize: 16,
        fontWeight: 'bold',


    },
});

export default ResendTimer;
