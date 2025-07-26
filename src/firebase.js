import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//  Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyBoFB-2BaMSHNEXfR3Aezl31CDhNGu9LHU",
  authDomain: "mini-project-675a8.firebaseapp.com",
  projectId: "mini-project-675a8",
  storageBucket: "mini-project-675a8.appspot.com", 
  messagingSenderId: "822588710960",
  appId: "1:822588710960:web:14780f53a321d4f04c8df5",
  measurementId: "G-YHRXDSF5D7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };