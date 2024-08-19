import { CATEGORY_ACTION_TYPES } from "./category.types";

export const getCategories = () => {
    return {
        type: CATEGORY_ACTION_TYPES.GET_CATEGORIES,
    }
}

export const setCategories = (categories) => {
    return {
        type: CATEGORY_ACTION_TYPES.SET_CATEGORIES,
        payload: categories
    }
}