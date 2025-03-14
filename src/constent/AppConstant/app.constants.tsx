import { Platform } from "react-native";


export const timeOut = 300000; /* ms, *0 - no timeout */

export const NumericRegex = /^([0-9]{0,100})+$/;

export const AppID = "HomeeUser"

export const PUSH_NOTIFICATION_CHANNEL_ID = "paleo_customer_notification_channel_id";

export const refreshIdToken = "Bearer Token";

export const PALEO_CUSTOMER_TOKEN = "@PA_CR_TK_01";

export const PALEO_FIREBASE_CUSTOMER_TOKEN = "@PA_FB_CR_TK_01";

export const GoogleMapApiKey = "AIzaSyCht01saKwMC5yFOI5VWOEVAB-HxaPSnwY";

export const TimeOut = Platform.OS === "ios" ? 200 : 0;

export const EmailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;