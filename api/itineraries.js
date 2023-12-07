import firebase from 'firebase/app';
import 'firebase/firestore';

const getItinerary = async (tripId, date) => {
  try {
    const itineraryRef = firebase.firestore().collection('trips').doc(tripId).collection('itineraries').doc(date);
    const doc = await itineraryRef.get();
    if (doc.exists) {
      return doc.data();
    } else {
      console.log('No such itinerary!');
      return null;
    }
  } catch (error) {
    console.error("Error getting itinerary: ", error);
  }
};

const listItineraries = async (tripId) => {
  try {
    const itineraryCollection = await firebase.firestore().collection('trips').doc(tripId).collection('itineraries').get();
    return itineraryCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error listing itineraries: ", error);
  }
};

const addItinerary = async (tripId, date, itineraryData) => {
  try {
    const itineraryRef = firebase.firestore().collection('trips').doc(tripId).collection('itineraries').doc(date);
    await itineraryRef.set(itineraryData);
    console.log('Itinerary added');
  } catch (error) {
    console.error("Error adding itinerary: ", error);
  }
};

const updateItinerary = async (tripId, date, itineraryData) => {
  try {
    const itineraryRef = firebase.firestore().collection('trips').doc(tripId).collection('itineraries').doc(date);
    await itineraryRef.update(itineraryData);
    console.log('Itinerary updated');
  } catch (error) {
    console.error("Error updating itinerary: ", error);
  }
};

const deleteItinerary = async (tripId, date) => {
  try {
    const itineraryRef = firebase.firestore().collection('trips').doc(tripId).collection('itineraries').doc(date);
    await itineraryRef.delete();
    console.log('Itinerary deleted');
  } catch (error) {
    console.error("Error deleting itinerary: ", error);
  }
};

export {
  getItinerary,
  listItineraries,
  addItinerary,
  updateItinerary,
  deleteItinerary,
};
