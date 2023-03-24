import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyDMYe3ExY0ONoIlHC2afugpw0TkA2XvpWQ',
  authDomain: 'react-cursos-6e1f5.firebaseapp.com',
  projectId: 'react-cursos-6e1f5',
  storageBucket: 'react-cursos-6e1f5.appspot.com',
  messagingSenderId: '1008526551171',
  appId: '1:1008526551171:web:14d7ee463c268c724c53b6'
};

export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );