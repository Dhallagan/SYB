import { db, auth } from '../config/firebase'; // importing the db instance from your firebase config
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from "firebase/firestore"; 

export const getMe = async () => {
  try {
    const user = auth.currentUser; // defining the user variable
    if (user) {
      // User is signed in.
      console.log('User signed in', user);
    } else {
      // No user is signed in.
      console.log('No user signed in.');
    }
  }
  catch (error) {
    console.log(error);
  }
}

export const checkUserOnboardedStatus = async (userId) => {
  try {
    // Get a reference to the user's document
    const userDocRef = doc(db, 'users', userId); // assuming the collection is 'users' not 'user'

    // Fetch the document from Firestore
    const userDocSnapshot = await getDoc(userDocRef);

    // Check if the document exists
    if (userDocSnapshot.exists()) {
      // Access the data of the document
      const userData = userDocSnapshot.data();

      // Return the 'onboarded' status, or false if not available
      return userData ? userData.onboarded : false;
    } else {
      console.log('No such user!');
      return false; // No document exists
    }
  } catch (error) {
    console.error("Error fetching user", error);
    return false; // Return false in case of an error
  }
};

export const getUser = async (userId) => { // corrected arrow function syntax
  try {
    const userDocument = await db.collection('user').doc(userId).get(); // using 'users' collection
    
    if (userDocument.exists) {
      return userDocument.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user", error);
  }
}

export const upsertUser = async (userId, userData) => { // corrected arrow function syntax
  try {
    await setDoc(doc(db, "user", userId), userData);
    // await db.collection('user').doc().set(userData, { merge: true }); // using 'users' collection
  
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}

// export const deleteUser = async (userId) => { // corrected arrow function syntax
//   try {
//     await db.collection('user').doc(userId).delete(); // using 'users' collection
//     console.log("User successfully deleted!");
//   } catch (error) {
//     console.error("Error removing document: ", error);
//   }
// }
