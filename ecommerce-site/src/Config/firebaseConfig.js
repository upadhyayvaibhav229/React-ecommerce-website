import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCEYgGkauUCCzS7kU-_K_29YbRc8PuAfzc",
  authDomain: "ecommerce-site-e7dc4.firebaseapp.com",
  projectId: "ecommerce-site-e7dc4",
  storageBucket: "ecommerce-site-e7dc4.appspot.com",
  messagingSenderId: "462907253217",
  appId: "1:462907253217:web:1efd0bf7643dbdd000b2a0",
  measurementId: "G-WYCR650RK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase db
const db = getFirestore(app);

// Initialize Analytics (Only in Browser)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { auth, analytics };

export default app;
