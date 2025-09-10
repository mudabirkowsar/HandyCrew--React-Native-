// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBN_ygyv4Vd80HeyKwuVnA5HT2cdQPLE_g",
    authDomain: "handycrew-33651.firebaseapp.com",
    projectId: "handycrew-33651",
    storageBucket: "handycrew-33651.firebasestorage.app",
    messagingSenderId: "731270053360",
    appId: "1:731270053360:web:96567dea56f4f943853135"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)