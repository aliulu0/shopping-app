import { createSlice } from "@reduxjs/toolkit";
import { AddressState } from "../model/types";
import { RootState } from "./store";

const storedAddresses = JSON.parse(localStorage.getItem('addresses') || '[]');

const initialState : AddressState = {
    addresses: storedAddresses,
}
const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers:{
        //add address
        addAddress: (state, action) => {
            state.addresses.push({id:state.addresses.length + 1, ...action.payload})
            localStorage.setItem('addresses', JSON.stringify(state.addresses));
        },
        //remove address
        removeAddress: (state, action) =>{
            const {id} = action.payload
            state.addresses = state.addresses.filter((address) => address.id !== id)
            localStorage.setItem('addresses', JSON.stringify(state.addresses));
        }
    }
})
export const {addAddress, removeAddress} = addressSlice.actions;
export const getAllAddresses = (state : RootState) => state.addresses.addresses;
export default addressSlice.reducer;