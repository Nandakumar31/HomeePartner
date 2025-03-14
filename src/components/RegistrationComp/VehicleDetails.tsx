import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AccountDetails from './AccountDetails';
import ReusableFormInput from '../../utils/ReusableFormInput ';
import { useDispatch, useSelector } from 'react-redux';
import { setVehicleAvailable, setVehicleInsuranceExpiredate, setVehicleName, setVehicleNumber, setVehicleRcBackSide, setVehicleRcFrontSide, setVehicleType } from '../../store/slices/vehicleSlice';
import FileUploadComponent from '../../utils/FileUploadComp';
import { deleteFile, FileUpload } from '../../utils/helper/FileUploadDelete';
import colors from '../../utils/color';
import { validateVehicleData } from '../Validations/Validations';
import MenuInputDropdown from '../MenuDropdownComp';
import DatePicker from 'react-native-date-picker';
import Entypo from 'react-native-vector-icons/Entypo';




const VehicleDetails = () => {
  // const [vehicleType, setVehicleType] = useState('');
  // const [vehicleName, setVehicleName] = useState('');
  const [bank, setBank] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const Vehicle = useSelector((state: any) => state.Vehicle)
  console.log(Vehicle);


  const dispatch = useDispatch()

  const handleTextItem = (field: string, value: any) => {
    const actions: { [key: string]: Function } = {
      type: setVehicleType,
      name: setVehicleName,
      number: setVehicleNumber,
      expire: setVehicleInsuranceExpiredate,
    };

    const action = actions[field];
    if (action) {
      dispatch(action(value));
    } else {
      console.warn('Unknown field:', field);
    }
  };

  const handleProceed = () => {
    if (!validateVehicleData(Vehicle)) {
      console.log('sucess');
      setBank(true)
    } else {
      console.log('fail');
      setBank(false)

    }

    console.log('helplplpplplpp');

  };

  const handleInputChange = () => {

  }
  const handleDropdownPress = () => {

  }
  const handleDropdownItemPresss = (item: string) => {
    dispatch(setVehicleType(item))
    setShowDropdown(false)
  }

  return (
    <>
      {bank ? <AccountDetails /> :
        <View style={styles.container}>
          {/* <View style={styles.subCont}> */}
          <Text style={styles.subhead}>Vehicle Registration</Text>
          {/* </View> */}

          <MenuInputDropdown
            // title='Vehicle Type'
            placeholder='Select Vehicle Type'
            inputValue={Vehicle?.vehicleType}
            onInputChange={handleInputChange}
            onDropdownPress={handleDropdownPress}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            dropdownItems={Vehicle?.vehicleAvailable}
            onDropdownItemPress={handleDropdownItemPresss}
            editItems={false}
          />
          <ReusableFormInput label="Vehicle Model" value={Vehicle?.vehicleName} onChangeText={(val: any) => handleTextItem('name', val)} />
          <ReusableFormInput label="Vehicle Number" value={Vehicle?.vehicleNumber} onChangeText={(val: any) => handleTextItem('number', val)} />
          <TouchableOpacity style={{
            width: '85%',
            borderWidth: 1,
            height: 50,
            borderRadius: 5,
            marginBottom: 15,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }} onPress={() => setIsOpen(true)}>
            <Text style={{ color: '#4d4d4d', padding: 15 }}>
              {Vehicle?.vehicleInsuranceExpiredate
                ? new Date(Vehicle?.vehicleInsuranceExpiredate)?.toDateString() : 'Insurance Expire Date'}
            </Text>
            <Entypo name="select-arrows" size={18} color={colors.primary} style={{ padding: 15 }} />
          </TouchableOpacity>

          <DatePicker
            modal
            open={isOpen}
            date={Vehicle?.vehicleInsuranceExpiredate ? new Date(Vehicle?.vehicleInsuranceExpiredate) : new Date()}
            mode='date'
            onConfirm={(selectedDate) => {
              dispatch(setVehicleInsuranceExpiredate(selectedDate?.toDateString()));
              setIsOpen(false);
            }}
            onCancel={() => setIsOpen(false)}
          />

          <View style={{ flexDirection: 'row' }}>
            <FileUploadComponent onPress={(setLoading: (loading: boolean) => void) => FileUpload(dispatch, setVehicleRcFrontSide, 'Vehicle RC', setLoading)}
              fileTittle="Click to Upload Vehicle RC Front Side"
              data={Vehicle?.vehicleRcFrontSide}
              ondelete={(setLoading: (loading: boolean) => void) => deleteFile(dispatch, setVehicleRcFrontSide, 'Vehicle RC', Vehicle?.vehicleRcFrontSide, setLoading)} />
            <FileUploadComponent onPress={(setLoading: (loading: boolean) => void) => FileUpload(dispatch, setVehicleRcBackSide, 'Vehicle RC', setLoading)}
              fileTittle="Click to Upload  Vehicle RC Back Side "
              data={Vehicle?.vehicleRcBackSide}
              ondelete={(setLoading: (loading: boolean) => void) => deleteFile(dispatch, setVehicleRcBackSide, 'Vehicle RC', Vehicle?.vehicleRcBackSide, setLoading)} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <FileUploadComponent onPress={(setLoading: (loading: boolean) => void) => FileUpload(dispatch, setVehicleRcFrontSide, 'Vehicle RC', setLoading)}
              fileTittle="Click to Upload Vehicle RC Front Side"
              data={Vehicle?.vehicleRcFrontSide}
              ondelete={(setLoading: (loading: boolean) => void) => deleteFile(dispatch, setVehicleRcFrontSide, 'Vehicle RC', Vehicle?.vehicleRcFrontSide, setLoading)} />
            <FileUploadComponent onPress={(setLoading: (loading: boolean) => void) => FileUpload(dispatch, setVehicleRcBackSide, 'Vehicle RC', setLoading)}
              fileTittle="Click to Upload  Vehicle RC Back Side "
              data={Vehicle?.vehicleRcBackSide}
              ondelete={(setLoading: (loading: boolean) => void) => deleteFile(dispatch, setVehicleRcBackSide, 'Vehicle RC', Vehicle?.vehicleRcBackSide, setLoading)} />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleProceed}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>}
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
    // marginTop: 20
  },
  subCont: {
    // alignSelf: 'flex-start',
    // marginBottom: 20
  },
  subhead: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary

  },
  subhead0: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
    // marginTop:10,
    backgroundColor: 'red'
  },
  button: {
    backgroundColor: '#03894E',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '85%',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VehicleDetails;
