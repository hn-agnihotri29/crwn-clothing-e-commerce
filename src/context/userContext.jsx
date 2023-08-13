import { createContext,useEffect, useReducer } from "react";

import { onAuthStateChangedListener,createUserDocFromAuth } from "../utils/firebase/firebase.utils";

// as the actual value you want to access

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});


//value hold actual context value
//this provider allowing any of child component to access the value inside the useState


export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const useerReducer = (state, action) => {
  // payload store the value that is important for reducer to know what to update
  const {type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
}

const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {

  //useReducer takes reducer function and initial value 
  const [{currentUser}, dispatch] = useReducer(useerReducer, INITIAL_STATE)
  

  const setCurrentUser = (user) => {
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
  }


  //const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };


  useEffect(() => {
    const unsubscribe =  onAuthStateChangedListener((user) => {
      if(user) {
        createUserDocFromAuth(user)
      }
    setCurrentUser(user)
  })
    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};