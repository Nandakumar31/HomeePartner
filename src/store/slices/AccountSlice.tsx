import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accountHolderName: '',
    accountNumber: '',
    copyofAccountNumber: "",
    ifscCode: '',
    bankName: '',
    branchName: '',
    verification:false
}

const BankAccountSlice = createSlice({
    name: 'Account',
    initialState,
    reducers: {
        setAccountHolderName(state, action) {
            state.accountHolderName = action.payload;
        },
        setAccountNumber(state, action) {
            state.accountNumber = action.payload;
        },
        setCopyOfAccountNumber(state, action) {
            state.copyofAccountNumber = action.payload;
        },
        setIfscCode(state, action) {
            state.ifscCode = action.payload;
        },
        setBankName(state, action) {
            state.bankName = action.payload;
        },
        setBranchName(state, action) {
            state.branchName = action.payload;
        },
        setVerification(state,action){
            state.verification = action.payload;
        }

    }
})


export const {
    setAccountHolderName,
    setAccountNumber,
    setCopyOfAccountNumber,
    setIfscCode,
    setBranchName,
    setBankName,
    setVerification

} = BankAccountSlice.actions;

export default BankAccountSlice.reducer