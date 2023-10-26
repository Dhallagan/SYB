import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../config'; // import based on your actual file structure
import { doc, updateDoc } from 'firebase/firestore';

export const OnboardingScreen2 = ({ route, navigation, onCompleted = null }) => {
  const isSimulator = !Device.isDevice;


  const handleEnableNotifications = async () => {
    if (isSimulator) {
      Alert.alert('Running on Simulator', 'Mocking enabling of notifications.');
      // Here, we're retrieving the current authenticated user. Adjust as necessary for your app's auth flow.
      const currentUser = auth.currentUser;
  
      // Validate if there is a logged-in user
      if (currentUser) {
        const userDocRef = doc(db, "user", currentUser.uid);
          console.log('userDocRef', userDocRef);
  
          await updateDoc(userDocRef, {
            expoPushToken: 'expoPushToken[##########]', // The field in the user document where the Expo push token should be stored
          });

        // You might want to navigate away or do something else upon successful completion
        // For example, marking the onboarding as complete
        await AsyncStorage.setItem('isOnboarded', 'true');
        if (route.params.onCompleted) {
          route.params.onCompleted(); // call the function passed from the parent component
        }
      }

    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        try {
          // Get the token that uniquely identifies this device
          const token = (await Notifications.getExpoPushTokenAsync()).data;
  
          // Here, we're retrieving the current authenticated user. Adjust as necessary for your app's auth flow.
          const currentUser = auth.currentUser;
  
          if (currentUser) {
            // Reference to the user's document. This path must match the one in your Firestore database.
            const userDoc = doc(db, "user", currentUser.uid); // Adjust if your user collection is named differently
  
            // Set the user's push token
            await updateDoc(userDoc, {
              expoPushToken: token, // The field in the user document where the Expo push token should be stored
            });
  
            // You might want to navigate away or do something else upon successful completion
            // For example, marking the onboarding as complete
            await AsyncStorage.setItem('isOnboarded', 'true');
            if (onCompleted) {
              onCompleted(); // Or some navigation action
            }
          } else {
            throw new Error('No authenticated user found.');
          }
        } catch (error) {
          console.error(error);
          // Handle errors here
          Alert.alert('Error', 'Could not enable notifications at this time.');
        }
      } else {
        Alert.alert('Notifications permission not granted');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Surf Yoga Beer Works better WITH NOTIFICATIONS ON
        </Text>
        <Text style={styles.subTitle}>
          "Surf Yoga Beer" Would Like to Send You Notifications
        </Text>
        <Text style={styles.description}>
          Notifications may include alerts, sounds, and icon badges. These can
          be configured in Settings. 
        </Text>
        <Text style={styles.emoji}>👉</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleEnableNotifications}
        >
          <Text style={styles.buttonText}>Allow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFF',
    fontFamily: 'California',
    lineHeight: 30,
  },
  subTitle: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
    color: '#FFF',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  emoji: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default OnboardingScreen2;
