// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-46f81.firebaseapp.com",
  projectId: "mern-estate-46f81",
  storageBucket: "mern-estate-46f81.appspot.com",
  messagingSenderId: "375567342904",
  appId: "1:375567342904:web:56ce2055b2ea940fa435cd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);