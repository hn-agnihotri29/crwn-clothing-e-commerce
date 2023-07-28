import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";

//doc help to reterive data from firestore
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVjsfoo6v5e4iNIG7THdeeeWsDE3qF_MU",
    authDomain: "crwn-clothing-db-a895d.firebaseapp.com",
    projectId: "crwn-clothing-db-a895d",
    storageBucket: "crwn-clothing-db-a895d.appspot.com",
    messagingSenderId: "356866088073",
    appId: "1:356866088073:web:88065f532ef69384667a58"
  };
  
  // Initialize Firebase
  //All CRUD happen using firebase app instance
  const firebase = initializeApp(firebaseConfig);

  //Google Authentication with Google Auth class 
  const provider = new GoogleAuthProvider()
  
  provider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)




  //db directly point to our databse inside firestore
  export const db = getFirestore()

  export const createUserDocFromAuth = async(userAuth) => {
    // doc(database, collection, identifier)
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)

    const userSnapShot= await getDoc(userDocRef)
    console.log(userSnapShot)

    //if user does not exist
    //create/set the document with the data from userAuth in my collection
    if(!userSnapShot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    //if user exist
    return userDocRef
  }


