// src/firebase/firebaseAuth.js
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  return signInWithPopup(auth, googleProvider);
};

export const doSignOut = async () => {
  return signOut(auth);
};

export { googleProvider };
