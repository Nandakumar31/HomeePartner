import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import colors from '../../utils/color'
import Topnavigation from '../../utils/Topnavigation';
import { useDispatch, useSelector } from 'react-redux';
import * as api from "../../services/api.services";
import { useNavigation } from '@react-navigation/native';
import { extractOrderParts } from '../../utils/helper/Ordersutills';
import { setOrderPicked } from '../../store/slices/OrderSlice';
import { arriveAtPickup } from '../../store/slices/mapSlice';
import AntDesign from 'react-native-vector-icons/AntDesign'
import OtpInput from '../../components/OtpInputCom';
import useImagePicker from '../../utils/helper/CameraFunction';
import { Colors } from '../../constent/Themes';
import auth from '@react-native-firebase/auth';
const { width, height } = Dimensions.get('screen')

const ItemsCheck = ({ route }: any) => {
    // console.log(route, 'tryagai==================n');

    const { verification }: any = route.params


    const navigation = useNavigation()

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [photos, setPhotos] = useState([null, null, null]);
    const [user, setUser] = useState()
    console.log(photos, 'photopd');


    const dispatch = useDispatch()
    const { openCamera } = useImagePicker()

    const order = useSelector((state: any) => state.order);
    // console.log(order,'cheche');


    const orderAccepted = useSelector((state: any) => state.order?.orderAccepted[0]);

    // console.log(order, 'help');

    // const dispatch = useDispatch()
    // const UserLocation = order?.customer?.delivery_address?.location
    // console.log(UserLocation, 'userlocation============>');
    // const navigation = useNavigation();
    const inputs: any = useRef([]);

    const handleChange = (text: any, index: any) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        if (text && index < otp.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const verifyOtp = async () => {
        const otpString = otp.join('');
        console.log('OTP:', otpString);

        try {
            if (otp?.length >= 5) {
                const credential: any = auth.PhoneAuthProvider.credential(verification, otpString);
                const user = await auth().signInWithCredential(credential);
                console.log('User verified:', user);
                setUser(user)
            } else {
                Alert.alert('enter the otp ')

            }
        }
        catch {
            console.log('Error verifying OTP')


        }
    }



    const { firstPart, lastFourDigits } = extractOrderParts(orderAccepted?.OrderId);
    // 
    const { item_info } = orderAccepted
    // console.log(item_info.item[0].name,'eee');


    console.log('First Part:', firstPart);
    console.log('Last Four Digits:', lastFourDigits);

    const data = {
        OrderId: orderAccepted?.OrderId,
        Status: 1,
        Itemstatus: 'drop'

    }

    const handleArrived = async () => {
        verifyOtp()
        console.log('Arrived');
        if (user) {
            console.log('ifounduser');
            if (photos != null && photos?.length >=3){
                console.log('ifoundphotos')
            }
            
        }
        // const res = await api.Itemstatus(data)
        // console.log(res, 'from ArrivedItemStatus');
        // if (res?.success) {
        //     dispatch(arriveAtPickup())
        //     navigation.goBack()
        // } else {
        //     Alert.alert('Try Again')
        // }


    }
    return (
        <>
            <Topnavigation label='' />
            <View style={{ marginHorizontal: 10 }}>
                <Text style={{
                    color: colors.primary, fontSize: 20, fontFamily: 'Roboto-Bold',
                    textAlign: 'center', marginVertical: 5
                }}>{orderAccepted?.order_info?.DeliveryType ? 'Pickup & Drop Delivery' : 'Food Delivery'}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: '#4d4d4d', fontSize: 20, fontFamily: 'Roboto-Medium', }}>Order ID: </Text>
                    <Text style={{ color: '#4d4d4d', fontSize: 15 }}>{firstPart} <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>{lastFourDigits}</Text></Text>
                </View>
                <View>
                    <Text style={{ marginTop: 10, fontSize: 18, color: 'red', fontFamily: 'Roboto-Medium' }}>PickUp Address</Text>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: '#4d4d4d', fontWeight: 'bold', marginRight: 5 }}>{orderAccepted?.restaurantInfo?.name || orderAccepted?.pickup_info?.name}</Text>
                        <Text style={{ color: '#4d4d4d' }}>{orderAccepted?.restaurantInfo?.pickupAddress?.street || orderAccepted?.pickup_info?.pickupAddress?.street}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#4d4d4d', marginRight: 5 }}>{orderAccepted?.restaurantInfo?.pickupAddress?.city || orderAccepted?.pickup_info?.pickupAddress?.city}</Text>
                            <Text style={{ color: '#4d4d4d' }}>{orderAccepted?.restaurantInfo?.pickupAddress?.zip || orderAccepted?.pickup_info?.pickupAddress?.zip}</Text>
                        </View>
                    </View>

                </View>
                <View>
                    <Text style={{ marginTop: 10, fontSize: 18, color: colors.primary, fontFamily: 'Roboto-Medium' }}>Delivery Address</Text>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: '#4d4d4d', fontWeight: 'bold', marginRight: 5 }}>{orderAccepted?.address_info?.name || orderAccepted?.drop_info?.name}</Text>
                        <Text style={{ color: '#4d4d4d' }}>{orderAccepted?.address_info?.deliveryAddress?.street || orderAccepted?.drop_info?.deliveryAddress?.street}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#4d4d4d', marginRight: 5 }}>{orderAccepted?.address_info?.deliveryAddress?.city || orderAccepted?.drop_info?.deliveryAddress?.city}</Text>
                            <Text style={{ color: '#4d4d4d' }}>{orderAccepted?.address_info?.deliveryAddress?.zip || orderAccepted?.drop_info?.deliveryAddress?.zip}</Text>
                        </View>
                    </View>
                </View>
                {item_info?.item_type ?
                    <View>
                        <View>
                            <Text style={{ marginTop: 10, fontSize: 18, color: '#8A5D3B', fontFamily: 'Roboto-Medium' }}>Item Type : <Text style={{
                                marginTop: 10, fontSize: 18,
                                color: 'red', fontFamily: 'Roboto-Medium'
                            }}>{item_info?.item_type}</Text></Text>
                            <Text style={{ color: '#4d4d4d', fontWeight: 'bold', marginRight: 5 }}>{item_info?.description}</Text>
                        </View>
                        <View style={{
                            marginTop: 30
                        }}>
                            <Text style={{ color: '#4d4d4d', textAlign: 'center', fontSize: 18, fontFamily: 'Roboto-Medium' }}>Enter OTP</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                {otp.map((digit, index) => (<OtpInput
                                    key={index}
                                    ref={(ref) => (inputs.current[index] = ref)}
                                    value={digit}
                                    onChangeText={(text: any) => handleChange(text, index)}
                                />))}
                            </View>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.title}>Add photo</Text>
                            <View style={styles.photoRow}>
                                {photos.map((photo, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.photoPlaceholder}
                                        onPress={() => openCamera(index, setPhotos, photos)}
                                    >
                                        {photo ? (
                                            <Image source={{ uri: photo || 'https://example.com/default-placeholder.png'}} style={styles.photo} />
                                        ) : (
                                            <View style={styles.iconContainer}>
                                                <AntDesign
                                                    name='camerao'
                                                    size={30}
                                                    style={{ width: 50, height: 50, paddingHorizontal: 10, paddingVertical: 10 }}
                                                    color={Colors.PrimaryColor} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                    </View> :
                    <View> <Text style={{ marginVertical: 10, fontFamily: 'Roboto-Bold', fontSize: 18, color: '#4d4d4d' }}>Order Items</Text>
                        <View style={{ height: height / 2.5, padding: 10, borderRadius: 10, backgroundColor: '#eee' }}>
                            <FlatList
                                data={item_info?.item}
                                keyExtractor={(items) => items.id.toString()}
                                renderItem={(items) => (
                                    <View style={{ marginVertical: 5, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={require('../../assets/tempfoodimages/briyani.png')} style={{ width: 80, height: 80 }} />
                                            <Text style={{
                                                fontFamily: 'Roboto-Medium',
                                                color: '#4d4d4d', fontSize: 18, paddingHorizontal: 10
                                            }}> {items.item.Quantity}</Text>
                                            <Text style={{ fontFamily: 'Roboto-Medium', color: '#4d4d4d' }}>X</Text>
                                            <Text style={{
                                                fontFamily: 'Roboto-Medium',
                                                color: '#4d4d4d', fontSize: 18, paddingHorizontal: 10
                                            }}>{items.item.name}</Text>
                                        </View>
                                    </View>
                                )} />

                        </View>
                    </View>
                }

                <TouchableOpacity onPress={() => handleArrived()}
                    style={{ padding: 15, borderRadius: 5, backgroundColor: colors.primary, top: 20 }}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>Picked Up</Text>
                </TouchableOpacity>

            </View >
        </>
    )
}

export default ItemsCheck

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        color: '#4d4d4d',
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        marginBottom: 10
    },
    photoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    photoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    iconText: {
        fontSize: 24,
    },
});