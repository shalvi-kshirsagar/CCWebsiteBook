// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-ZJynkVYbDRfBLfhvB7pmV1p9uSKgvgk",
  authDomain: "blogwebsite-9cb7e.firebaseapp.com",
  projectId: "blogwebsite-9cb7e",
  storageBucket: "blogwebsite-9cb7e.appspot.com",
  messagingSenderId: "770612415942",
  appId: "1:770612415942:web:8e965bc50808fe6dabb6c7",
  measurementId: "G-2L75WYXZX5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);