import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import VehicleDetails from '../../components/RegistrationComp/VehicleDetails';
import ReusableFormInput from '../../utils/ReusableFormInput ';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAdharCardBack, setAdharCardFront, setDrivingLicenseBack,
  setDrivingLicenseFront, setMailId, setMobileNumber, setName
} from '../../store/slices/ProfileSlice';
import useImagePicker from '../../utils/helper/CameraFunction';
import { deleteFile, FileUpload } from '../../utils/helper/FileUploadDelete';
import FileUploadComponent from '../../utils/FileUploadComp';
import { validateProfileData } from '../../components/Validations/Validations';
import { handleGetCurrentLocation } from '../../utils/Permissions/requestLocationPermission';




const ProfileRegistration = () => {
  const { openGallery, handleProfileImageUpload } = useImagePicker();
  const [openVehicle, setOpenVehicle] = useState(false);
  const [loding, setLoading] = useState(false)
  

  const Profile = useSelector((state: any) => state.profile)
  console.log(Profile);





  const dispatch = useDispatch()


  const handleFilImageUpload = async () => {
    await handleProfileImageUpload()

  }

  const handleProceed = async () => {
    if (!validateProfileData(Profile)) {
      console.log('sucess');
      await handleGetCurrentLocation(dispatch)
      setOpenVehicle(true)
    } else {
      console.log('fail');
      setOpenVehicle(false)

    }
  };

  return (
    <>
      {openVehicle ? (
        <VehicleDetails />
      ) : (
        <View style={styles.container}>
          <TouchableOpacity style={styles.profileContainer}>
            {Profile.profileImageUri ? (
              <Image source={{ uri: Profile.profileImageUri }} style={styles.profileImage} />
            ) : (
              <Avatar.Icon size={140} icon="account" style={{ backgroundColor: '#03894E' }} />
            )}
            <IconButton
              icon="camera"
              size={20}
              style={styles.cameraIcon}
              onPress={handleFilImageUpload}
            />
          </TouchableOpacity>

          <ReusableFormInput
            label="Name"
            value={Profile.name}
            onChangeText={(e: any) => dispatch(setName(e))}
          />
          <ReusableFormInput
            label="Mobile Number"
            value={Profile.mobile}
            onChangeText={(e: any) => dispatch(setMobileNumber(e))}
            keyboardType="phone-pad"
            max={10}
            edit={false}
          />
          {/* <ReusableFormInput
            label="E Mail Id"
            value={Profile.mailId}
            onChangeText={(e: any) => dispatch(setMailId(e))}
            keyboardType="email-address"
          /> */}
          <View style={{ flexDirection: 'row' }}>
            <FileUploadComponent
              onPress={(setLoading: (loading: boolean) => void) =>
                FileUpload(dispatch, setAdharCardFront, 'Adhaar', setLoading)
              }
              fileTittle="Click to Upload Front Side Adhaar"
              data={Profile?.aadharCardFront}
              ondelete={(setLoading: (loading: boolean) => void) =>
                deleteFile(dispatch, setAdharCardFront, 'Adhaar', Profile?.aadharCardFront, setLoading)
              } />
            <FileUploadComponent onPress={(setLoading: (loading: boolean) => void) => FileUpload(dispatch, setAdharCardBack, 'Adhaar', setLoading)}
              fileTittle="Click to Upload Back Side Adhaar"
              data={Profile?.aadharCardBack}
              ondelete={(setLoading: (loading: boolean) => void) => deleteFile(dispatch, setAdharCardBack, 'Adhaar', Profile?.aadharCardBack, setLoading)} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <FileUploadComponent onPress={(setLoading: (loading: boolean) => void) => FileUpload(dispatch, setDrivingLicenseFront, 'Driving License', setLoading)}
              fileTittle="Click to Upload Front Side DL"
              data={Profile?.drivingLicenseFront}
              ondelete={(setLoading: (loading: boolean) => void) => deleteFile(dispatch, setDrivingLicenseFront, 'Driving License', Profile?.drivingLicenseFront, setLoading)} />
            <FileUploadComponent onPress={(setLoading: (loading: boolean) => void) => FileUpload(dispatch, setDrivingLicenseBack, 'Driving License', setLoading)}
              fileTittle="Click to Upload Back Side DL"
              data={Profile?.drivingLicenseBack}
              ondelete={(setLoading: (loading: boolean) => void) => deleteFile(dispatch, setDrivingLicenseBack, 'Driving License', Profile?.drivingLicenseBack, setLoading)} />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleProceed}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#03894E',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '85%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileRegistration;
