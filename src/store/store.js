import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from "redux-thunk";


const persistConfig = {
    key: 'root',  // start from root level
    storage,
    whiltelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



//is kind of lib helper that run the action hit the reducer
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean)


const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
     
//root-reducer
//logger allow us to see that the state look like before and after the dispatch action is 
// what action is and how the state look after the action 
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)
