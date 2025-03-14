import { ToastAndroid } from "react-native";
import { AppID } from "../constent/AppConstant/app.constants";
import { baseUrl } from "./url.constatant";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getUniqueId } from "react-native-device-info";
import DeviceInfo from 'react-native-device-info';

export const postRequestMethod = async (URL: string, requestData?: any) => {
    const token: any = await auth().currentUser?.getIdToken();
    const deviceId = await DeviceInfo.getDeviceId();
    console.log('token from postreqmethodfile ', token);
    console.log('url to postreqmethodfile', URL);
    console.log('url to decice id', deviceId);

    try {
        let response = await fetch(baseUrl + URL,
            {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    'AppID': AppID,
                    'sessiontoken': deviceId,
                },
                body: JSON.stringify(requestData ? requestData : {})
            })
        console.log("response from api", response);

        if (response.status == 403) {
            throw Error("Forbidden");
        } else if (response.status === 404) {
            console.log('multi-login detect');

        }
        else if (response.status === 204) {
            console.log(response);
            return true;
        }
        else {
            let json = await response.json();
            console.log("response", response);
            return json;
        }
    } catch (err: any) {
        ToastAndroid.show(err.toString(), 1000);
        // console.log(err, 'from get profile');

    }
}


export const postFormData = async (URL: string, requestData?: any) => {
    const token: any = await auth().currentUser?.getIdToken();
    console.log('token from postreqmethodfile ', token);
    console.log('url to postreqmethodfile', URL);
    const deviceId = await DeviceInfo.getDeviceId();

    try {
        let response = await fetch(baseUrl + URL,
            {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token,
                    'AppID': AppID,
                    'sessiontoken': deviceId,
                },
                body: JSON.stringify(requestData ? requestData : {})
            })
        console.log("response from api", response);

        if (response.status == 403) {
            throw Error("Forbidden");
        } else if (response.status === 204) {
            console.log(response);
            return true;
        }
        else {
            let json = await response.json();
            console.log("response", response);
            return json;
        }
    } catch (err: any) {
        ToastAndroid.show(err.toString(), 1000);
    }
}

export const postRequestWithoutBody = async (URL: string) => {
    const token: any = await auth().currentUser?.getIdToken();
    const deviceId = await DeviceInfo.getDeviceId();
    let response = await fetch(baseUrl + URL,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'AppID': AppID,
                'sessiontoken': deviceId,
            },
        })
    if (response.status == 403) {
        console.log(response);
        throw Error("Forbidden");
    } else if (response.status === 204) {
        console.log(response);

        return true;
    }
    else {
        let json = await response.json();
        return json;
    }
}

export const getRequestMethod = async (URL: string) => {
    const token: any = await auth().currentUser?.getIdToken();
    const deviceId = await DeviceInfo.getDeviceId();
    let response = await fetch(baseUrl + URL,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'AppID': AppID,
                'sessiontoken': deviceId,
            }
        })
    console.log("ranjith token", baseUrl + URL);
    if (response.status == 403) {
        throw Error("Forbidden");
    } else {
        let json = await response.json();
        console.log("response", response);
        return json;
    }
}

export const putRequestMethod = async (URL: string, requestData: any) => {
    const token: any = await auth().currentUser?.getIdToken();
    let response = await fetch(baseUrl + URL,
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'AppID': AppID
            },
            body: JSON.stringify(requestData)
        })

    if (response.status == 403) {
        throw Error("Forbidden");
    } else if (response.status == 204) {
        console.log(response);
        return true;
    }
    else {
        let json = await response.json();
        console.log("response", response);
        return json;
    }
}

export const deleteRequestMethod = async (URL: string) => {
    const token: any = await auth().currentUser?.getIdToken();
    let response = await fetch(baseUrl + URL,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'AppID': AppID
            }
        })
    if (response.status == 403) {
        throw Error("Forbidden");
    } else {
        let json = await response.json();
        console.log("response", response);
        return json;
    }
} 