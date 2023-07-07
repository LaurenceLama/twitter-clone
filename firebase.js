// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7PwzcHnDF8uhzMQ7g_7RsAxQvhPSqdUE",
  authDomain: "twitter-clone-d26bb.firebaseapp.com",
  projectId: "twitter-clone-d26bb",
  storageBucket: "twitter-clone-d26bb.appspot.com",
  messagingSenderId: "251934067335",
  appId: "1:251934067335:web:0bd0ee2fe4026e302ac622",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app; //only one thing can be exported DEFAULTly
export { db, storage };
