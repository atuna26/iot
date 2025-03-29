import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:null,
    token: null,
    devices: [],
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
        setDevices: (state,action) =>{
            state.devices = action.payload;
        },
     }
})

export const {setLogin,setLogout,setDevices} = authSlice.actions;

export default authSlice.reducer;