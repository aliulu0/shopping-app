import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '../model/types';
import { RootState } from './store';


const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
const storedItemsCount = JSON.parse(localStorage.getItem('itemsCount') || '0');
const storedTotalAmount = JSON.parse(localStorage.getItem('totalAmount') || '0');

const initialState: CartState = {
    cart: storedCart,
    itemsCount: storedItemsCount,
    totalAmount: storedTotalAmount,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        // add items to cart
        addToCart: (state, action) => {

            state.cart.push(action.payload);
            state.itemsCount++;
            state.totalAmount += action.payload.totalPrice;
            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem('itemsCount', JSON.stringify(state.itemsCount));
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
        },
        // remove item from cart
        removeItemFromCart: (state, action) => {
            const { productId } = action.payload;
            const existingItem = state.cart.find(item => item.id === productId);
            if (existingItem) {
                state.cart = state.cart.filter((item) => item.id !== productId)
                state.itemsCount--;
                state.totalAmount -= existingItem?.totalPrice;
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem('itemsCount', JSON.stringify(state.itemsCount));
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
        },
        // update quantity
        updateQuantity: (state, action) => {
            const { productId, type } = action.payload;
            const newCart = state.cart.map((item) => {
                if (item.id === productId) {
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
                    return { ...item, quantity: newQuantity, totalPrice: newTotalPrice }
                } else {
                    return item;
                }
            });
            state.cart = newCart;
            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem('itemsCount', JSON.stringify(state.itemsCount));
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
           
        },
        // clear all cart items
        clearCart: (state) => {
            state.cart = [];
            state.itemsCount = 0;
            state.totalAmount = 0;
            localStorage.removeItem('cart');
            localStorage.removeItem('itemsCount');
            localStorage.removeItem('totalAmount');
        },
    },
})
export const getProductsInCart = (state: RootState) => state.cartList.cart;
export const getCartItemsCount = (state: RootState) => state.cartList.itemsCount;
export const getCartTotalAmount = (state: RootState) => state.cartList.totalAmount;
export const { addToCart, removeItemFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;