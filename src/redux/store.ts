import { configureStore } from "@reduxjs/toolkit";
import {useDispatch} from 'react-redux';
import productsReducer from './produtsSlice';
import cartReducer from './cartSlice';
import favoriteReducer from './favoriteSlice';
export const store = configureStore({
    reducer:{
        productList: productsReducer,
        cartList: cartReducer,
        favoriteList: favoriteReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();