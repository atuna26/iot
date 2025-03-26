import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:null,
    token: null,
    doctors:[],
    medicalExperts:[],
    mris: [],
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin: (state,action) =>{
            state.token = action.payload.token;
        },
        setLogout: (state) =>{
            state.user = null;
            state.token = null;
        },
     }
})

export const {setLogin,setLogout,setDoctors,setMedicalExperts,setMRIs} = authSlice.actions;

export default authSlice.reducer;