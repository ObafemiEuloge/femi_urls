// firebase.js
import { initializeApp } from 'firebase/app'; // Import correct pour Firebase 9+
import { getFirestore } from 'firebase/firestore'; // Firestore avec la version modulaire

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCnaTC3l4OxgQnX5VLUWIs1ODp9uF43x8U",
  authDomain: "femiurls.firebaseapp.com",
  projectId: "femiurls",
  storageBucket: "femiurls.appspot.com",
  messagingSenderId: "513835173829",
  appId: "1:513835173829:web:8aae11657c3767a1812dac",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore
const db = getFirestore(app);

export { db };
