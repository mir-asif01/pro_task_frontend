import { app } from "../config/firebase.config.js"
import { createContext, useEffect, useState } from "react";
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, GithubAuthProvider } from "firebase/auth";

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

    const logOut = async () => {
        try {
            return signOut(auth)
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

    const authInfo = { user, setUser, signInWithGoogle, signInWithGithub, logOut }
    return <>
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    </>
}
export default ContextProvider