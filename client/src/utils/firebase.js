// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "devtrack-e6d05.firebaseapp.com",
  projectId: "devtrack-e6d05",
  storageBucket: "devtrack-e6d05.firebasestorage.app",
  messagingSenderId: "250984998959",
  appId: "1:250984998959:web:57aefdbdaff66f39c73eda",
  measurementId: "G-W04YSDK23W"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};