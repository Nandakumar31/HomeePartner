import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Topnavigation = ({ label }: any) => {

    const navigation = useNavigation()

    const handlenavigate = () => {
        console.log('fromTopNavigation');
        navigation.navigate('DashBoard')
    }
    return (
        <View style={styles.topmain}>
            <TouchableOpacity onPress={() => handlenavigate()} style={{flexDirection:'row'}}>
                <FontAwesome name='angle-left' style={styles.backicon} size={30} />
                <Text style={styles.menuLabel}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Topnavigation

const styles = StyleSheet.create({
    topmain: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingVertical: 12,
        backgroundColor: '#03894E',
        borderTopWidth: 1,
        borderTopColor: '#fff'
    },
    backicon: {
        color: '#FFF',
    },
    menuLabel: {
        paddingLeft: 20,
        color: '#FFF',
        fontSize: 20,

    },
})