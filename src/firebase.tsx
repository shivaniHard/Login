import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlkdREGOuLXK9kAjUAXSCiXsc7nV_A2hU",
  authDomain: "login-afd65.firebaseapp.com",
  projectId: "login-afd65",
  storageBucket: "login-afd65.firebasestorage.app",
  messagingSenderId: "187587844443",
  appId: "1:187587844443:web:eb800d73388a765a84227e",
  measurementId: "G-TC22XRX53J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signup = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
    // Store user in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email: email
    });

    return user;
  } catch (error) {
    console.error(error);
    
    alert(error); // Display a user-friendly error message
  }
};

// Login function
const login = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user; // Return the authenticated user
  } catch (error) {
    console.error(error);
    alert(error); // Display a user-friendly error message
  }
};

// Logout function
const logout = () => {
  signOut(auth);
};

export { auth, db, signup, login, logout };
