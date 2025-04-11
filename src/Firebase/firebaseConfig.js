// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAcBU9mJbex3ibECy-q6I8jj4tjfG8HSgA",
   authDomain: "bookshelf-599a4.firebaseapp.com",
   projectId: "bookshelf-599a4",
   storageBucket: "bookshelf-599a4.appspot.com",
   messagingSenderId: "714069735541",
   appId: "1:714069735541:web:a731bade360f104855603c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)