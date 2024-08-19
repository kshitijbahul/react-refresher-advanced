import {CATEGORY_ACTION_TYPES} from './category.types';

const INITIAl_STATE = {
    categoriesMap: {},
}

export const categoryReducer = (state = INITIAl_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
            return {
                ...state,
                categoriesMap: payload,
            }
        default:
            return state;
    }
}