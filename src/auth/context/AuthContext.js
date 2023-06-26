'use client'
import { createContext, useContext, useEffect , useState } from "react";
import { auth , dbCollection, provider } from "../config/config.js";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation.js";
import { addDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    async function logout() {
        return signOut(auth);
    }

    async function signInPopup() {
        return signInWithPopup(auth , provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            router.push('/');
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode , errorMessage);
          });;
    }

    async function addData(movieData) {
        try {
            const newDoc = await addDoc(dbCollection, movieData);
            console.log("Data added successfully");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loading,
        logout,
        signInPopup,
        addData,
    }

    return(
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
