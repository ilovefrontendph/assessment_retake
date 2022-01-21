// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDptigVd4V4VcpbRFcZZCYM5Q-zeS84vkM",
  authDomain: "mangandakita.firebaseapp.com",
  projectId: "mangandakita",
  storageBucket: "mangandakita.appspot.com",
  messagingSenderId: "951490155130",
  appId: "1:951490155130:web:583d157ccbadb25d5161c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
