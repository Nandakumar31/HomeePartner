import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Geolocation from "react-native-geolocation-service";
import {
    acceptOrder,
    arriveAtPickup,
    setCurrentLocation,
    setDropLocation,
    setPickupLocation,
    updateDistance,
    completeDrop,
} from "../store/slices/mapSlice";
import { GoogleMapApiKey } from "../constent/AppConstant/app.constants";
import { Fonts, Screen } from "../constent/Themes";
import colors from "../utils/color";
import { extractOrderParts } from "../utils/helper/Ordersutills";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import icons from '../assets/Locationicons/icons';
import { ProfileContext } from "../context/ProfileContext";
import { AddressDetails } from "../components/OrderComponents/OrderdetailsComp";
import { getMapRegion } from "../utils/helper/mapregionAnimate";
import * as api from '../services/api.services'
import { useNavigation } from "@react-navigation/native";
import { useOrders } from "../hooks/OrdersApis";
import { setOrderData, setOrderDelivered } from "../store/slices/OrderSlice";
import OrderModel from "../components/OrderComponents/OrderModel";
import OrderPendingComp from "../components/OrderComponents/OrderPendingComp";
import { RadioButton } from "react-native-paper";
import { sendOtp } from "../utils/sendOpt";
import { setSignedLocation } from "../store/slices/ProfileSlice";





const MapScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const { profile }: any = useContext(ProfileContext);
    const { getAcceptedOrders } = useOrders()
    const { origin, pickup, drop, status, distance } = useSelector(
        (state) => state.map
    );
    const order = useSelector((state: any) => state.order);
    const orderAccepted = useSelector((state: any) => state.order?.orderAccepted?.[0] ?? null);


    console.log('////////////////////', orderAccepted?.OrderId);
    const [refresh, setrefresh] = useState(false)
    const [isConfirmVisible, setIsConfirmVisible] = useState(false)
    const [cancelOrder, setCancelOrder] = useState(false)
    const [selectedReason, setSelectedReason] = useState<string>('');
    const [verification, setVerificationId] = useState()


    const orderData = order?.OrderData?.[0] ?? {};
    const { OrderId, address_info, restaurantInfo, order_info, drop_info, pickup_info } = orderData;

    // const { firstPart, lastFourDigits } = extractOrderParts(
    //     order?.OrderData[0]?.OrderId || orderAccepted?.OrderId
    // );

    const handleCancel = async (status: any, OrderId: any, DBId: any) => {
        try {
            // console.log(status, '///////////////////', OrderId, DBId, selectedReason);
            const res = await api.orderUpdateStatus({ status, OrderId, DBId, selectedReason });
            // console.log(res, '///////////////////')
            if (res.success) {
                dispatch(setOrderData(''))
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAccept = async (status: any, OrderId: any, DBId: any) => {

        try {
            if (status == 1) {
                let Itemstatus = 'pickup'
                const res = await api.orderUpdateStatus({ status, OrderId, DBId, Itemstatus });
                console.log(res, 'from Order management ');
                if (res.success) {
                    setrefresh(true)
                    dispatch(acceptOrder())
                }
            } else {
                console.log(status, 'from HandleAccept-------------------------------------------');

                setCancelOrder(true)
            }
        } catch (error) {
            console.log('accept oR REject Error');

        }
    }

    const handleSumbit = async (status: any) => {

        await sendOtp(status, orderAccepted?.OrderId)
        // if (status == 'Arrived') {
        //     if (verification) {
        //         navigation.navigate('ItemsCheck', { verification })
        //     } else {
        //         Alert.alert('Please Try Again')
        //     }
        // } else {
        //     setIsConfirmVisible(true)

        // }
    }
    const handleHelpPress = (status: any) => {
        if (status == 'Arrived') {
            console.log('arrived Help');
            navigation.navigate('OrderHelp')
        } else {
            console.log('drop Help');
            navigation.navigate('OrderHelp')
        }
    }

    const handleDeliveryStatus = async (data: any) => {
        console.log(data, 'help');

        if (data == 'YES') {
            const status = 6
            const OrderId = orderAccepted?.OrderId
            const DBId = profile?.HomeeDBId
            const Itemstatus = 'completed'

            const res = await api.orderUpdateStatus({ status, OrderId, DBId, Itemstatus });
            console.log(res, 'from Order management ');
            if (res.success) {
                navigation.navigate('DashBoard')
                dispatch(completeDrop())
                dispatch(setOrderDelivered(true))
            }
        } else {
            setIsConfirmVisible(false)
        }
    }

    useEffect(() => {
        getAcceptedOrders()
    }, [refresh])


    useEffect(() => {
        // Fetch current location
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                dispatch(setCurrentLocation({ latitude, longitude }));
                dispatch(setSignedLocation({ latitude, longitude }));
            },
            (error) => console.error(error),
            { enableHighAccuracy: true }
        );


    }, [dispatch]);

    const handleDirectionsReady = (result: any) => {
        dispatch(updateDistance(result.distance.toFixed(2)));
    };

    if (!origin || !pickup || !drop) {
        return <Text style={{ color: 'red' }}>Loading map...</Text>;
    }
    const mapRegion = getMapRegion(origin, pickup, drop);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={mapRegion}
                initialRegion={{
                    ...origin,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation
                showsCompass

            >
                <Marker coordinate={origin} title="Current Location">
                    <Image source={icons.Pin} style={[{
                        width: Screen.w * 0.06,
                        marginTop: Screen.h * 0.05,
                        marginLeft: Screen.w * 0.05,
                        height: Screen.h * 0.06,

                    }]} />

                </Marker>
                <Marker coordinate={pickup} title="Pickup Location">
                    {/* <Image source={icons.Pin1} style={[{
                        width: Screen.w * 0.06,
                        height: Screen.h * 0.06,

                    }]} /> */}

                </Marker>

                <Marker coordinate={drop} title="Drop Location" >
                    {/* <Image source={icons.Pin2} style={[{
                        width: Screen.w * 0.06,
                        height: Screen.h * 0.06,

                    }]} /> */}
                </Marker>

                {origin && pickup && status === "pickup" && (
                    // <MapViewDirections
                    //     origin={origin}
                    //     destination={pickup}
                    //     apikey={GoogleMapApiKey}
                    //     strokeWidth={3}
                    //     strokeColor="blue"
                    //     onReady={handleDirectionsReady}
                    // />
                    <></>
                )}
                {status === "pending" && (
                    // <MapViewDirections
                    //     origin={origin}
                    //     destination={pickup}
                    //     apikey={GoogleMapApiKey}
                    //     strokeWidth={3}
                    //     strokeColor="#fff"
                    //     onReady={handleDirectionsReady}
                    // />
                    <></>
                )}

                {status === "drop" && (
                    // <MapViewDirections
                    //     origin={origin}
                    //     destination={drop}
                    //     apikey={GoogleMapApiKey}
                    //     strokeWidth={3}
                    //     strokeColor="green"
                    //     onReady={handleDirectionsReady}
                    // />
                    <></>
                )}
            </MapView>

            {/* <PickUpDropComp /> */}
            <View style={styles.info}>
                <Text style={{
                    color: colors.primary, fontSize: 20, padding: 5,
                    fontFamily: Fonts.RB, textAlign: 'center'
                }}>{order_info?.DeliveryType || orderAccepted?.order_info?.DeliveryType ? 'Pickup & Drop Delivery' : 'Food Delivery'}</Text>
                {/* <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: '#4d4d4d', fontFamily: Fonts.RB, fontSize: 18 }}>Order ID : </Text>
                    <Text style={{
                        color: '#4d4d4d', fontSize: 18,
                        fontFamily: Fonts.RB
                    }}>{firstPart} <Text style={{
                        color: colors.primary,
                        fontSize: 20, fontWeight: 'bold'
                    }}>{lastFourDigits}</Text></Text>
                </View> */}

                {cancelOrder ?
                    <View style={{}}>
                        <Text style={styles.title}>Please Select the Reason to Reject This Order</Text>
                        <RadioButton.Group
                            onValueChange={(newValue) => setSelectedReason(newValue)}
                            value={selectedReason}
                        >
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <RadioButton value="It's very long"
                                    color={colors.primary}
                                />
                                <Text style={{ color: '#4d4d4d' }}>Its Very Long</Text>
                            </View><View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <RadioButton
                                    value="met at Accident/Injured"
                                    color={colors.primary} />
                                <Text style={{ color: '#4d4d4d' }}>met at Accident/Injured</Text>
                            </View><View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <RadioButton
                                    value="Vehicle Puncture/Problem "
                                    color={colors.primary} />
                                <Text style={{ color: '#4d4d4d' }}>Vehicle Puncture/Problem </Text>
                            </View>
                        </RadioButton.Group>
                        <TouchableOpacity onPress={() => handleCancel(0, OrderId, profile?.HomeeDBId)}>
                            <Text style={{
                                backgroundColor: colors.primary,
                                color: '#fff',
                                padding: 15,
                                borderRadius: 10,
                                textAlign: 'center'
                            }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    : <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Screen.w / 2, marginHorizontal: 5, marginVertical: 5, alignItems: 'center' }}>
                        <Image source={icons.mapspin} style={{}} />
                        <Text style={{ color: '#4d4d4d', paddingHorizontal: 10 }}>{distance} Km near to You</Text>
                    </View>}


                {status == 'pending' && (
                    <OrderPendingComp
                        restaurantInfo={restaurantInfo || pickup_info}
                        address_info={address_info || drop_info}
                        onpress={handleAccept}
                        OrderId={OrderId}
                        DBID={profile?.HomeeDBId} />
                )}

                {status === 'pickup' && (
                    <AddressDetails
                        title="Pickup Address"
                        locationName={orderAccepted?.restaurantInfo?.name || orderAccepted?.pickup_info?.name}
                        info={orderAccepted?.restaurantInfo?.pickupAddress || orderAccepted?.pickup_info?.pickupAddress}
                        buttonLabel="Arrived"
                        onPress={() => handleSumbit('Arrived')}
                        onChatPress={() => handleHelpPress('Arrived')}
                    />
                )}
                {status === 'drop' && (
                    <AddressDetails
                        title="Delivery Address"
                        locationName={orderAccepted?.address_info?.name || orderAccepted?.drop_info?.name}
                        info={orderAccepted?.address_info?.deliveryAddress || orderAccepted?.drop_info?.deliveryAddress}
                        buttonLabel="Delivered"
                        onPress={() => handleSumbit('Delivered')}
                        onChatPress={() => handleHelpPress('Delivered')}
                    />
                )}
                <OrderModel
                    isVisible={isConfirmVisible}
                    setIsVisible={setIsConfirmVisible}
                    options={[
                        { label: 'No', value: 'NO', color: 'red' },
                        { label: 'Yes', value: 'YES', color: 'green' },
                    ]}
                    onpress={handleDeliveryStatus}
                />

            </View>

        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    map: {
        flex: 1,
        maxHeight: Screen.h / 1.8,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,


    },
    info: {
        padding: 10,
        height: Screen.h / 3

    },
    button: {
        color: "red",
        backgroundColor: "#03894E",
        padding: 10,
        borderRadius: 5,
        textAlign: "center",
        marginTop: 10,
    },
    title: {
        color: '#4d4d4d',
        fontSize: 20


    },

});
