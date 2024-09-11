// import { USER_ACTION_TYPES } from "./user.types";
import { createSlice } from "@reduxjs/toolkit";
/// This is same as what we had in context but some changes 


const INITIAl_STATE = {
    currentUser: null,
}

//Create Slice creates actions and reducers for us

export const userSlice = createSlice({
    name: 'user',
    initialState: INITIAl_STATE,
    reducers: {
        setCurrentUser: (state,action) => {
            state.currentUser = action.payload;// under the hood redux toolkit returns a new state object and actually doesn't perform a mutation
        }
    }
})

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;