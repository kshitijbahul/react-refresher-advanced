import { USER_ACTION_TYPES } from "./user.types";
export const setCurrentUser = (user) => {
    // Return an Action Object 
    return {
        type: USER_ACTION_TYPES.SET_CURRENT_USER,
        payload: user,
    };
}
/*
SET_CURRENT_USER: 'user/SET_CURRENT_USER',
    CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
    GOOGLE_SIGNIN_START: 'user/GOOGLE_SIGNIN_START',
    EMAIL_SIGNIN_START: 'user/EMAIL_SIGNIN_START',
    SIGNIN_SUCCESS: 'user/SIGNIN_SUCCESS',
    SIGNIN_FAILED: 'user/SIGNIN_FAILED',
}*/

export const checkUserSession = () => {
    return {
        type: USER_ACTION_TYPES.CHECK_USER_SESSION,
    }
}

export const googleSignInStart = () => {
    return {
        type: USER_ACTION_TYPES.GOOGLE_SIGNIN_START,
    }
}

export const emailSigninStart = (email, password) => {
    return {
        type: USER_ACTION_TYPES.EMAIL_SIGNIN_START,
        payload: {email, password},
    }
}

export const signInSuccess = (userData) => {
    return {
        type: USER_ACTION_TYPES.SIGNIN_SUCCESS,
        payload: userData,
    }
}

export const signInFailed = () => {
    return {
        type: USER_ACTION_TYPES.SIGNIN_FAILED,
    }
}