import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { useDispatch } from "react-redux";
import { setCompletedOrderCount, setorderAccepted, setOrderData, setOrderRejectedCount } from "../store/slices/OrderSlice";
import * as api from "../services/api.services";
import { acceptOrder, arriveAtPickup, setDropLocation, setPickupLocation } from "../store/slices/mapSlice";

export const useOrders = () => {
  const { profile }: any = useContext(ProfileContext);
  const dispatch = useDispatch();

  const getOrdersToAccept = async () => {
    try {
      // Check if the profile contains a valid ID
      if (!profile?.HomeeDBId) {
        console.error("Profile ID is missing");
        return;
      }
  
      const id = profile.HomeeDBId;
  
      // Fetch orders
      const response = await api.getOrdersRecived();
  
      if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
        console.log("Orders received:", response.data);
  
        // Dispatch order data
        dispatch(setOrderData(response.data));
  
        // Extract pickup and drop information
        const { latitude: lat, longitude: lon } =
          response.data[0]?.address_info || response.data[0]?.drop_info || {};
        const { latitude, longitude } =
          response.data[0]?.restaurantInfo || response.data[0]?.pickup_info || {};
  
        // Ensure latitude and longitude are valid numbers
        const lat1 = parseFloat(latitude) || 0;
        const lon1 = parseFloat(longitude) || 0;
        const lat2 = parseFloat(lat) || 0;
        const lon2 = parseFloat(lon) || 0;
  
        // Dispatch pickup and drop locations
        dispatch(setPickupLocation({ latitude: lat1, longitude: lon1 }));
        dispatch(setDropLocation({ latitude: lat2, longitude: lon2 }));
      } else {
        console.warn("No orders received");
        dispatch(setOrderData(null)); // Clear order data if no orders
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  

  const getAcceptedOrders = async () => {
    try {
      // Ensure deliveryBoyId is available
      const deliveryBoyId = profile?.HomeeDBId;
      if (!deliveryBoyId) {
        console.error("Delivery Boy ID is missing");
        return;
      }
  
      // Fetch accepted orders
      const response = await api.getAcceptedOrders(deliveryBoyId);
  
      if (!response?.data || !Array.isArray(response.data) || response.data.length === 0) {
        console.warn("No accepted orders found");
        dispatch(setorderAccepted([])); // Clear accepted orders in case of no data
        return;
      }
  
      console.log("Accepted Orders Response:", response.data);
  
      // Dispatch the accepted orders
      dispatch(setorderAccepted(response.data));
  
      // Extract required data
      const { deliveryBoyAssignedOrders: assignedOrders } = response.data[0] || {};
      const { latitude: dropLat, longitude: dropLon } =
        response.data[0]?.address_info || response.data[0]?.drop_info || {};
      const { latitude: pickupLat, longitude: pickupLon } =
        response.data[0]?.restaurantInfo || response.data[0]?.pickup_info || {};
  
      // Ensure latitude and longitude are valid numbers
      const lat1 = parseFloat(pickupLat) || 0;
      const lon1 = parseFloat(pickupLon) || 0;
      const lat2 = parseFloat(dropLat) || 0;
      const lon2 = parseFloat(dropLon) || 0;
  
      // Dispatch pickup and drop locations
      dispatch(setPickupLocation({ latitude: lat1, longitude: lon1 }));
      dispatch(setDropLocation({ latitude: lat2, longitude: lon2 }));
  
      console.log("Pickup and Drop Locations Set");
  
      // Check itemStatus and dispatch corresponding actions
      const itemStatus = assignedOrders?.itemStatus;
      console.log("Item Status:", itemStatus);
  
      if (itemStatus === "drop") {
        dispatch(arriveAtPickup(itemStatus));
      } else if (itemStatus) {
        dispatch(acceptOrder(itemStatus));
      } else {
        console.warn("Item Status is missing or invalid");
      }
    } catch (error) {
      console.error("Error fetching accepted orders:", error);
    }
  };
  


 

  const Orderhistory = async () => {
    try {
      const deliveryBoyId = profile?.HomeeDBId
      const response = await api.getOrderhistory(deliveryBoyId)
      console.log(response?.data, 'from -----OrderHistory------')
      dispatch(setCompletedOrderCount(response?.data[0]))
      dispatch(setOrderRejectedCount(response?.data[1]))
    } catch (error) {
      console.log(error)
    }
  }

  return { getOrdersToAccept, getAcceptedOrders, Orderhistory };
};
