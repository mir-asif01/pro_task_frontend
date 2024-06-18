import { app } from "../config/firebase.config.js"
import { createContext, useEffect, useState } from "react";
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, GithubAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const AuthContext = createContext()
const auth = getAuth(app)

function ContextProvider({ children }) {
    const [user, setUser] = useState()
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()

    const signInWithGoogle = async () => {
        try {
            return await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.log("Google Login Error : ", error);
        }
    }

    const signInWithGithub = async () => {
        try {
            return await signInWithPopup(auth, githubProvider)
        } catch (error) {
            console.log("Github loin Error : ", error)
        }
    }

    const handleSignUpWithEmailPass = async (email, password) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log("Email-pass SignUp error : ", error);
        }
    }

    const updateDiplayName = async (name) => {
        try {
            return await updateProfile(auth.currentUser, {
                displayName: name
            }
            )
        } catch (error) {
            console.log("DiplayName update error : ", error);
        }
    }

    const logOut = async () => {
        try {
            return await signOut(auth)
        } catch (error) {
            console.log("Logout error : ", error);
        }
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) setUser(currentUser);
        })
        return () => unsubscribe
    }, [user])

    const authInfo = { user, setUser, signInWithGoogle, signInWithGithub, handleSignUpWithEmailPass, updateDiplayName, logOut }
    return <>
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    </>
}
export default ContextProvider