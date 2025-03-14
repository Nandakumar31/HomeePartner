import { Alert, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import OtpInput from '../../components/OtpInputCom';
import ResendTimer from '../../components/Timer&ResendButtonComp';
import ProfileRegistration from './ProfileRegistration';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { ProfileContext } from '../../context/ProfileContext';
import { setVerification } from '../../store/slices/AccountSlice';
import { useDispatch, useSelector } from 'react-redux';

const Opt = ({ verificationId }: any) => {

    const navigation = useNavigation()

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [profileScreen, setProfileScreen] = useState(false);
    const [verifyStatus, setVerifyStatus] = useState<any>(false)
    const inputs = useRef([]);
    console.log(verificationId, 'chec');
    const { profile }: any = useContext(ProfileContext);

    const { verification } = useSelector((state: any) => state.Account)
    console.log(verification, 'cheh');

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
            const credential = auth.PhoneAuthProvider.credential(verificationId, otpString);
            const user = await auth().signInWithCredential(credential);
            console.log('User verified:', user?.additionalUserInfo?.isNewUser);

            setVerifyStatus(true);

            const isNewUser = user?.additionalUserInfo?.isNewUser;

            if (isNewUser) {
                if (profile?.profileStatus) { 
                    navigation.navigate('Drawer');
                } else {
                    setProfileScreen(true);  
                }
            } else {
                if (!profile) {
                    setProfileScreen(true);  
                } else {
                    navigation.navigate('Verification');  
                }
            }
            
            

            console.log('After verification');

        } catch (error) {
            console.error("OTP Verification Error:", error);
            Alert.alert("OTP verification failed. Please try again.");
        }
    };

    const resendOtp = () => {
        setTimer(60);
        setIsResendEnabled(false);

    };

    // useEffect(() => {
    //     let interval: any = null;
    //     if (timer > 0) {
    //         interval = setInterval(() => {
    //             setTimer((prevTimer) => prevTimer - 1);
    //         }, 1000);
    //     } else {
    //         setIsResendEnabled(true);
    //     }
    //     { verifyStatus && clearInterval(interval) }
    //     return () => clearInterval(interval);
    // }, [timer]);
    return (
        <>
            <StatusBar backgroundColor='#03894E' barStyle="light-content" />
            {profileScreen ? <ProfileRegistration /> : <View style={styles.container}>
                <Image
                    source={require('../../assets/Otp.png')}
                    style={styles.image}
                />
                <Text style={styles.title}>Enter the 6-digit Verification Code Sent To Your Phone Number</Text>
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <OtpInput
                            key={index}
                            ref={(ref) => (inputs.current[index] = ref)}
                            value={digit}
                            onChangeText={(text: any) => handleChange(text, index)}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.button} onPress={verifyOtp}>
                    <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
                <ResendTimer
                    timer={timer}
                    isResendEnabled={isResendEnabled}
                    onResend={resendOtp}
                />
            </View>}
        </>
    )
}

export default Opt
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
        fontSize: 15,
        fontWeight: 'bold',
        color: '#4d4d4d',
        marginBottom: 20,
        textAlign: 'center',
        width: '80%'
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#03894E',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '85%',
        // maxWidth: 400,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});