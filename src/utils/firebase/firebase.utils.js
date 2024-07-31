import {initializeApp} from 'firebase/app'
import {  getAuth, 
          GoogleAuthProvider, 
          signInWithRedirect, 
          signInWithPopup, 
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
          onAuthStateChanged
        } from "firebase/auth";
//onAuthStateChanged return listener

//doc help to reterive data from firestore
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query,getDocs} from 'firebase/firestore'
// import { cloneElement } from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH-DOMIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "MESSAGER_ID",
    appId: "YOUR_APP_ID"
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

  export const createUserDocFromAuth = async(userAuth, additionalInformation = {}) => {
    
    if(!userAuth) return

    // doc(database, collection, identifier)
    const userDocRef = doc(db, 'users', userAuth.uid)
 
    const userSnapShot= await getDoc(userDocRef)

    //if user does not exist
    //create/set the document with the data from userAuth in my collection
    if(!userSnapShot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    //if user exist
    return userDocRef
  }

export const  createAuthUserWithEmailAndPassowrd = async(email, password) => {
  if(!email || !password) return

  return await createUserWithEmailAndPassword(auth,email, password)
}

export const  signInAuthUserWithEmailAndPassowrd = async(email, password) => {
  if(!email || !password) return

  return await signInWithEmailAndPassword(auth,email, password)
}


export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)


/**
 * Collection db 
*/

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  });

  await batch.commit()
  console.log('done')
}


export const getCollectionAndDocument = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data())



  // return categoryMap

}

