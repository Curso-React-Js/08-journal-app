import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers';

// console.log(import.meta.env);
// console.log(process.env);
const env = getEnvironments();
console.log(env);

// Dev/Prod
// const firebaseConfig = {
//   apiKey: 'AIzaSyDMYe3ExY0ONoIlHC2afugpw0TkA2XvpWQ',
//   authDomain: 'react-cursos-6e1f5.firebaseapp.com',
//   projectId: 'react-cursos-6e1f5',
//   storageBucket: 'react-cursos-6e1f5.appspot.com',
//   messagingSenderId: '1008526551171',
//   appId: '1:1008526551171:web:14d7ee463c268c724c53b6'
// };

// DB para testing
const firebaseConfig = {
  apiKey: "AIzaSyAic2dlUYjEKEeqNriNxRHIkk7ErRJthZ0",
  authDomain: "vue-demos-d239a.firebaseapp.com",
  databaseURL: "https://vue-demos-d239a-default-rtdb.firebaseio.com",
  projectId: "vue-demos-d239a",
  storageBucket: "vue-demos-d239a.appspot.com",
  messagingSenderId: "531116176863",
  appId: "1:531116176863:web:4edc665d99af22d7ae006a"
};

export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );