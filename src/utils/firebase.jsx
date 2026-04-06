// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCkWW3uaH4PKx-6y9sPnCe3VGtDz_2w_6Y",
    authDomain: "resume-scorer-1a966.firebaseapp.com",
    projectId: "resume-scorer-1a966",
    storageBucket: "resume-scorer-1a966.firebasestorage.app",
    messagingSenderId: "1021140693125",
    appId: "1:1021140693125:web:4f691b0cab01e633fff9ec",
    measurementId: "G-RWN36ZJNDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
