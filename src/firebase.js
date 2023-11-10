// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFKpX6wzha1oePWkIOOGNHMUkTxnUcKNw",
  authDomain: "chat-app-58b46.firebaseapp.com",
  projectId: "chat-app-58b46",
  storageBucket: "chat-app-58b46.appspot.com",
  messagingSenderId: "87009116247",
  appId: "1:87009116247:web:36ae93132da662975b6312"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore(app)
