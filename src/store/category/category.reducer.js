/* import {CATEGORY_ACTION_TYPES} from './category.types'; */
import { createSlice } from '@reduxjs/toolkit';

const INITIAl_STATE = {
    categories: [],
}

const categorySlice = createSlice({
    name: 'category',
    initialState: INITIAl_STATE,
    reducers: {
        setCategories: (state,action) => {
            state.categories = action.payload;
        }
    }
});

export const {setCategories} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;

/* export const categoryReducer = (state = INITIAl_STATE, action ={}) => {
    const { type, payload } = action;
    console.log('categoryReducer called with ', action);
    switch (type) {
        case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
            return {
                ...state,
                categories: payload,
            }
        default:
            return state;
    }
} */