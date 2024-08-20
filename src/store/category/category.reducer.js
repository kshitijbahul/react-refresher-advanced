import {CATEGORY_ACTION_TYPES} from './category.types';

const INITIAl_STATE = {
    categories: [],
}

export const categoryReducer = (state = INITIAl_STATE, action) => {
    const { type, payload } = action;
    console.log('in the reducer', action);
    switch (type) {
        case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
            return {
                ...state,
                categories: payload,
            }
        default:
            return state;
    }
}