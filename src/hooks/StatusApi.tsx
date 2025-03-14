import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../services/api.services";
import { ProfileContext } from "../context/ProfileContext";
import { setActiveHours, setDocuments, setOnline } from "../store/slices/OtherSlices";

export const useStatusApis = () => {
  const { profile }: any = useContext(ProfileContext);
  const { currentLocation } = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const id = profile.HomeeDBId;

  const fetchStatus = async () => {
    try {
      if (!profile?.HomeeDBId) {
        console.error("Profile ID is missing");
        return;
      }
      const response = await api.handleToggleStatus({ id });
      // console.log("API Response:", response?.data);
      const data = response?.data;
      console.log("Processed Data:", data);
      dispatch(setOnline(data === 0 ? false : true));
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };
  const handleToggleSwitch = async (newStatus: boolean, id: string) => {
    console.log(newStatus, 'newStatus');
    dispatch(setOnline(newStatus));
    const date = new Date().toISOString();
    let data;
    try {
      if (newStatus) {
        const startTime = new Date().toISOString();
        data = {
          id: profile.HomeeDBId,
          action: 'start',
          startTime: startTime,
          date: date,
          isOnline: newStatus,
        };
      } else {
        const endTime = new Date().toISOString();
        data = {
          id: profile.HomeeDBId,
          action: 'end',
          endTime: endTime,
          date: date,
          isOnline: newStatus,
        };
      }
      const response = await api.handleToggleSwitch(data);
      console.log(response?.data, 'response data');
    } catch (error) {
      console.log('Error in handleToggleSwitch:', error);
    }
  };

  const getDocAndActiveHour = async () => {
    try {
      const response = await api.getDocAndActiveHours({ id: profile.HomeeDBId });
      console.log("Response333333333333333333333333333333333333333:", response);
      dispatch(setActiveHours(response.data.totalActiveHoursToday))
      dispatch(setDocuments(response.data.documents))
    } catch (error) {
      console.error("Error fetching doc and active hours:", error);
    }
  };




  return { fetchStatus, handleToggleSwitch, getDocAndActiveHour };
};
