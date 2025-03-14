import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import colors from '../../utils/color'
const OrderPendingComp = ({ restaurantInfo, address_info, onpress,OrderId,DBID }: any) => {
    console.log(restaurantInfo,address_info);
    
   
    return (
        <View>
            <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <Text style={{ color: '#4d4d4d' }}>From</Text>
                    <FontAwesome5 name='building' size={20} style={{ paddingHorizontal: 10, color: '#4d4d4d' }} />
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#4d4d4d', fontWeight: 'bold', marginRight: 5 }}>{restaurantInfo?.name}</Text>
                            <Text style={{ color: '#4d4d4d' }}>{restaurantInfo?.pickupAddress?.street}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#4d4d4d', marginRight: 5 }}>{restaurantInfo?.pickupAddress?.city}</Text>
                            <Text style={{ color: '#4d4d4d' }}>{restaurantInfo?.pickupAddress?.zip}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                    <Text style={{ color: '#4d4d4d', marginRight: 10 }}>To</Text>
                    <FontAwesome5 name='home' size={20} style={{ paddingHorizontal: 12, color: '#4d4d4d' }} />
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#4d4d4d', fontWeight: 'bold', marginRight: 5 }}>{address_info?.name}</Text>
                            <Text style={{ color: '#4d4d4d' }}>{address_info?.deliveryAddress?.street}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#4d4d4d', marginRight: 5 }}>{address_info?.deliveryAddress?.city}</Text>
                            <Text style={{ color: '#4d4d4d' }}>{address_info?.deliveryAddress?.zip}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, justifyContent: 'space-between', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => onpress(1, OrderId, DBID)}>
                    <Text style={{ borderRadius: 10, padding: 10, color: '#fff', backgroundColor: colors.primary, paddingHorizontal: 70 }}>
                        Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onpress(0, OrderId, DBID)}>
                    <Text style={{ borderWidth: 2, borderRadius: 10, padding: 8, borderColor: 'red', color: 'red', paddingHorizontal: 40 }}>Reject</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default OrderPendingComp

const styles = StyleSheet.create({})