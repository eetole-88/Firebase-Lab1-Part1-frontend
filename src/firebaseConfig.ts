import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmT-MigsZ8HpH01cK8YyLWZVjsB8rPOHA",
  authDomain: "fir-lab-part1.firebaseapp.com",
  projectId: "fir-lab-part1",
  storageBucket: "fir-lab-part1.appspot.com",
  messagingSenderId: "981577081572",
  appId: "1:981577081572:web:e86d786804064c6d4642f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}

export function signOut(): void {
  auth.signOut();
}
