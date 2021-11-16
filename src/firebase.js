import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBAvMomDIZI8lD8KoNPZ1tWwIe5arZ8mkg",
    authDomain: "linkedin-88fed.firebaseapp.com",
    projectId: "linkedin-88fed",
    storageBucket: "linkedin-88fed.appspot.com",
    messagingSenderId: "219687867990",
    appId: "1:219687867990:web:5e5a2eedba24c256a20df7"
  };
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
