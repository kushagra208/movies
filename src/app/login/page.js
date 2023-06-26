'use client'
import { useAuth } from "@/auth/context/AuthContext";
import styles from "./login.module.css"
export default function Login() {
    const { signInPopup } = useAuth();

    return(
        <div className={styles.Container}>
            <button className={styles.btn} onClick={() => signInPopup()}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login Using Google</button>
        </div>
    );
}