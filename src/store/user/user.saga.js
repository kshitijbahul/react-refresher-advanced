import {takeLatest,put,all, call} from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signInFailed, signUpFailed, signUpSuccess, signOutSuccess, signOutFailed } from './user.actions';

import { 
    getCurrentUser,
    createUserDocFromAuth,
    signInWithGooglePopup,
    signInWithEmail,
    createAuthUserWithEmailAndPassword,
    signOutUser,
} from '../../utils/firebase/firebase.utils';



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
        yield put(signInSuccess(user));
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

export function* userSignUp({payload: {email, password, displayName}}){
    try{
        const {user} = yield call(createAuthUserWithEmailAndPassword,{email,password})
        yield put(signUpSuccess(user, {displayName}));// This will trigger the signInAfterSignUp is successfull
    }catch(error){
        yield put(signUpFailed(error));
    }
}

export function* signInAfterSignUp({payload: {user, additionalInfo}}){
    yield getSnapShotFromUserAuth(user, additionalInfo);
}

export function* signOut(){
    try{
        yield call(signOutUser);
        yield put(signOutSuccess());
    }catch(error){
    yield put(signOutFailed(error))
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

export function* onSignupStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGNUP_START,userSignUp)
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGNUP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGNOUT_START,signOut)
}

export function* userSagas(){
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignupStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}