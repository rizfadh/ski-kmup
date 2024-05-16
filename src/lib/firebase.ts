import { initializeApp, getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { credential } from "firebase-admin";

const firebaseConfig = {
  apiKey: "AIzaSyD-r2eD0PYiBU2JG2PkvTQGWW0ojcqbjqg",
  authDomain: "ski-kmup.firebaseapp.com",
  projectId: "ski-kmup",
  storageBucket: "ski-kmup.appspot.com",
  messagingSenderId: "361771088018",
  appId: "1:361771088018:web:4a21b2a4099b5faaea0e4b",
  measurementId: "G-45JMT5REE9",
};

const formatKey = (str: string) => str.replace(/\\n/g, "\n");

type CreateFirebaseAdminApp = {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
};

const createFirebaseAdminApp = ({
  projectId,
  clientEmail,
  storageBucket,
  privateKey,
}: CreateFirebaseAdminApp) => {
  if (getApps().length > 0) return getApps()[0];

  const formattedPrivateKey = formatKey(privateKey);
  const cert = credential.cert({
    projectId,
    clientEmail,
    privateKey: formattedPrivateKey,
  });

  return initializeApp({
    credential: cert,
    projectId,
    storageBucket,
  });
};

const app = () => {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  };

  return createFirebaseAdminApp(params);
};

export const storage = getStorage(app()).bucket();
