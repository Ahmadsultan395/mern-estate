// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-bd7e4.firebaseapp.com",
  projectId: "mern-estate-bd7e4",
  storageBucket: "mern-estate-bd7e4.appspot.com",
  messagingSenderId: "67989593376",
  appId: "1:67989593376:web:638aa4be3588b598c48b45"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);