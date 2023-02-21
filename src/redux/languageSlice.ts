import {createSlice} from '@reduxjs/toolkit';
import { LanguageState } from '../model/types';
import { RootState } from './store';

const initialState: LanguageState ={
    language: "en",
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
        }
    }
})

export const {setLanguage} = languageSlice.actions;
export const language = (state: RootState) => state.language.language; 
export default languageSlice.reducer;
