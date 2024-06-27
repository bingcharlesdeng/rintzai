// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  serverTimestamp,
  addDoc,
  orderBy,
  doc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  getDoc,
  setDoc,
  or,
  deleteDoc,
  limit
} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCJ01FLhx02bbSNDc9-9zzW1oI2paG1Bkw",
  authDomain: "rintzai.firebaseapp.com",
  projectId: "rintzai",
  storageBucket: "rintzai.appspot.com",
  messagingSenderId: "876261149307",
  appId: "1:876261149307:web:f5989c05cb26e7ce02b0de",
  measurementId: "G-QTYQMGGG0L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(auth, 'http://localhost:8000')
// }

export {
  db,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
  orderBy,
  doc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  getDoc,
  setDoc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  auth,
  or,
  deleteDoc,
  limit
};
