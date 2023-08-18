import { USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE = {
    currentUser: null
}


export const userReducer = (state = INITIAL_STATE, action) => {
// payload store the value that is important for reducer to know what to update
const {type, payload } = action

switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
    return {
        ...state,
        currentUser: payload
    }
    default:
        return state
}
}
  
