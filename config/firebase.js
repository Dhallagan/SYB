import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// add firebase config
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
// initialize firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, db };
