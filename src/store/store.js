import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

//we can create the custom middleware  format for middleware is same it going to be 3 function that return to one another
const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action)
    }

    console.log('type: ', action.type)
    console.log('payload: ', action.payload)
    console.log('currentUser: ', store.getState())

    next(action)

    console.log('next state: ', store.getState())
}

//is kind of lib helper that run the action hit the reducer
const middleWares = [loggerMiddleware]


     
//root-reducer
//logger allow us to see that the state look like before and after the dispatch action is 
// what action is and how the state look after the action 

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, composedEnhancers)
