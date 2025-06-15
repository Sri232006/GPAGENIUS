// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase configuration (Don't change these keys unless you create new project)
const firebaseConfig = {
  apiKey: "AIzaSyBoFB-2BaMSHNEXfR3Aezl31CDhNGu9LHU",
  authDomain: "mini-project-675a8.firebaseapp.com",
  projectId: "mini-project-675a8",
  storageBucket: "mini-project-675a8.appspot.com", // 🔧 Corrected from .app to .appspot.com
  messagingSenderId: "822588710960",
  appId: "1:822588710960:web:14780f53a321d4f04c8df5",
  measurementId: "G-YHRXDSF5D7"
};

// 🔥 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 🔐 Firebase Auth
const auth = getAuth(app);

// 🗃 Firebase Firestore DB
const db = getFirestore(app);

// ✅ Export both to use in other files
export { auth, db };