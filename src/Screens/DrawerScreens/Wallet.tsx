import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Topnavigation from '../../utils/Topnavigation'

const Wallet = () => {
  return (
    <View>
      <Topnavigation label='Wallet' />
      <View style={styles.maincontainer}>
        <Image source={require('../../assets/WC.png')} style={styles.image} />
        <View style={styles.subcont}>
          <Image source={require('../../assets/HLOgo.png')} style={styles.Logo} />
          <Image source={require('../../assets/takemoney.png')} style={styles.takemoney} />
        </View>
        <View style={styles.innerSub}>
          <View style={styles.sub1}>
            <Text style={styles.textColor}>NandaKumar R</Text>
            <Text style={styles.textColor}>ID No: 123456789</Text>
          </View>
          <View style={styles.sub2}>
            <Text style={styles.textColor}>₹ 65354543</Text>
            <Text style={styles.textColor}>Your Earnings</Text>
          </View>
        </View>
        <View style={styles.innerSub1}>
          <Text style={styles.innertext}>You Can Withdraw Your Amount to Your Account</Text>
          <TouchableOpacity>
            <Text style={styles.withdrawtext}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Wallet

const styles = StyleSheet.create({
  image: {
    // width: 150,
    // height: 150,
  },
  withdrawtext: {
    padding:10,
    color:'#fff',
    backgroundColor: '#03894E',
    textAlign:'center',
    borderRadius:5,
    marginTop:10
  },
  innertext: {
    color: '#4d4d4d',
    textAlign: 'center',
    width: 220,
    fontWeight: 'bold',
    marginTop: 10
  },
  textColor: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  sub1: {
    marginHorizontal: 50
  },
  sub2: {
    marginHorizontal: 40
  },
  innerSub1: {
    justifyContent: 'center',


  },
  innerSub: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 100,
  },
  maincontainer: {
    alignItems: 'center',
    marginTop: 10
  },
  takemoney: {
    marginHorizontal: 75,
    marginTop: 20


  },
  subcont: {
    marginTop: 15,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between'
  },

  Logo: {
    marginHorizontal: 70,

  }
})