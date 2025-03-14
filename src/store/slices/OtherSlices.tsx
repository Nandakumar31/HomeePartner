import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isOnline: false,
    activeHours: '',
    Alldocuments: ''

}

const OtherSlices = createSlice({
    name: 'Other',
    initialState,
    reducers: {
        setOnline(state, action) {
            state.isOnline = action.payload
        },
        setActiveHours(state, action) {
            state.activeHours = action.payload
        },
        setDocuments(state, action) {
            state.Alldocuments = action.payload
        }
    }
})


export const {
    setOnline,
    setActiveHours,
    setDocuments
} = OtherSlices.actions;
export default OtherSlices.reducer