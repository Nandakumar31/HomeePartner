import { Alert, PermissionsAndroid, Platform } from "react-native";
import messaging from '@react-native-firebase/messaging';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch } from 'react-redux';
import { setCurrentLocation, setSignedLocation } from '../../store/slices/ProfileSlice';


export const requestLocationPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'App needs access to your location.',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
                return true;
            } else {
                console.log('Location permission denied');
                Alert.alert("Permission Denied", "Location access is required for the app to function properly.");
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error("Error requesting location permission:", error);
        return false;
    }
};



export const handleGetCurrentLocation = async (dispatch: any) => {
    try {
        const hasPermission = await requestLocationPermission();
        console.log("Has Permission:", hasPermission);
        if (!hasPermission) return;

        console.log('Fetching location...');

        Geolocation.getCurrentPosition(
            (position) => {
                if (!position?.coords) {
                    console.error("No coordinates returned");
                    return;
                }
                const { latitude, longitude } = position.coords;
                console.log("Location:", latitude, longitude);

                dispatch(setCurrentLocation({ latitude, longitude }));
                dispatch(setSignedLocation({ latitude, longitude }));
            },
            (error) => {
                console.error("Location error:", error);
                Alert.alert("Error", `Failed to get location: ${error.message}`);
            },
            {
                enableHighAccuracy: true,
                timeout: Platform.OS === 'android' ? 20000 : 15000,
                maximumAge: 5000
            }
        );
    } catch (error) {
        console.error("Unexpected error while fetching location:", error);
    }
};

export const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app needs access to your camera',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    return true; // iOS does not require manual permission handling
};

export const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission required', 'Please enable notification permission in settings.');
        }
    }
};


export const getFCMToken = async () => {
    try {
        await requestNotificationPermission();

        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            const token = await messaging().getToken();
            console.log('🔥 FCM Token:', token);
            return token;
        } else {
            console.warn('🚫 Notification permission not granted');
        }
    } catch (err) {
        console.error('❌ Error getting FCM token:', err);
    }
};