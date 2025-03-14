import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Topnavigation from '../../utils/Topnavigation'

const { width, height } = Dimensions.get('screen')
const Support = () => {
  return (
    <View>
      <Topnavigation label='Support' />
      <View style={styles.container}>
        <Image source={require('../../assets/support-image.png')} style={{ width: 300, height: 180, alignSelf: 'center' }} resizeMode='contain' />
        <Text style={styles.txt1}>Feel free to Get In Toch With Us</Text>
        <Text style={styles.txt1}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          ut omnis nam ducimus totam aspernatur placeat quis eveniet, dolores cumque sed aut! Rem, nam. Blanditiis.</Text>

        <View style={styles.subcont}>
          <TouchableOpacity>
            <Image source={require('../../assets/call.png')}
             style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/gmail.png')} style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/chat.png')} style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Support

const styles = StyleSheet.create({
  container: {
    marginTop: height / 8,
    alignSelf: 'center',
    marginHorizontal: 40
  },
  txt1: {
    textAlign: 'center',
  },
  subcont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  }
})