import {takeLatest,put,all, call} from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signInFailed } from './user.actions';

import { getCurrentUser,createUserDocFromAuth, signInWithGooglePopup, signInWithEmail } from '../../utils/firebase/firebase.utils';



function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
    try{
        const userSnapShot = yield call(createUserDocFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}));

    }catch(error){
        yield put(signInFailed(error));
    }

}

export function* signInWithEmailAndPassword({payload: {email,password}}){
    try{
        const {user} = yield call(signInWithEmail,email,password);
    }catch(error){
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try{
        const {user} =  yield call(signInWithGooglePopup);
        yield call(getSnapShotFromUserAuth,user);
    }
    catch(error){
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

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START,signInWithGoogle)
} 


export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START,signInWithEmailAndPassword);
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* userSagas(){
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
    ]);
}