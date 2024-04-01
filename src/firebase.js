import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID
};

export const firebaseApp = initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
    prompt : "select_account "
});
export const auth = getAuth(firebaseApp);

export const storage = getStorage(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleAuthProvider);

export const getDatasetUrl = async () => getDownloadURL(ref(storage, 'files/exercisesdataset.json'))
.then((url) => url)
.catch((error) => {console.log(error)});