import {initializeApp} from 'firebase/app'
import {  getAuth, 
          GoogleAuthProvider, 
          signInWithRedirect, 
          signInWithPopup, 
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
          onAuthStateChanged,
          User,
          NextOrObserver
        } from "firebase/auth";
//onAuthStateChanged return listener

//doc help to reterive data from firestore
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query,getDocs, QueryDocumentSnapshot} from 'firebase/firestore'
// import { cloneElement } from 'react';
import {Category} from "../../store/categories/category.types"

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

  export type AdditionalInformation = {
    displayName ?: string;
  }

  export type Userdata = {
    createdAt: Date;
    displayName: string;
    email: string;
  }

  export const createUserDocFromAuth = async(userAuth : User, 
      additionalInformation = {} as AdditionalInformation ) : Promise<void | QueryDocumentSnapshot<Userdata>>=> {
    
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
            console.log('error creating the user', error)
        }
    }

    //if user exist
    return userSnapShot as QueryDocumentSnapshot<Userdata>;
  }

export const  createAuthUserWithEmailAndPassowrd = async(email : string, password : string) => {
  if(!email || !password) return

  return await createUserWithEmailAndPassword(auth,email, password)
}

export const  signInAuthUserWithEmailAndPassowrd = async(email :string, password : string) => {
  if(!email || !password) return

  return await signInWithEmailAndPassword(auth,email, password)
}


export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback : NextOrObserver<User>) => onAuthStateChanged(auth, callback)


/**
 * Collection db 
*/
export type objectsToAdd = {
  title : string;
}

export const addCollectionAndDocuments = async <T extends objectsToAdd>(collectionKey: string,  objectsToAdd : T[]) : Promise<void> => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  }); 

  await batch.commit()
  console.log('done')
}

 
export const getCollectionAndDocument = async () : Promise<Category[]> => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category)

  // return categoryMap

}

export const getCurrentUser = () : Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe()
        resolve(userAuth)
      },
      reject
    )
  })
}