import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
interface OrderModelProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    options: { label: string; value: string; color: string }[];
    onpress: (value: string) => void;
}
const OrderModel: React.FC<OrderModelProps> = ({
    isVisible,
    setIsVisible,
    options,
    onpress,
}) => {
    return (
        <>
            < Modal
                transparent={true}
                visible={isVisible}
                animationType="fade"
                onRequestClose={() => setIsVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Are you sure you are delivered?</Text>
                        <View style={styles.buttonContainer}>
                            {options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => onpress(option.value)}
                                    style={[styles.button, { backgroundColor: option.color }]}
                                >
                                    <Text style={[styles.buttonText, { color: option.color === 'white' ? 'black' : 'white' }]}>
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default OrderModel

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4d4d4d'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    noButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        padding: 10,
        marginRight: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    yesButton: {
        flex: 1,
        backgroundColor: 'green',
        padding: 10,
        marginLeft: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    noButtonText: {
        color: 'red',
        fontWeight: 'bold',
    },
    yesButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        borderRadius: 5,
      },
      buttonText: {
        fontWeight: 'bold',
      },
})