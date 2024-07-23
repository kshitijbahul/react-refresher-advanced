// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from 'firebase/auth';
import { set } from "firebase/database";


import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters(
    { prompt: 'select_account' }
);

const githubProvider = new GithubAuthProvider();
githubProvider.setCustomParameters(
    { prompt: 'select_account' }
);

const auth = getAuth(app);
const signInPopup = (provider) => signInWithPopup(auth, provider);


const db = getFirestore(app);

const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log('userDocRef is ', userDocRef);
    const userSnapShot = await getDoc(userDocRef);
    console.log('userSnapShot is ', userSnapShot);  
    console.log('userSnapShot.exists() is ', userSnapShot.exists());
    if (! userSnapShot.exists()) {
        try {
            setDoc(userDocRef, {
                displayName: userAuth.displayName,
                email: userAuth.email,
                createdAt: new Date(),
            });
        }catch (error) {
            console.error('Error creating user', error.message);
        }
    }
    return userDocRef;
}


export {
    auth,
    googleProvider,
    githubProvider,
    createUserDocFromAuth,
    signInPopup,
}
