import * as firebase from "firebase/app";
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAsQQMZ36qtfxuvqx7-DxZi0oWFUBwstCk",
  authDomain: "portfolio-fd39f.firebaseapp.com",
  projectId: "portfolio-fd39f",
  storageBucket: "portfolio-fd39f.appspot.com",
  messagingSenderId: "1079718080286",
  appId: "1:1079718080286:web:e9b763029249a0b8a5a30f",
  measurementId: "G-5CC0DTQB08",
};

export default firebase.initializeApp(firebaseConfig);
