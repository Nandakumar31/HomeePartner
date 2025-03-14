import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Dot = ({ size, label }) => {
    return (
        <View style={[styles.dot, { width: size, height: size }]}>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

const Line = () => {
    return <View style={styles.line} />;
};



export const LoadingPin = () => {
    return (
        <View style={styles.container}>
            <View style={styles.dotsContainer}>
                <Dot size={20} label="3" />
                <Line />
                <Dot size={20} label="6" />
                <Line />
                <Dot size={20} label="10" />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    dotsContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        borderRadius: 50,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    line: {
        width: 5,
        height: 50,
        backgroundColor: 'green',
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
    },
});