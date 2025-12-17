import admin from "firebase-admin";
const serviceAccount = require("../config/firebase-service-account.json");
if (process.env.NODE_ENV !== "test" && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firebaseAdmin = admin;
