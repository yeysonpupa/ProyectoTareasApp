import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAkolxKfuf40W5HjfKWB70xqF0vgQwDWNk",
  authDomain: "hazya-tareas.firebaseapp.com",
  projectId: "hazya-tareas",
  storageBucket: "hazya-tareas.appspot.com",
  messagingSenderId: "630911807188",
  appId: "1:630911807188:web:53a3a03d87c9e190c69541"
};

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

export { auth, signOut };
