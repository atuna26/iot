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
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) =>{
            state.user = null;
            state.token = null;
        },
        setDoctors: (state, action) =>{
            state.doctors = action.payload;
        },
        setMedicalExperts: (state, action) =>{
            state.medicalExperts = action.payload;
        },
        setMRIs: (state,action) =>{
            state.mris = action.payload;
        }
     }
})

export const {setLogin,setLogout,setDoctors,setMedicalExperts,setMRIs} = authSlice.actions;

export default authSlice.reducer;