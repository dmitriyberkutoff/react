import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilter: (state, {payload}) => {
            state[payload.key] = payload.value;
        },
        resetFilters: (state) => {
            delete state['name'];
            delete state['genre'];
            delete state['cinema'];
        }
    }
})

export const filterReducer = filterSlice.reducer
export const filterActions = filterSlice.actions
