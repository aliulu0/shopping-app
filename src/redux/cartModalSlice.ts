import {createSlice} from '@reduxjs/toolkit';
import { CartItem, modalState } from '../model/types';
import { RootState } from './store';

const initialState: modalState ={
    isOpenModal: false,
    isFavorite:false,
}

const modalSlice = createSlice({
    name: 'cartModal',
    initialState,
    reducers:{
        // toggle modal
        toggleModal: (state) => {
            state.isOpenModal = !state.isOpenModal;
        },
        setIsFavorite: (state,action) => {
            const {favorites, productId} = action.payload;
            const existInFavorite = favorites.find((item:CartItem) => item.id === productId);
            if (existInFavorite) {
                state.isFavorite = true;
            }else{
                state.isFavorite = false;
            }
        }

    }
})

export const {toggleModal, setIsFavorite} = modalSlice.actions;
export const getIsOpenModal = (state: RootState) => state.cartModal.isOpenModal; 
export const getIsFavorite = (state: RootState) => state.cartModal.isFavorite; 
export default modalSlice.reducer;
