import { createContext, useState, useEffect } from "react";

import {onAuthStateChangedListener} from '../utils/firebase/firebase.utils';


//actual value you want to access
// This sets the default value of the context , can be what we want
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const contextValue = { currentUser, setCurrentUser }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user)=> {
            console.log('User Logged In .. ', user);
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