import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    origin: null,
    pickup: null,
    drop: null,
    status: "pending", 
    distance: 0,
  },
  reducers: {
    setCurrentLocation(state, action) {
      state.origin = action.payload;
    },
    setPickupLocation(state, action) {
      state.pickup = action.payload;
    },
    setDropLocation(state, action) {
      state.drop = action.payload;
    },
    acceptOrder(state) {
      state.status = "pickup";
    },
    arriveAtPickup(state) {
      state.status = "drop";
      state.origin = state.pickup; 
    },
    completeDrop(state) {
      state.status = "completed";
      state.origin = null; 
      state.pickup = null;
      state.drop = null;
      state.distance = 0;
    },
    updateDistance(state, action) {
      state.distance = action.payload;
    },
  },
});

export const {
  setCurrentLocation,
  setPickupLocation,
  setDropLocation,
  acceptOrder,
  arriveAtPickup,
  completeDrop,
  updateDistance,
} = mapSlice.actions;

export default mapSlice.reducer;
