import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../services/url.constatant';
import { getDBProfile } from '../services/api.services';

export const ProfileContext = React.createContext(null);



export const GetProfileProvider = (props: any) => {
    const [profile, setProfile] = useState<any>();


    const getProfile = async () => {
        try {
            const res = await getDBProfile({ phoneNumber: '9843298432' });
            console.log("response from user get profile data===>", res);
            if (res.response[0]) {
                setProfile(res.response[0]);
            }

        } catch (err: any) {
            console.log("error from get profile", err);
            ToastAndroid.show('No-Vendors Found', ToastAndroid.SHORT)
        }
    }
    useEffect(() => {
        getProfile()
    }, [])
    return (
        <ProfileContext.Provider value={{
            profile, setProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )

}

export default GetProfileProvider

