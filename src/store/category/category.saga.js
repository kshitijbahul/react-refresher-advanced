import  { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {fetchCategoriesFailed, fetchCategoriesSuccess} from './category.actions';

import { CATEGORY_ACTION_TYPES } from './category.types';

// This is a thunk action creator
// We will replace it with Saga, keept here for easy reference

/* export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try{
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
    }
    catch (error) {
        dispatch(fetchCategoriesFailed(error));
    }
} */

function* fetchCategoriesAsync() {
    try{
        // call is a function that takes a function and its arguments as arguments
        const categoriesArray = yield call (getCategoriesAndDocuments,null);
        // yeild is used instead of dispatch
        yield put(fetchCategoriesSuccess(categoriesArray));
    }
    catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

function* onFetchCategories(){
    yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_START,fetchCategoriesAsync)
}

export function* categoriesSaga(){
    // Keyword that mentions everything in the Arguments should be run. Takes an array
    // the Yield ensures that the processing stops here
    yield all([call(onFetchCategories)]); 
}