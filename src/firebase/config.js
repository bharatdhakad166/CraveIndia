import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANJSuM0umx6c_lXJAGGMdIhqJy2runxKM",
  authDomain: "craveindia-b2c8d.firebaseapp.com",
  projectId: "craveindia-b2c8d",
  storageBucket: "craveindia-b2c8d.firebasestorage.app",
  messagingSenderId: "192664586966",
  appId: "1:192664586966:web:b63b034513c2c834e0d777",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);