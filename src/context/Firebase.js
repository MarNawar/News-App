import { createContext } from 'react'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";


import { getDatabase,ref, set } from "firebase/database";
import { useContext } from 'react';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYikW77nWZWjJLFnmupmYUKh81AVUUayI",
  authDomain: "news-shots-app.firebaseapp.com",
  projectId: "news-shots-app",
  storageBucket: "news-shots-app.appspot.com",
  messagingSenderId: "166095565341",
  appId: "1:166095565341:web:338cd43662bf4b08908cf4",
  databaseURL: "https://news-shots-app-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase(app);

const firestore = getFirestore(app);



const FirebaseContext = createContext(null);

export function FirebaseProvider({children}){

  function signupUser(email, password){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      alert('success');
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  function loginUser( email, password){

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      // const user = userCredential.user;
      alert('success');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message);

      console.log(errorCode, errorMessage);
    });

  }

  function setDataToRealtimeDb(key,data){
    console.log('get in set data', key, data);
    set(ref(db/* Database*/, `favorite/items`/*key*/), data/* Data */);
  }

  async function setDataToFirestoreDb(key,data){
    try {
      const docRef = await addDoc(collection(firestore, key), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return <FirebaseContext.Provider value={{signupUser, loginUser, setDataToRealtimeDb, setDataToFirestoreDb}}>
    {children}
  </FirebaseContext.Provider>
}


export function useFirebase(){
  return useContext(FirebaseContext);
}
