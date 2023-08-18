import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

//is kind of lib helper that run the action hit the reducer
const middleWares = [logger]

//root-reducer
//logger allow us to see that the state look like before and after the dispatch action is 
// what action is and how the state look after the action 

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, composedEnhancers)
