import { createSlice } from '@reduxjs/toolkit';
import { FavoriteState } from '../model/types';
import { RootState } from './store';

const initialState: FavoriteState ={
    favorites: [],
}

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers:{
        addToFavorite:(state, action) => {
            const product = action.payload;
            state.favorites.push(product);
        },
        removeFromFavorite: (state, action) => {
            const {productId} = action.payload;
            state.favorites = state.favorites.filter((item) => item.id !== productId);
        }
    }
})

export const {addToFavorite, removeFromFavorite} = favoriteSlice.actions;
export const getAllFavorites = (state: RootState) => state.favoriteList.favorites;
export default favoriteSlice.reducer;