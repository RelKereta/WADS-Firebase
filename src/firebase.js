// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuJtuEI52YrXXbmvOsY-Gy4kBk2zr7Sm4",
  authDomain: "todoapp-d018e.firebaseapp.com",
  projectId: "todoapp-d018e",
  storageBucket: "todoapp-d018e.firebasestorage.app", 
  messagingSenderId: "771060288325",
  appId: "1:771060288325:web:b378eb2bc15b52e8f34c2c",
  measurementId: "G-V0X0EJKZCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  
const db = getFirestore(app); 

export { auth, db };
