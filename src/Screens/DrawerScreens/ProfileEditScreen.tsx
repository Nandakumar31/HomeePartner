import { BackHandler, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Topnavigation from '../../utils/Topnavigation'
import colors from '../../utils/color'
import { Screen } from '../../constent/Themes'
import { ProfileContext } from '../../context/ProfileContext'
import WebView from 'react-native-webview'

const ProfileEditScreen = () => {
    const { profile }: any = useContext(ProfileContext)
    const [docView, setDocView] = useState<string | null>(null)
    const [fileView, setFileView] = useState(false)

    const data = [
        { id: 0, name: 'Aadhaar Card' },
        { id: 1, name: 'Vehicle RC Book' },
        { id: 2, name: 'Driving License' },
        { id: 3, name: 'Vehicle Insurance' },
    ]

    const handleView = (id: number) => {
        switch (id) {
            case 0:
                setDocView(profile?.aadharCardFront)
                break
            case 1:
                setDocView(profile?.vehicleRCBook)
                break
            case 2:
                setDocView(profile?.drivingLicenseFront)
                break
            case 3:
                setDocView(profile?.vehicleInsurance)
                break
            default:
                setDocView(null)
        }
        setFileView(true)
    }

    useEffect(() => {
        const backAction = () => {
            if (fileView) {
                setFileView(false)
                return true
            }
            return false
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

        return () => backHandler.remove()
    }, [fileView])

    return (
        <>
            {fileView ? (
                <View style={{ flex: 1 }}>               
                    <Image
                        source={{ uri: docView || 'https://example.com/default-placeholder.png' }}
                        style={{ width: '80%', height: '80%', marginHorizontal: '10%', marginVertical: '10%' }}
                    />
                </View>
            ) : (
                <ScrollView>
                    <Topnavigation label='Profile' />
                    <View style={styles.container}>
                        <View style={styles.Innercontainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={{ uri: profile?.profileImageUri || 'https://example.com/default-placeholder.png' }}
                                    style={{ width: 80, height: 80, borderRadius: 50 }}
                                />
                                <View style={{ marginHorizontal: 20 }}>
                                    <Text style={{ color: '#4d4d4d' }}>{profile?.name}</Text>
                                    <Text style={{ color: '#4d4d4d' }}>ID No: {profile?.HomeeDBId}</Text>
                                    <Text style={{ color: '#4d4d4d' }}>Mobile Number</Text>
                                    <Text style={{ color: '#4d4d4d' }}>+91 {profile?.mobile}</Text>
                                </View>
                            </View>
                            <View style={{ borderBottomWidth: 1, borderTopWidth: 1, marginVertical: 10 }}>
                                <Text style={{ color: '#4d4d4d', paddingVertical: 10 }}>Driving License Number</Text>
                            </View>
                            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40 }}>
                                <View>
                                    <Text style={{ color: '#4d4d4d', textAlign: 'center' }}>215</Text>
                                    <Text style={{ color: '#4d4d4d' }}>Orders</Text>
                                </View>
                                <View>
                                    <Text style={{ color: '#4d4d4d', textAlign: 'center' }}>70</Text>
                                    <Text style={{ color: '#4d4d4d' }}>KM</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 50, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40 }}>
                                <View>
                                    <Text style={{ color: '#4d4d4d', textAlign: 'center' }}>215</Text>
                                    <Text style={{ color: '#4d4d4d' }}>Login Hours</Text>
                                </View>
                                <View>
                                    <Text style={{ color: '#4d4d4d', textAlign: 'center' }}>4.5</Text>
                                    <Text style={{ color: '#4d4d4d' }}>Rating</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {data.map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => handleView(item.id)}>
                            <View style={styles.docContainer}>
                                <Text style={{ color: colors.primary }}>{item.name}</Text>
                                <Text style={{ color: colors.primary }}>{'>'}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity>
                        <Text style={styles.logoutText}>LogOut</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        height: Screen.h / 2,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    Innercontainer: {
        width: Screen.w / 1.2,
        height: Screen.h / 2.4,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    docContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        paddingVertical: 20,
        marginVertical: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderRadius: 10
    },
    logoutText: {
        marginHorizontal: 100,
        marginVertical: 10,
        color: 'red',
        textAlign: 'center',
        padding: 20,
        borderWidth: 2,
        borderColor: 'red'
    }
})

export default ProfileEditScreen
