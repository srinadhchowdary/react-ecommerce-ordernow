// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASjhdDMlsG-fKbnKXKMN4a9EYHFpDUF4A",
  authDomain: "ordernow-e-commerce.firebaseapp.com",
  projectId: "ordernow-e-commerce",
  storageBucket: "ordernow-e-commerce.appspot.com",
  messagingSenderId: "525528175290",
  appId: "1:525528175290:web:85fdb9a625fd6b2d8b2883",
  measurementId: "G-04950F6VXR"
};

// Initialize Firebase
export const app=initializeApp(firebaseConfig);