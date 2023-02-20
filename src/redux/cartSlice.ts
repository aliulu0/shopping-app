import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '../model/types';
import { RootState } from './store';

const initialState: CartState = {
    carts: [],
    itemsCount: 0,
    totalAmount: 0,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            
            state.carts.push(action.payload);
            state.itemsCount++;
            state.totalAmount += action.payload.totalPrice;
        },
        removeItemFromCart: (state, action) => {
            const {productId} = action.payload;    
            const existingItem = state.carts.find(item => item.id === productId);
            if(existingItem){
                state.itemsCount--;
                state.carts = state.carts.filter((item) => item.id !== productId)
            }      
        },
        updateQuantity: (state, action) => {
            const {productId, type} = action.payload;
            const newCart = state.carts.map((item) => {
                if(item.id === productId ){
                    let newQuantity = item.quantity;
                    let newTotalPrice = item.totalPrice;
                    
                    if (type === 'INC') {
                        newQuantity++;
                        if (newQuantity === item.stock) {
                             newQuantity = item.stock
                        }
                        newTotalPrice = newQuantity * item.discountedPrice;
                        item.totalPrice = newTotalPrice;
                        state.totalAmount += item.discountedPrice;
                    }
                    
                    if (type === 'DEC') {
                        newQuantity--;
                        newTotalPrice = newQuantity * item.discountedPrice;
                        state.totalAmount -= item.discountedPrice;
                    }
                    return {...item, quantity: newQuantity, totalPrice: newTotalPrice}
                }else {
                    return item;
                }
            } );
             state.carts = newCart; 
        },
        clearCart: (state) => {
            state.carts = [];
            state.itemsCount = 0;
            state.totalAmount = 0;
        },
    },
})
export const getProductsInCart = (state: RootState) => state.cartList.carts;
export const getCartItemsCount = (state: RootState) => state.cartList.itemsCount;
export const getCartTotalAmount = (state: RootState) => state.cartList.totalAmount;
export const { addToCart, removeItemFromCart, updateQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;