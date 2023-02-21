import { createSlice } from '@reduxjs/toolkit';
import { FavoriteState } from '../model/types';
import { RootState } from './store';


const storedFaVorites = JSON.parse(localStorage.getItem('favorites') || '[]');

const initialState: FavoriteState ={
    favorites: storedFaVorites,
}

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers:{
        addToFavorite:(state, action) => {
            const product = action.payload;
            const existInFavorite = state.favorites.find((item) => item.id === product.id);
            if (!existInFavorite) {
                state.favorites.push(product);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        },
        removeFromFavorite: (state, action) => {
            const {productId} = action.payload;
            state.favorites = state.favorites.filter((item) => item.id !== productId);
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        }
    }
})

export const {addToFavorite, removeFromFavorite} = favoriteSlice.actions;
export const getAllFavorites = (state: RootState) => state.favoriteList.favorites;
export default favoriteSlice.reducer;