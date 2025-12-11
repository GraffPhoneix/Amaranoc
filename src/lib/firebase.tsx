import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCLJSry0gs2qqzOLbKBLVfSNiENq8SZpA4",
    authDomain: "amaranoc-db-46faa.firebaseapp.com",
    databaseURL: "https://amaranoc-db-46faa-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "amaranoc-db-46faa",
    storageBucket: "amaranoc-db-46faa.firebasestorage.app",
    messagingSenderId: "1071521452058",
    appId: "1:1071521452058:web:539fa575ef49e8a1ef41a3",
    measurementId: "G-0BVYWDXZNL"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const rtdb = getDatabase(app);

export async function getRootData() {
    const dbRef = ref(rtdb);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return null;
    }
}

export async function getData(path: string) {
    try {
        const dbRef = ref(rtdb, path);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            return snapshot.val();
        }
        return null;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
