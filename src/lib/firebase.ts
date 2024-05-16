import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-r2eD0PYiBU2JG2PkvTQGWW0ojcqbjqg",
  authDomain: "ski-kmup.firebaseapp.com",
  projectId: "ski-kmup",
  storageBucket: "ski-kmup.appspot.com",
  messagingSenderId: "361771088018",
  appId: "1:361771088018:web:4a21b2a4099b5faaea0e4b",
  measurementId: "G-45JMT5REE9",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const storage = getStorage(app);
