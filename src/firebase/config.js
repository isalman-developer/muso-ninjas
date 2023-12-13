import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDRyII8sOjxIfP9gIvSj_aX7JwXSv_8u_o",
    authDomain: "muso-ninjas-d9981.firebaseapp.com",
    projectId: "muso-ninjas-d9981",
    storageBucket: "muso-ninjas-d9981.appspot.com",
    messagingSenderId: "795656860779",
    appId: "1:795656860779:web:d2b2355a7c3d71da96ad2e"
};

firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

export { projectAuth, projectFirestore, projectStorage,timestamp };
