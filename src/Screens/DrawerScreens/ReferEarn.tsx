import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Topnavigation from '../../utils/Topnavigation'
import { Image } from 'react-native'
import coinemoj from '../../assets/coinemoj.png'

const { width, height } = Dimensions.get('screen')

const ReferEarn = () => {
  return (
    <View>
      <Topnavigation label='Refer & Earn' />
      <View style={styles.maincontainer}>
        <Text style={styles.innercontainerText}>Refer Your Friends And Earn</Text>
        <Text style={styles.innercontainerText1}>Lorem ipsum dolor sit amet consectetur adipisici Lorem ipsum dolor
          sit amet consectetur adipisici Lorem ipsum dolor sit amet consectetur adipisici?</Text>
        <View style={styles.Emoj}>
          <Image source={coinemoj} />
        </View>
        <View style={styles.reffercontainer}>
          <View>
            <Text style={styles.copy}>ADHIASHIAHAI</Text>
          </View>
          <TouchableOpacity style={styles.copytext}>
            <Text style={styles.copy}>Tap To Copy</Text>
            <Text>[]</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.referText}>Your Referal Code</Text>
        <TouchableOpacity>
          <Text style={styles.invite}>Invite Via</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ReferEarn

const styles = StyleSheet.create({
  copy: {
    paddingHorizontal: 10
  },
  invite: {

    padding: 15,
    marginHorizontal: width / 7,
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: '#03894E',
    color: '#fff'
  },
  referText: {
    textAlign: 'center',
    marginVertical: 10
  },

  reffercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 15,
    borderRadius: 20,
    marginHorizontal: width / 15,
    marginTop: height / 7
  },
  copytext: {
    flexDirection: 'row'
  },
  maincontainer: {
    backgroundColor: '#03894E',
    width: width / 1,
    height: height / 2.2,
    borderBottomLeftRadius: width / 0.5,
    borderBottomRightRadius: width / 0.5,
  },
  innercontainerText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25
  },
  Emoj: {
    marginHorizontal: 75,
    marginTop: 30
  },
  innercontainerText1: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    width: 300,
    marginHorizontal: 50

  }
})