import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:null,
    token: null,
    product:[],
    compareProduct:[],
    event:[],
    reference:[],
    news:[],
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
        setProduct: (state,action) =>{
            state.product = action.payload;
        },
        setCompareProduct: (state,action) => {
            state.compareProduct = action.payload;
        },
        setEvent: (state,action) =>{
            state.event = action.payload;
        },
        setNews: (state,action) =>{
            state.news = action.payload;
        },
        setReference: (state,action) =>{
            state.reference = action.payload;
        }
     }
})

export const {setLogin,setLogout,setProduct,setEvent,setNews,setCompareProduct,setReference} = authSlice.actions;

export default authSlice.reducer;