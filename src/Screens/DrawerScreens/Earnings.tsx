import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Topnavigation from '../../utils/Topnavigation'
import TotalOrdersHistory from '../../components/TotalOrdersHistory'

const Earnings = () => {
  return (
    <View>
      <Topnavigation label='My Earnings' />
      <TotalOrdersHistory/>
    </View>
  )
}

export default Earnings

const styles = StyleSheet.create({})