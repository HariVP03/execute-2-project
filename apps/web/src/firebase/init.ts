import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBJsCH2i1L933e1gMUPYTHdF8rTmrZvB9I",
    authDomain: "execute-30e71.firebaseapp.com",
    projectId: "execute-30e71",
    storageBucket: "execute-30e71.appspot.com",
    messagingSenderId: "1026296463468",
    appId: "1:1026296463468:web:bd6511198ca09643739849",
    measurementId: "G-YT0S7FQ9QK",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(FirebaseApp);
