import { USER_ACTION_TYPES } from "./user.types";
/// This is same as what we had in context but some changes 


const INITIAl_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
}




/* 
    CHANGE 1: 
    We do this because now we don't use the useReducer hook, 
    so there is nothing to set the initial value of the state
    Hence we now pass the initial value of the state as the default value
*/
//const userReducer = (state , action) => {
export const userReducer = (state = INITIAl_STATE , action ={}) => {
    const { type, payload } = action;
    switch(type){
        case USER_ACTION_TYPES.SIGNIN_SUCCESS:
            return {
                ...state, // Get everything in the state , and only update the values that you need to update
                currentUser: payload,
            };
        case USER_ACTION_TYPES.SIGNIN_FAILED:
            return {
                ...state, // Get everything in the state , and only update the values that you need to update
                error: payload,
            };
        default:
            /* 
                CHANGE 2: 
                Since each reducer will get all the actions fired, 
                it is important that we return the state as it is from the reducer to indicate to react 
                that nothing has changed and hence 
                control the re-rendering of the component
            */
            //throw new Error(`Unknown action type: ${type} in userReducer`);
            return state;
    }
    
}
