import { compose, createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
//import { persistStore, persistReducer } from "redux-persist";
import { logger } from 'redux-logger';
import { rootReducer } from './root-reducer';
//import storage from "redux-persist/lib/storage";
// rootReducer



// Example of a curry function 
const loggerMiddleware = (store) => (next) => (action) => {
    
    if (!action.type){
        return next(action)
    }
    console.log('Type ', action.type);
    console.log('Payload ', action.payload);
    console.log('State before ', store.getState());
    
    next(action);

    console.log('Next State after ', store.getState());


}

/* const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
} */


//const persistantReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [loggerMiddleware];

//const composedEnhancers = compose(applyMiddleware(...middleware));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare)=> getDefaultMiddleWare({
        serializableCheck: false // If we want to toggle this check
    }).concat(middlewares),// by default redux toolkit comes up with thunk
});

//createStore(persistantReducer, undefined, composedEnhancers);

// export const persistor = persistStore(store);