import {createSlice} from '@reduxjs/toolkit';
import { filterState } from '../model/types';
import { RootState } from './store';

const initialState: filterState ={
    filterText: "",
}

const sortProductSlice = createSlice({
    name: 'filter',
    initialState,
    reducers:{
        setFilterText: (state, actions) => {
            state.filterText = actions.payload;
        }
    }
})

export const {setFilterText} = sortProductSlice.actions;
export const getFilterText = (state: RootState) => state.filter.filterText;
export default sortProductSlice.reducer;
