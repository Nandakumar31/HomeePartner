import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'react-native-fs';

const initialState = {
    profileImageUri: '',
    name: '',
    mobile: '',
    mailId: '',
    aadharCardFront: '',
    aadharCardBack: '',
    drivingLicenseFront: '',
    drivingLicenseBack: '',
    profileStatus: false,
    currentLocation:''


}

const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setprofileImageUri: (state, action) => {
            state.profileImageUri = action.payload
        },
        setprofileStatus: (state, action) => {
            state.profileStatus = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setMobileNumber: (state, action) => {
            state.mobile = action.payload
        },
        setMailId: (state, action) => {
            state.mailId = action.payload
        },
        setAdharCardFront: (state, action) => {
            state.aadharCardFront = action.payload
        },
        setAdharCardBack: (state, action) => {
            state.aadharCardBack = action.payload
        },
        setDrivingLicenseFront: (state, action) => {
            state.drivingLicenseFront = action.payload
        },
        setDrivingLicenseBack: (state, action) => {
            state.drivingLicenseBack = action.payload
        },
        setCurrentLocation:(state,action)=>{
            state.currentLocation = action.payload
        }
       
    }
});

export const {
    setprofileImageUri,
    setprofileStatus,
    setMobileNumber,
    setName,
    setMailId,
    setAdharCardFront,
    setAdharCardBack,
    setDrivingLicenseFront,
    setDrivingLicenseBack,
    setCurrentLocation,
} = ProfileSlice.actions;
export default ProfileSlice.reducer