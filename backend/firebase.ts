import admin from "firebase-admin";

import serviceAccount from "./firebaseServiceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const firebaseAdmin = admin;
