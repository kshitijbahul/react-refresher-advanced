import { CATEGORY_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export const getCategories = () => {
    return {
        type: CATEGORY_ACTION_TYPES.GET_CATEGORIES,
    }
}



export const fetchCategoriesStart = () => {
    return {
        type: CATEGORY_ACTION_TYPES.FETCH_CATEGORY_START,
    }
}

export const fetchCategoriesSuccess = (categories) => {
    return {
        type: CATEGORY_ACTION_TYPES.FETCH_CATEGORY_SUCCESS,
        payload: categories,
    }
}

export const fetchCategoriesFailed = (error) => {
    return {
        type: CATEGORY_ACTION_TYPES.FETCH_CATEGORY_FAILED,
        payload: error,
    }
}
// This is a thunk action creator
// Takes a function which returns a function that takes dispatch as an argument
export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try{
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
    }
    catch (error) {
        dispatch(fetchCategoriesFailed(error));
    }
}