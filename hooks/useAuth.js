import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setUsername(user.displayName)
                setUserEmail(user.emal)
            }
            else {
                setUser(null)
                setUsername("")
                setUserEmail("")
            }
        })
        return unsub
    }, [])
    return { user, username, userEmail }
}