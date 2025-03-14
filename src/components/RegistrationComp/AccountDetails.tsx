import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ReusableFormInput from '../../utils/ReusableFormInput '
import { TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import {
    setAccountHolderName, setAccountNumber, setBankName,
    setBranchName, setCopyOfAccountNumber, setIfscCode,
    setVerification
} from '../../store/slices/AccountSlice'
import axios from 'axios'
import { validateIfsc } from '../Regex/Regex'
import { validateBankData } from '../Validations/Validations'
import VerificationScreen from './VerificationScreen'
import { useNavigation } from '@react-navigation/native'


const AccountDetails = () => {
    // const [verification, setVerification] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigation = useNavigation()


    const Account = useSelector((state: any) => state.Account)
    console.log(Account, 'hel');
    const dispatch = useDispatch()


    const handleTextItem = (field: string, value: any) => {
        const actions: { [key: string]: Function } = {
            name: setAccountHolderName,
            number: setAccountNumber,
            copynumber: setCopyOfAccountNumber,
            ifsc: setIfscCode,
            branch: setBranchName,
            bank: setBankName
        };
        const action = actions[field];
        if (action) {
            dispatch(action(value));
        } else {
            console.warn('Unknown field:', field);
        }
    };

    const getBankDetails = async () => {
        setLoading(true)
        try {
            const ifscCode = Account.ifscCode;
            const response = await axios.get(`https://ifsc.razorpay.com/${ifscCode}`);
            console.log(response.data, 'ww');
            const bankName = response.data.BANK;
            const Branch = response.data.BRANCH
            setLoading(false);

            dispatch(setBankName(bankName));
            dispatch(setBranchName(Branch));
            setError('');
            console.log('check ifsc code ', ifscCode);

        } catch (err) {
            setLoading(false);
            dispatch(setBankName(''));
            dispatch(setBranchName(''));
            Alert.alert('Invalid IFSC code or unable to fetch details')
            setError('Invalid IFSC code or unable to fetch details');
        }
    };

    const handleSubmit = () => {
        if (!validateBankData(Account)) {
            console.log('sucess');
            navigation.navigate('Verification');

        } else {
            console.log('fail');
            navigation.navigate('Verification');

        }
    }




    return (
        <>

            <View style={styles.container}>
                <Text style={styles.subhead0}>Registration</Text>
                <View style={styles.subCont}>
                    <Text style={styles.subhead}>Account Details</Text>
                </View>
                <ReusableFormInput label="Account Holder Name" value={Account?.accountHolderName} onChangeText={(val: any) => handleTextItem('name', val)} />
                <ReusableFormInput label="Account Number" value={Account?.accountNumber}
                    onChangeText={(val: any) => handleTextItem('number', val)} keyboardType='number-pad' />
                <ReusableFormInput label="Re-Enter Account Number" value={Account?.copyofAccountNumber}
                    onChangeText={(val: any) => handleTextItem('copynumber', val)} keyboardType='number-pad' secure={true} />
                <View style={styles.ifsccheck}>
                    <TextInput
                        label='IFSC Code'
                        value={Account?.ifscCode}
                        onChangeText={(val: any) => handleTextItem('ifsc', val)}
                        style={styles.ifscInput}
                        mode="outlined"
                        autoCapitalize='characters'
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={getBankDetails} disabled={!validateIfsc(Account?.ifscCode)}>
                        <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
                </View>
                <ReusableFormInput label="Bank Name" value={Account?.bankName} onChangeText={(val: any) => handleTextItem('bank', val)} edit={false} />
                <ReusableFormInput label="Branch" value={Account?.branchName} onChangeText={(val: any) => handleTextItem('branch', val)} edit={false} />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>sumbit</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default AccountDetails

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#03894E',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '85%',
        marginTop: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',

    },
    subhead0: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    subCont: {
        alignSelf: 'flex-start',
        marginBottom: 20
    },
    subhead: {
        paddingLeft: 30,
        fontSize: 20,
        fontWeight: "bold"
    },
    ifsccheck: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',

    },
    ifscInput: {
        width: 180,
        marginLeft: 30,
        marginRight: 10

    },
    searchButton: {
        backgroundColor: '#03894E',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 5

    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    txtInput: {
        width: '100%',
        marginBottom: 20,
    }
})
