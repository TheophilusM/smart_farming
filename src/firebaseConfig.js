import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDwe9EPTEzd5dUh4J4dHRQ25uDdbAMMZzM",
  authDomain: "smart-farming-project-754cf.firebaseapp.com",
  databaseURL: "https://smart-farming-project-754cf-default-rtdb.firebaseio.com",
  projectId: "smart-farming-project-754cf",
  storageBucket: "smart-farming-project-754cf.appspot.com",
  messagingSenderId: "887634348406",
  appId: "1:887634348406:web:78003c9f86d15c377a1257",
  measurementId: "G-KYB5MY7ZQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dbDatabase = getDatabase(app);
const auth = getAuth(app);

export { app, dbDatabase, auth };