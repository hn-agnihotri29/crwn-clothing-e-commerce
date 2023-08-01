import { createContext, useState,useEffect } from "react";

import { onAuthStateChangedListener,createUserDocFromAuth } from "../utils/firebase/firebase.utils";

// as the actual value you want to access

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});


//value hold actual context value
//this provider allowing any of child component to access the value inside the useState

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
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