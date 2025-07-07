import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0FmgPs5laJvvunuB1DjMjSVFDnnNiKsg",
  authDomain: "admin-auth-nisum.firebaseapp.com",
  projectId: "admin-auth-nisum",
  storageBucket: "admin-auth-nisum.firebasestorage.app",
  messagingSenderId: "1092282733125",
  appId: "1:1092282733125:web:409cac63f92a57baf5892c",
  measurementId: "G-C9JCL5EV9S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


