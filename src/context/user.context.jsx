import { createContext, useState, useEffect, useReducer } from "react";

import {onAuthStateChangedListener, createUserDocFromAuth} from '../utils/firebase/firebase.utils';


//actual value you want to access
// This sets the default value of the context , can be what we want
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}


const userReducer = (state, action) => {
    console.log('Dispatched action');
    console.log('state', state);
    
    console.log('action', action);
    const { type, payload } = action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state, // Get everything in the state , and only update the values that you need to update
                currentUser: payload,
            };
        default:
            throw new Error(`Unknown action type: ${type} in userReducer`);
    }
    
}
const INITIAl_STATE = {
    currentUser: null,
}
export const UserProvider = ({children}) => {
    
    // Step 1: Not use the useState hook
    // const [ currentUser, setCurrentUser ] = useState(null);
    const [ state, dispatch ] = useReducer(userReducer,INITIAl_STATE);
    const { currentUser } = state;
    console.log('currentUser', currentUser);
    // instead of the 2 lines above we could also have reconstructed the state inline 
    // const [{currentUser}, dispatch ] = useReducer(userReducer,INITIAl_STATE);

    const setCurrentUser = (user) => {
        dispatch({
            type: USER_ACTION_TYPES.SET_CURRENT_USER,
            payload: user,
        });
    }

    const contextValue = { currentUser, setCurrentUser }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user)=> {
            if (user) {
                createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    },[])

    // i.e UserContext.Provider is allowing any of the children 
    // to access the value in the useState() of the UserContext component
    return (
        <UserContext.Provider value = {contextValue}>
            {children}
        </UserContext.Provider>
    );
}