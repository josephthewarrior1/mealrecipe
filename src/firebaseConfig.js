// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDzAcGagYkfiS6qR5sDN29roepiDKIoy7s",
  authDomain: "meal-recipe-c100c.firebaseapp.com",
  databaseURL: "https://meal-recipe-c100c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "meal-recipe-c100c",
  storageBucket: "meal-recipe-c100c.appspot.com",
  messagingSenderId: "22114092058",
  appId: "1:22114092058:web:e9aaf8525763d1962d7da3",
  measurementId: "G-YSB8WSSG7T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
