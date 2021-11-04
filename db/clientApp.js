import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDgdjnoER966DG6J15Ned4xybzGl_znz5E',
  authDomain: 'testtailwind-6b997.firebaseapp.com',
  projectId: 'testtailwind-6b997',
  storageBucket: 'testtailwind-6b997.appspot.com',
  messagingSenderId: '1018800786604',
  appId: '1:1018800786604:web:91a9a555c76f8e7775a309',
  measurementId: 'G-8MKJQ807GV',
};

const app = initializeApp(firebaseConfig);

export default getFirestore();
