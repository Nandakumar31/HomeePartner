import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Fonts, Screen } from '../constent/Themes'
import colors from '../utils/color'
import { extractOrderParts } from '../utils/helper/Ordersutills'
import { useSelector } from 'react-redux'
import OrderPendingComp from '../components/OrderComponents/OrderPendingComp'
import { ProfileContext } from '../context/ProfileContext'

const PickUpDropComp = () => {

  const { origin, pickup, drop, status, distance } = useSelector(
    (state: any) => state.map
  );
  const { profile }: any = useContext(ProfileContext)

  const order = useSelector((state: any) => state.order);
  const orderAccepted = useSelector((state: any) => state.order?.orderAccepted?.[0] ?? null);

  const orderData = order?.OrderData?.[0] ?? {};
  const { OrderId, drop_info, pickup_info } = orderData;

  const { firstPart, lastFourDigits } = extractOrderParts(
    order.OrderData[0]?.OrderId || orderAccepted?.OrderId
  );

  const handleAccept = () => {
    console.log('accept order')
  }

  return (
    <View style={styles.info}>
      <Text style={{
        color: colors.primary, fontSize: 20, padding: 5,
        fontFamily: Fonts.RB, textAlign: 'center'
      }}>PickUp & Drop Delivery</Text>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text style={{ color: '#4d4d4d', fontFamily: Fonts.RB, fontSize: 18 }}>Order ID : </Text>
        <Text style={{
          color: '#4d4d4d', fontSize: 18,
          fontFamily: Fonts.RB
        }}>{firstPart} <Text style={{
          color: colors.primary,
          fontSize: 20, fontWeight: 'bold'
        }}>{lastFourDigits}</Text></Text>
      </View>
      {status == 'pending' && (
        <OrderPendingComp
          restaurantInfo={pickup_info}
          address_info={drop_info}
          onpress={handleAccept}
          OrderId={OrderId}
          DBID={profile?.HomeeDBId} />
      )}
    </View>
  )
}

export default PickUpDropComp

const styles = StyleSheet.create({
  info: {
    padding: 10,
    height: Screen.h / 3

  },
})