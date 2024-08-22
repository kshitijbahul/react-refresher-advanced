import { compose, createStore, applyMiddleware } from "redux";

import { logger } from 'redux-logger';
import { rootReducer } from './root-reducer';
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

const middleware = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleware));

export const store = createStore(rootReducer, undefined, composedEnhancers);