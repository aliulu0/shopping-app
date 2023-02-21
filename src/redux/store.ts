import { configureStore } from "@reduxjs/toolkit";
import {useDispatch} from 'react-redux';
import productsReducer from './produtsSlice';
import cartReducer from './cartSlice';
import favoriteReducer from './favoriteSlice';
import themeReducer from './themeSlice';
import languageReducer from './languageSlice';
import filterReducer from "./filterSlice";
import cartModalReducer from "./cartModalSlice";
export const store = configureStore({
    reducer:{
        productList: productsReducer,
        cartList: cartReducer,
        favoriteList: favoriteReducer,
        theme:themeReducer,
        language: languageReducer,
        filter: filterReducer,
        cartModal: cartModalReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();