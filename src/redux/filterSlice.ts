import {createSlice} from '@reduxjs/toolkit';
import { filterState } from '../model/types';
import { RootState } from './store';

const initialState: filterState ={
    filterText: "",
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers:{
        // filter text
        setFilterText: (state, actions) => {
            state.filterText = actions.payload;
        }
    }
})

export const {setFilterText} = filterSlice.actions;
export const getFilterText = (state: RootState) => state.filter.filterText;
export default filterSlice.reducer;
