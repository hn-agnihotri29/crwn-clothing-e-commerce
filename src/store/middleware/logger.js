//we can create the custom middleware  format for middleware is same it going to be 3 function that return to one another

export const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action)
    }

    console.log('type: ', action.type)
    console.log('payload: ', action.payload)
    console.log('currentUser: ', store.getState())

    next(action)

    console.log('next state: ', store.getState())
}