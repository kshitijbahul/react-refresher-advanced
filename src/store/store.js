import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { logger } from 'redux-logger';
import { loggerMiddleware } from '../middleware/logger';
import { rootReducer } from './root-reducer';
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
// rootReducer




const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user','categories'],
}


const persistantReducer = persistReducer(persistConfig, rootReducer);

const middleware = [process.env.NODE_ENV !== 'production' && loggerMiddleware, thunk].filter(Boolean);// Filter Boolean filters out anythign that is true

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleware));

export const store = createStore(persistantReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);