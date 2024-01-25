const express = require('express')
import { initializeApp } from "firebase/app";
const app = express()
const port = 5001

//conexion a la base de datos

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvzTTm3Z5-fsqoKxtUjFifklDd8KqK2KU",
  authDomain: "crud-practica-1-207ad.firebaseapp.com",
  projectId: "crud-practica-1-207ad",
  storageBucket: "crud-practica-1-207ad.appspot.com",
  messagingSenderId: "273331647195",
  appId: "1:273331647195:web:16659c47013d6117d4d2fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);