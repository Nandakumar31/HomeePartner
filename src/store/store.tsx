import { configureStore } from '@reduxjs/toolkit';
import ProfileSlice from './slices/ProfileSlice'
import OrderSlice from './slices/OrderSlice'
import VehicleSlice from './slices/vehicleSlice'
import AccountSlice from './slices/AccountSlice'
import OtherSlices from './slices/OtherSlices'
import mapReducer from './slices/mapSlice'

const store = configureStore({
    reducer: {
        profile: ProfileSlice,
        Vehicle: VehicleSlice,
        Account: AccountSlice,
        order: OrderSlice,
        other: OtherSlices,
        map: mapReducer,
    },
});

export default store;
