import { createSlice } from '@reduxjs/toolkit';
import OrderSample from '../../sampleData/OrderSample.json'



const initialState = {
    orderAccepted: [],
    orderRejected: false,
    orderAddressStatus: false,
    OrderData: [],
    orderPicked: false,
    startLocation: OrderSample.restaurant.address.location,
    endLocation: OrderSample.customer.delivery_address.location,
    orderStatus: [],
    orderDelivered: false,
    orderFrom:'',
    orderTo:'',
    completedOrderCount:'',
    OrderRejectedCount:""


}

const OrderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        setorderAccepted: (state, action) => {
            state.orderAccepted = action.payload
        },
        setorderRejected: (state, action) => {
            state.orderRejected = action.payload
        },
        setOrderAddressStatus: (state, action) => {
            state.orderAddressStatus = action.payload
        },
        setOrderData: (state, action) => {
            state.OrderData = action.payload
        },
        setStartLocation: (state, action) => {
            state.startLocation = action.payload
        },
        setEndLocation: (state, action) => {
            state.endLocation = action.payload
        },
        setOrderPicked: (state, action) => {
            state.orderPicked = action.payload
        },
        setOrderStatus: (state, action) => {
            state.orderStatus = action.payload
        },
        setOrderDelivered: (state, action) => {
            state.orderDelivered = action.payload
        },
        setOrderFrom:(state,action)=>{
            state.orderFrom=action.payload
        },
        setOrderTo:(state,action)=>{
            state.orderTo=action.payload
        },
        setCompletedOrderCount:(state,action)=>{
            state.completedOrderCount=action.payload
        },
        setOrderRejectedCount:(state,action)=>{
            state.OrderRejectedCount=action.payload
        }



    }
});

export const {
    setorderAccepted,
    setorderRejected,
    setOrderAddressStatus,
    setOrderData,
    setStartLocation,
    setEndLocation,
    setOrderPicked,
    setOrderStatus,
    setOrderDelivered,
    setOrderFrom,
    setOrderTo,
    setCompletedOrderCount,
    setOrderRejectedCount
    

} = OrderSlice.actions;
export default OrderSlice.reducer