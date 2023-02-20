import {createSlice} from '@reduxjs/toolkit';
import { ThemeState } from '../model/types';
import { RootState } from './store';

const initialState: ThemeState ={
    isDarkMode: false,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers:{
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
        }
    }
})

export const {toggleTheme} = themeSlice.actions;
export const isDarkMode = (state: RootState) => state.theme.isDarkMode; 
export default themeSlice.reducer;
