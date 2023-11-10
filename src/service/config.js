import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const apiKeyVinculo = process.env.REACT_APP_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: apiKeyVinculo,
  //apiKey: "AIzaSyC5NWhcQc2aWNQeru_M4WXgXCHi4CYPGrg",
  authDomain: "black-mamba-grow-shop.firebaseapp.com",
  projectId: "black-mamba-grow-shop",
  storageBucket: "black-mamba-grow-shop.appspot.com",
  messagingSenderId: "226199497736",
  appId: "1:226199497736:web:cda34e8431aaadb915f5bd",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
