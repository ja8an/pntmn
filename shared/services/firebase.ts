import * as firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDSYeUQZWmmvHhVygCtBQia5LnYxJmQYZM",
    authDomain: "pntmn-65c80.firebaseapp.com",
    databaseURL: "https://pntmn-65c80.firebaseio.com",
    projectId: "pntmn-65c80",
    storageBucket: "pntmn-65c80.appspot.com",
    messagingSenderId: "719165498468",
    appId: "1:719165498468:web:1f2cab8109a70c879feb71",
    measurementId: "G-F87ZH9NZ2S"
};

firebase.initializeApp(firebaseConfig);

export const firebaseRef = firebase.database().ref();
export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();
export const firebaseStorage = firebase.storage();
export default firebase;