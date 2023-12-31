import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
})

export const db = getFirestore();
export const dbCollection = collection(db, "movies");
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export default app