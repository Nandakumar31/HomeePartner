import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    vehicleType: '',
    vehicleAvailable: ['Bike', 'Auto', 'Van'],
    vehicleName: '',
    vehicleNumber: '',
    vehicleRcFrontSide: '',
    vehicleRcBackSide: '',
    vehicleInsuranceFrontSide: '',
    vehicleInsuranceBackSide: '',
    vehicleInsuranceExpiredate: null

}
const VehicleSlice = createSlice({
    name: 'Vehicle',
    initialState,
    reducers: {
        setVehicleType(state, action) {
            state.vehicleType = action.payload;
        },
        setVehicleName(state, action) {
            state.vehicleName = action.payload;
        },
        setVehicleAvailable: (state, action) => {
            state.vehicleAvailable.push(action.payload)
        },
        setVehicleNumber(state, action) {
            state.vehicleNumber = action.payload;
        },
        setVehicleRcFrontSide(state, action) {
            state.vehicleRcFrontSide = action.payload;
        },
        setVehicleRcBackSide(state, action) {
            state.vehicleRcBackSide = action.payload;
        },
        setVehicleInsuranceFrontSide(state, action) {
            state.vehicleInsuranceFrontSide = action.payload;
        },
        setVehicleInsuranceBackSide(state, action) {
            state.vehicleInsuranceBackSide = action.payload;
        },
        setVehicleInsuranceExpiredate(state, action) {
            state.vehicleInsuranceExpiredate = action.payload;
        },

    }
})


export const {
    setVehicleType,
    setVehicleName,
    setVehicleAvailable,
    setVehicleNumber,
    setVehicleRcFrontSide,
    setVehicleRcBackSide,
    setVehicleInsuranceFrontSide,
    setVehicleInsuranceBackSide,
    setVehicleInsuranceExpiredate

} = VehicleSlice.actions;
export default VehicleSlice.reducer