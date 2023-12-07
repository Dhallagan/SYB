const getUser = async (userId) => {
    try {
      const userRef = firebase.firestore().collection('users').doc(userId);
      const doc = await userRef.get();
      if (doc.exists) {
        return doc.data();
      } else {
        console.log('No such user!');
        return null;
      }
    } catch (error) {
      console.error("Error getting user: ", error);
    }
  };

  const listUsers = async () => {
    try {
      const userCollection = await firebase.firestore().collection('users').get();
      return userCollection.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Error listing users: ", error);
    }
  };
  
  const createUser = async (userData) => {
    try {
      const newUserRef = await firebase.firestore().collection('users').add(userData);
      console.log('User created with ID: ', newUserRef.id);
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };
  
  const updateUser = async (userId, userData) => {
    try {
      await firebase.firestore().collection('users').doc(userId).update(userData);
      console.log('User updated');
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await firebase.firestore().collection('users').doc(userId).delete();
      console.log('User deleted');
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  export {
    getUser,
    listUsers,
    createUser,
    updateUser,
    deleteUser,
  };
  