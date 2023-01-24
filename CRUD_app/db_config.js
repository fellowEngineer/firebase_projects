import { admin } from "firebase-admin";
import { serviceAccount } from "./service_key.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin.firestore();