// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-authentication-2c7bd.firebaseapp.com",
  projectId: "mern-authentication-2c7bd",
  storageBucket: "mern-authentication-2c7bd.appspot.com",
  messagingSenderId: "570050762677",
  appId: "1:570050762677:web:8945f2113c8cd00b93abfc",
  measurementId: "G-PPWDYHWQ94"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
