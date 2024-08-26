import { USER_ACTION_TYPES } from "./user.types";
export const setCurrentUser = (user) => {
    // Return an Action Object 
    return {
        type: USER_ACTION_TYPES.SET_CURRENT_USER,
        payload: user,
    };
}