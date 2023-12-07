onst getTrip = async (tripId) => {
    try {
      const tripRef = firebase.firestore().collection('trips').doc(tripId);
      const doc = await tripRef.get();
      if (doc.exists) {
        return doc.data();
      } else {
        console.log('No such trip!');
        return null;
      }
    } catch (error) {
      console.error("Error getting trip: ", error);
    }
  };
  
  const listTrips = async () => {
    try {
      const tripCollection = await firebase.firestore().collection('trips').get();
      return tripCollection.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Error listing trips: ", error);
    }
  };
  
  const getTripsByUser = async (userId) => {
    try {
      const trips = await firebase.firestore().collection('trips').where('guestIds', 'array-contains', userId).get();
      return trips.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Error getting trips by user: ", error);
    }
  };
  
  const createTrip = async (tripData) => {
    try {
      const newTripRef = await firebase.firestore().collection('trips').add(tripData);
      console.log('Trip created with ID: ', newTripRef.id);
    } catch (error) {
      console.error("Error creating trip: ", error);
    }
  };
  
  const updateTrip = async (tripId, tripData) => {
    try {
      await firebase.firestore().collection('trips').doc(tripId).update(tripData);
      console.log('Trip updated');
    } catch (error) {
      console.error("Error updating trip: ", error);
    }
  };
  
  const deleteTrip = async (tripId) => {
    try {
      await firebase.firestore().collection('trips').doc(tripId).delete();
      console.log('Trip deleted');
    } catch (error) {
      console.error("Error deleting trip: ", error);
    }
  };
  
  export {
    getTrip,
    listTrips,
    getTripsByUser,
    createTrip,
    updateTrip,
    deleteTrip,
  };