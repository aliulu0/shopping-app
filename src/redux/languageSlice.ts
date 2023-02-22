import {createSlice} from '@reduxjs/toolkit';
import { LanguageState } from '../model/types';
import { RootState } from './store';

const storedLang = localStorage.getItem('language') || 'en';

const initialState: LanguageState ={
    language: storedLang,
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
            localStorage.setItem('language', state.language);
        }
    }
})

export const {setLanguage} = languageSlice.actions;
export const language = (state: RootState) => state.language.language; 
export default languageSlice.reducer;
