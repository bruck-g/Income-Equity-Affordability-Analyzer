// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKsfF38WfSK0fY8VWS0HEwehIU6zx47FM",
  authDomain: "income-analyzer-19ca0.firebaseapp.com",
  projectId: "income-analyzer-19ca0",
  storageBucket: "income-analyzer-19ca0.firebasestorage.app",
  messagingSenderId: "168091297021",
  appId: "1:168091297021:web:632b01f63bc0941dc8ca94",
  measurementId: "G-7EQ8C5HDKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { db };
