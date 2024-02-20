import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvhdj_FrsCoZIaYkl2UrR3ZO4sL9lVy3Y",
  authDomain: "guessmelody-c9113.firebaseapp.com",
  projectId: "guessmelody-c9113",
  storageBucket: "guessmelody-c9113.appspot.com",
  messagingSenderId: "61800612118",
  appId: "1:61800612118:web:9601130bcd8631ad8c5037",
  measurementId: "G-E705HMXTXF",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore, addDoc, collection };
