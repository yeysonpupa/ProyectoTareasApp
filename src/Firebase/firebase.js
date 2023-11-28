import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkolxKfuf40W5HjfKWB70xqF0vgQwDWNk",
  authDomain: "hazya-tareas.firebaseapp.com",
  projectId: "hazya-tareas",
  storageBucket: "hazya-tareas.appspot.com",
  messagingSenderId: "630911807188",
  appId: "1:630911807188:web:53a3a03d87c9e190c69541"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;

  if (user) {
    console.log('Usuario autenticado:', user);
  } else {
    console.log('Usuario cerró sesión');
  }
});

export { auth, db, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, currentUser };
