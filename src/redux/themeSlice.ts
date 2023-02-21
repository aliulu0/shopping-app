import {createSlice} from '@reduxjs/toolkit';
import { ThemeState } from '../model/types';
import { RootState } from './store';


const storedTheme = JSON.parse(localStorage.getItem('theme') || 'false');


const initialState: ThemeState ={
    isDarkMode: storedTheme,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers:{
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('theme', JSON.stringify(state.isDarkMode));
        }
    }
})

export const {toggleTheme} = themeSlice.actions;
export const isDarkMode = (state: RootState) => state.theme.isDarkMode; 
export default themeSlice.reducer;
