import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAgjc2Mc7ZO5LxKNG8hN9ylrlLp1C3xbxk",
    authDomain: "nirvana-iot.firebaseapp.com",
    projectId: "nirvana-iot",
    storageBucket: "nirvana-iot.firebasestorage.app",
    messagingSenderId: "280629526536",
    appId: "1:280629526536:web:d32cb153cbbbdacf82d1bd",
    measurementId: "G-DHQL0H8KKF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
