// import { compose, createStore, applyMiddleware } from "redux";

// this take place of createstore and applymiddleware.
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// import { persistStore, persistReducer } from "redux-persist";
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import thunk from "redux-thunk";


// const persistConfig = {
//     key: 'root',  // start from root level
//     storage,
//     whiltelist: ['cart']
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean)


// const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
     
// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>  
        getDefaultMiddleware().concat(middleWares),
})

// export const persistor = persistStore(store)
