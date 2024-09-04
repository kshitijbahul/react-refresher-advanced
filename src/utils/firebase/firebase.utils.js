// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    getDocs,
    collection,
    query,
    writeBatch, // for writing thimgs as a transaction batch 
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "retrorise-selflearning.firebaseapp.com",
    projectId: "retrorise-selflearning",
    storageBucket: "retrorise-selflearning.appspot.com",
    messagingSenderId: "695642654421",
    appId: "1:695642654421:web:5377730e73ce960f0a845c"
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
const signInWithGooglePopup = () => signInPopup(googleProvider);
const signInGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


const db = getFirestore(app);

const addCollectionAndDocuments =  async (collectionName, objectsToAdd) => {
    const collectionRef = collection(db, collectionName);
    const batch = writeBatch(db);
    objectsToAdd.forEach(( object )=> {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef,object);
    });
    await batch.commit();
    console.log('Collection added');

}

const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const queryRef = query(collectionRef);
    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data()); 
}

const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
    if (! userAuth) return ;
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
                ...additionalInfo,
            });
        }catch (error) {
            console.error('Error creating user', error.message);
        }
    }
    return userSnapShot;
}


const createAuthUserWithEmailAndPassword = async ({ email, password }) => {
    if (! email || ! password) return ;
    console.log('email is ', email);
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User with createAuthUserWithEmailAndPassword is ', response);
        return response
    } catch (error) {
        console.error('Error creating user', error.message);
    }
}

const signInWithEmail = async ( email, password) => {
    if (! email || ! password) return ;
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log('User with signInWithEmailAndPassword is ', response);
    return response;
}

const signOutUser = async () => signOut(auth);

const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback); 

export const getCurrentUser = () => {
    return new Promise((resolve,reject)=>{
        const unsubscribe = onAuthStateChanged(auth, (userAuth)=> {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}


export {
    auth,
    googleProvider,
    githubProvider,
    createUserDocFromAuth,
    signInPopup,
    signInWithGooglePopup,
    signInGoogleRedirect,
    signInWithEmail,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    onAuthStateChangedListener,
    addCollectionAndDocuments,
    getCategoriesAndDocuments,
}
