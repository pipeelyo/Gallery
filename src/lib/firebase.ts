// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth";
import { getStorage } from  "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzH6XVeYAuOIBvPZ9LTSp4SpDMlc_PmhY",
  authDomain: "gallery-93963.firebaseapp.com",
  projectId: "gallery-93963",
  storageBucket: "gallery-93963.appspot.com",
  messagingSenderId: "225006811213",
  appId: "1:225006811213:web:0c85cc6e3f442451f74404"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);