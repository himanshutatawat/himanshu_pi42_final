import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDoDLN77k4Vzic5eMTFpWSgQfr_RTSQnIs",
  authDomain: "himanshu-pi42.firebaseapp.com",
  projectId: "himanshu-pi42",
  storageBucket: "himanshu-pi42.appspot.com",
  messagingSenderId: "927671934716",
  appId: "1:927671934716:web:8e2523ff828f1e3eadc179",
  measurementId: "G-78Q0K1G0JZ"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };