import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { logger } from 'redux-logger';
import { rootReducer } from './root-reducer';
import storage from "redux-persist/lib/storage";
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

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
}


const persistantReducer = persistReducer(persistConfig, rootReducer);

const middleware = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleware));

export const store = createStore(persistantReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);