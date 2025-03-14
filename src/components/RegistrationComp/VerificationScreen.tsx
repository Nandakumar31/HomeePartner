import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LottieView from 'lottie-react-native'
import verifyscreen from '../../assets/Animation/Animation - 1730721228591.json'
import { useSelector } from "react-redux"
import { setProfile } from "../../services/api.services"

const VerificationScreen = () => {

    const Profile = useSelector((state: any) => state.profile)
    const Vehicle = useSelector((state: any) => state.Vehicle)
    const Account = useSelector((state: any) => state.Account)



    const handleDashboard = async () => {
        const data = { Profile, Vehicle, Account }
        await setProfile(data)
    }
    return (
        <>
            <View style={styles.container}>
                <LottieView
                    source={verifyscreen}
                    autoPlay
                    loop
                    style={{ width: 250, height: 200 }}
                />
                <TouchableOpacity onPress={handleDashboard}>
                    <Text style={{ color: 'red', textAlign: 'center' }}>Profile Submitted Successfully.. Verificaton Pending! See You Soon</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}


export default VerificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',

    },
})