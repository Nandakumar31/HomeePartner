import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SliderSwitch from '../components/SliderSwitch';
import { useOrders } from '../hooks/OrdersApis'
import { useStatusApis } from '../hooks/StatusApi'
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import DeliveryBoyGif from '../assets/Animation/Animation - 1730100581366.json'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { formatTime } from '../utils/helper/Ordersutills';
import { handleGetCurrentLocation } from '../utils/Permissions/requestLocationPermission';
import Delivered from '../assets/Animation/Animation - 1730096842832.json'
import colors from '../utils/color';
import { Fonts } from '../constent/Themes';
import { setOrderDelivered } from '../store/slices/OrderSlice';
import MapScreen from './MapScreen';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../context/ProfileContext';
// import { getDocAndActiveHours } from '../services/api.services';





const DashBoardScreen = () => {

    // const [activeHours, setActiveHours] = useState(0)
    const [completedOrders, setCompletedOrders] = useState(45);
    const { isOnline, activeHours } = useSelector((state: any) => state.other);
    const { getOrdersToAccept, getAcceptedOrders, Orderhistory } = useOrders()
    const { fetchStatus, handleToggleSwitch, getDocAndActiveHour } = useStatusApis()
    const dispatch = useDispatch()
    const order = useSelector((state: any) => state.order);
    const navigation = useNavigation()
    const { profile }: any = useContext(ProfileContext)
    const [refresh, setrefresh] = useState(false)
    // console.log(order,  'fromPAi');



    const handleRewards = () => {
        setrefresh(true)
    }
    const handleMenu = () => {
        navigation.openDrawer()
        console.log('pressing Menu');

    }

    console.log(activeHours, 'acattaatatat');




    useEffect(() => {
        fetchStatus()
        getOrdersToAccept()
        getAcceptedOrders()
        Orderhistory()
        if (order?.orderDelivered) {
            const timer = setTimeout(() => {
                dispatch(setOrderDelivered(false));
            }, 4000);
            return () => clearTimeout(timer);
        }

    }, [order?.orderDelivered, refresh, isOnline]);
    return (

        <>
            {order?.orderDelivered ? <View style={{ flex: 1, backgroundColor: colors.primary, justifyContent: 'center' }}>
                <LottieView
                    source={Delivered}
                    autoPlay
                    loop
                    style={{ width: 200, height: 200, marginHorizontal: 85 }}
                />
                <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: Fonts.RB, color: '#fff' }}>Delivery Completed Sucessfully</Text>
            </View> :
                <>
                    {order?.OrderData?.length > 0 || order?.orderAccepted?.length > 0 ? <View style={{ flex: 1 }}>
                        <MapScreen />
                    </View> :
                        <View>
                            <View style={styles.headerTab}>
                                <SliderSwitch setIsOnline={handleToggleSwitch} isOnline={isOnline} />

                                <TouchableOpacity style={styles.menuButton} onPress={() => handleMenu()}>
                                    <Ionicons name='menu' style={{ marginRight: 10 }} size={35} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.innerhead}>Homee Partner</Text>
                                <Text style={styles.innerText}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est cumque, aliquid officiis consectetur provident</Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <LottieView
                                        source={DeliveryBoyGif}
                                        autoPlay
                                        loop
                                        style={{ width: 200, height: 250 }}
                                    />
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'center', color: '#666' }}>1.lodsjfjkasdfjasdff</Text>
                                        <Text style={{ textAlign: 'center', color: '#666' }}>1.lodsjfjkasdfjasdff</Text>
                                        <Text style={{ textAlign: 'center', color: '#666' }}>1.lodsjfjkasdfjasdff</Text>
                                    </View>
                                </View>
                                {/* <ActiveHours userId="user123" isOnline={isOnline} setIsOnline={setIsOnline} /> */}

                            </View>
                            <View style={styles.subCont}>
                                <View style={{ paddingTop: 30, paddingHorizontal: 10 }}>
                                    <TouchableOpacity onPress={handleRewards}>
                                        <View style={{ paddingVertical: 10, paddingHorizontal: 15, borderWidth: 1, borderRadius: 10, backgroundColor: '#F3DAEF' }}>
                                            <Text style={{ textAlign: 'center', marginBottom: 10, color: '#666', fontWeight: 'bold' }}>Achievements</Text>
                                            {ordersData.map((order, index) => (
                                                <View key={order.id} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <View
                                                            style={{
                                                                borderWidth: 1,
                                                                borderColor: '#03894E',
                                                                borderRadius: 50,
                                                                width: 20,
                                                                height: 20,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                backgroundColor: order.isComplete ? '#03894E' : '#fff',
                                                            }}
                                                        />
                                                        {index < ordersData.length - 1 && (
                                                            <View
                                                                style={{
                                                                    width: 2,
                                                                    height: 40,
                                                                    backgroundColor: ordersData[index + 1].isComplete ? '#03894E' : '#ccc',
                                                                    marginVertical: 5,
                                                                }}
                                                            />
                                                        )}
                                                    </View>
                                                    <View style={{ paddingHorizontal: 10, }}>
                                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#666' }}>{order.count}</Text>
                                                        <Text style={{ fontSize: 12, color: '#666' }}>{order.status}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{
                                        marginHorizontal: 15, backgroundColor: '#D1F0DE', marginTop: 10,
                                        paddingHorizontal: 15, borderWidth: 1, borderRadius: 10
                                    }}>
                                        <TouchableOpacity onPress={getDocAndActiveHour}>
                                            <Text style={{ textAlign: 'center', color: '#666' }}>Active Hours</Text>
                                        </TouchableOpacity>
                                        {/* <Text style={{ textAlign: 'center', fontSize: 40, color: '#666' }}>{formatTime(activeHours)}</Text> */}
                                    </View>
                                </View>
                                <View style={{ marginTop: 40, }}>
                                    <View style={{
                                        marginVertical: 10,
                                        backgroundColor: '#D1F0DE', borderWidth: 1, borderRadius: 10
                                    }}>
                                        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                                            <TouchableOpacity>
                                                <FontAwesome name='signal' style={{ marginRight: 10, }} color='#0FA958' size={35} />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Ionicons name='navigate' style={{ marginRight: 10, }} color='#0180FE' size={35} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleGetCurrentLocation(dispatch)}>
                                                <FontAwesome name='crosshairs' style={{ marginRight: 10, }} color='black' size={35} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ marginHorizontal: 5, marginVertical: 15, paddingHorizontal: 15, backgroundColor: '#CBD9F6', borderWidth: 1, borderRadius: 10 }}>
                                        <Text style={{ textAlign: 'center', padding: 10, color: '#666' }}>Completed Orders</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: '#666'
                                            }}>00<Text style={{
                                                textAlign: 'center',
                                                fontSize: 40
                                            }}>{order?.completedOrderCount}</Text></Text>
                                        </View>
                                    </View>
                                    <View style={{ marginHorizontal: 5, marginVertical: 20, paddingHorizontal: 15, backgroundColor: '#F9DBC5', borderWidth: 1, borderRadius: 10 }}>
                                        <Text style={{ textAlign: 'center', padding: 2, color: '#666' }}>Homee Partner</Text>
                                        <Text style={{ textAlign: 'center', padding: 5, fontWeight: 'bold', fontSize: 20, color: '#666' }}>{profile?.HomeeDBId}</Text>

                                    </View>


                                </View>


                            </View>
                        </View>

                    }
                </>

            }



        </>


    )
}

