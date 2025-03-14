import { StatusBar, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Opt from './Opt';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setMobileNumber } from '../../store/slices/ProfileSlice';
import { ActivityIndicator } from 'react-native-paper';


const Login = () => {

  const [showOtp, setshowOtp] = useState(false);
  const [verificationId, setVerificationId] = useState<any>();

  const [loader, setloader] = useState<any>(false);

  const Profile = useSelector((state: any) => state.profile)
  // console.log(Profile, 'hel');
  console.log(Profile?.mobile, 'liononononononono');
  const dispatch = useDispatch()


  const handleOtp = () => {
    console.log('hai');
    if (Profile?.mobile > 10) {
      setshowOtp(true)
    }
  }



  const sendVerification = async () => {
    if (Profile?.mobile?.length !== 10) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    
    try {
      setloader(true)
      const confirmation = await auth().signInWithPhoneNumber(`+91 ${Profile?.mobile}`, true);
      setVerificationId(confirmation.verificationId);
      if (confirmation) {
        setloader(false)
      }
      Alert.alert('Verification code sent to your phone.');
      setshowOtp(true);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send verification code.');
    }
  };



  return (
    <>
      <StatusBar backgroundColor='#03894E' barStyle="light-content" />
      {showOtp ? <Opt verificationId={verificationId} /> :
        <View style={styles.container}>
          <Image
            source={require('../../assets/LoginOtp.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Enter the Mobile Number</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              onChangeText={(M) => dispatch(setMobileNumber(M))}
              keyboardType="phone-pad"
              placeholder="Enter your mobile number"
              placeholderTextColor="#888"
              maxLength={10}/>
          </View>
          <TouchableOpacity style={styles.referButton}>
            <Text style={styles.refer}>I Have A Referal Code</Text>
          </TouchableOpacity>
          {loader ? (
            <ActivityIndicator color="#3894E" size="large" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={sendVerification}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          )}
        </View>}
    </>

  )
}

export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4d4d4d',
    marginBottom: 10,
    textAlign: 'center',
  },
  refer: {
    fontSize: 12,
    color: '#03894E',
    marginBottom: 30,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#03894E'

  },
  referButton: {
    alignSelf: 'flex-start',
    paddingLeft: 30

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#868686',
    width: '85%',
    marginBottom: 10,
  },
  countryCode: {
    fontSize: 16,
    color: '#868686',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#03894E',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '85%',


  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
