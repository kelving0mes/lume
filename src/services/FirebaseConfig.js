// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXDAo2gkOR-ZCjiUatorRt0QtMIspFy_4",
  authDomain: "lume-app-b1c10.firebaseapp.com",
  projectId: "lume-app-b1c10",
  storageBucket: "lume-app-b1c10.firebasestorage.app",
  messagingSenderId: "816555971079",
  appId: "1:816555971079:web:82c16284f221e1286f90a2",
  measurementId: "G-WNJLB81DXR"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);