import {takeLatest,put,all, call} from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signInFailed } from './user.actions';

import { getCurrentUser,createUserDocFromAuth } from '../../utils/firebase/firebase.utils';



function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
    try{
        const userSnapShot = yield call(createUserDocFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}));

    }catch(error){
        yield put(signInFailed(error));
    }

}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapShotFromUserAuth,userAuth);
    }
    catch(error){
        yield put(signInFailed(error));
    }
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* userSagas(){
    yield all([
        call(onCheckUserSession),
    ]);
}