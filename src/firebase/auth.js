import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,} from "firebase/auth";
import { updateProfile } from "firebase/auth";


const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


export const registerUser = async (email, password, username) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  
  await updateProfile(userCred.user, {
    displayName: username,
  });

  await sendEmailVerification(userCred.user);

  return userCred.user;
};


export const loginUser = async (email, password) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);

  return userCred.user;
};
