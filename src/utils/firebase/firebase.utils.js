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
    
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=> {
        const {title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    return categoryMap;
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
    return userDocRef;
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




export {
    auth,
    googleProvider,
    githubProvider,
    createUserDocFromAuth,
    signInPopup,
    signInGoogleRedirect,
    signInWithEmail,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    onAuthStateChangedListener,
    addCollectionAndDocuments,
    getCategoriesAndDocuments,
}
