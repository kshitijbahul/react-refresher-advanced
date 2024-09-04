import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { logger } from 'redux-logger';
import { loggerMiddleware } from '../middleware/logger';
import { rootReducer } from './root-reducer';
import storage from "redux-persist/lib/storage";

// We  can either work with redux-thunk or redux-saga
// import { thunk } from "redux-thunk";
// Trying Redux saga now 
import createSagaMiddleWare from 'redux-saga';
import { rootSaga } from "./root-saga";

// rootReducer




const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user','categories'],
}


const sagaMiddleware = createSagaMiddleWare();

const persistantReducer = persistReducer(persistConfig, rootReducer);

const middleware = [process.env.NODE_ENV !== 'production' && loggerMiddleware, sagaMiddleware].filter(Boolean);// Filter Boolean filters out anythign that is true

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleware));

export const store = createStore(persistantReducer, undefined, composedEnhancers);

// Once the Redux Store has been created , we can run the rootSagaMiddleWare
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);