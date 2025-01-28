// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIumGQuJ-hMKvLUKWfoNPVsz5lqWWhOZs",
  authDomain: "pass-9e6f1.firebaseapp.com",
  projectId: "pass-9e6f1",
  storageBucket: "pass-9e6f1.firebasestorage.app",
  messagingSenderId: "470396631883",
  appId: "1:470396631883:web:7fb33f7f0329b66f45c6ce",
  measurementId: "G-3GD36H267Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);