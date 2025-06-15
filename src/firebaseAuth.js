// src/firebaseAuth.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-msg-sender-id",
  appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 Auto login function using test credentials
export const loginUser = () => {
  signInWithEmailAndPassword(auth, "test@gmail.com", "123456")
    .then((userCredential) => {
      console.log("✅ Logged in as:", userCredential.user.email);
    })
    .catch((error) => {
      console.error("❌ Login failed:", error.message);
    });
};

export { auth };