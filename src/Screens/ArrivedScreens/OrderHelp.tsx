import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Topnavigation from '../../utils/Topnavigation'
import colors from '../../utils/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const OrderHelp = (props: any) => {
    const navigation = useNavigation()

    const ordersample = {
        title: 'Food Delivery',
        DeliveryTime: '22.47',
        OrderId: '4512355662',
        lastOrderNo: '5662',
        PickUpAddresses: 'Akshaya homefoods, no 51, 2nd street, gandhi nager, adyar, chennai.'
    };

    const orderId = ordersample.OrderId;
    const firstPart = orderId.slice(0, -4);
    const lastFourDigits = orderId.slice(-4);
    console.log(firstPart, 'firast paed');

    const handlenavigate = () => {
        navigation.canGoBack()
    }
    return (
        <>
         
            <View style={styles.topmain}>
                <TouchableOpacity onPress={() => handlenavigate()} style={{ flexDirection: 'row' }}>
                    <FontAwesome name='angle-left' style={styles.backicon} size={30} />
                    <Text style={styles.menuLabel}>{ }</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: '#4d4d4d', fontSize: 20, fontFamily: 'Roboto-Medium', }}>Order ID: </Text>
                    <Text style={{ color: '#4d4d4d', fontSize: 15 }}>{firstPart} <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>{lastFourDigits}</Text></Text>
                </View>
                <View>
                    <Text style={{ color: '#4d4d4d', fontSize: 20, fontFamily: 'Roboto-Medium', marginVertical: 15 }}>Contact</Text>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name='call' size={24} color={colors.primary} />
                            <Text style={{ color: '#4d4d4d', fontSize: 20, paddingHorizontal: 10, fontWeight: '500' }}>Call Customer</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderBottomWidth: 0.5, marginVertical: 10, borderTopColor: '#eee' }}></View>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name='chat' size={24} color={'blue'} />
                            <Text style={{ color: '#4d4d4d', fontSize: 20, paddingHorizontal: 10, fontWeight: '500' }}>Call Customer</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ color: '#4d4d4d', fontSize: 20, fontFamily: 'Roboto-Medium', marginTop: 20 }}>Cancel Order</Text>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', padding: 10 }}>
                            <MaterialCommunityIcons name='cancel' size={24} color={'red'} />
                            <Text style={{ paddingHorizontal: 10, color: 'red', fontFamily: 'Roboto-Bold', fontSize: 20 }}>Cancel This Order</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <View
                        style={{
                            marginVertical: 50,
                            backgroundColor: '#0756CC', paddingHorizontal: 30, paddingVertical: 20,
                            justifyContent: 'center',
                            alignSelf: 'center', borderRadius: 10
                        }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Roboto-Medium', fontSize: 15, color: '#fff' }}>Call To Help</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </>
    )
}

export default OrderHelp

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