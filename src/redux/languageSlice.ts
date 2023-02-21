import {createSlice} from '@reduxjs/toolkit';
import { LanguageState } from '../model/types';
import { RootState } from './store';

const storedLanguage = JSON.parse(localStorage.getItem('language') || 'en');

const initialState: LanguageState ={
    language: storedLanguage,
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers:{
        setLanguage : (state, action) => {
            const language = action.payload;
            if(language === "en"){
                state.language = "tr"
            }else{
                state.language = "en"
            }
            localStorage.setItem('language', JSON.stringify(language));
        }
    }
})

export const {setLanguage} = languageSlice.actions;
export const language = (state: RootState) => state.language.language; 
export default languageSlice.reducer;
