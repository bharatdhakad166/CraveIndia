import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,} from "firebase/auth";
import { updateProfile } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyANJSuM0umx6c_lXJAGGMdIhqJy2runxKM",
  authDomain: "craveindia-b2c8d.firebaseapp.com",
  projectId: "craveindia-b2c8d",
  storageBucket: "craveindia-b2c8d.firebasestorage.app",
  messagingSenderId: "192664586966",
  appId: "1:192664586966:web:b63b034513c2c834e0d777",
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