export default DashBoardScreen


const styles = StyleSheet.create({
    circle: {
        borderWidth: 1,
        borderColor: '#03894E',
        borderRadius: 50,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    menuButton: {
        marginTop: 10,
        marginRight: 10
    },
    line: {
        width: 5,
        height: 50,
        marginLeft: 7,
        backgroundColor: 'green',
    },
    ordercount: {
        paddingHorizontal: 10
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    subCont: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        borderTopLeftRadius: 50,
        borderWidth: 0.5,
        paddingHorizontal: 10,
        borderTopRightRadius: 50,
        height: '100%'

    },
    innerCont: {
        // width: '90%',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        justifyContent: 'space-between'
    },
    innerhead: {
        textAlign: 'center',
        fontFamily: 'PassionsConflict-Regular',
        fontSize: 60,
        color: '#4d4d4d'

    },
    innerText: {
        color: 'black',
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        marginHorizontal: 15
    },
    // ??
    headerTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#03894E',
        borderColor: '#fff',
        borderTopWidth: 1,

    },
});


const ordersData = [
    { id: 1, count: '03 Orders', status: 'You Completed', isComplete: true },
    { id: 2, count: '05 Orders', status: 'In Progress', isComplete: false },
    { id: 3, count: '02 Orders', status: 'Pending', isComplete: false },
];