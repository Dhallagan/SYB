import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../config'; // import based on your actual file structure
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import { useContext } from 'react';

export const OnboardingScreen2 = ({ route }) => {
  const isSimulator = !Device.isDevice;
  const { refreshAuth } = useContext(AuthenticationContext);

  const updateUserWithToken = async (token) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No authenticated user found.');
      }

      const userDocRef = doc(db, "user", currentUser.uid); // Check your collection name if it's 'users' or 'user'
      await setDoc(userDocRef, {
        expoPushToken: token,
        onboarded: true,
      }, { merge: true }); // The merge option ensures we don't overwrite the entire document
  
    } catch (error) {
      console.error('Error updating user token:', error);
      Alert.alert('Error', 'Could not update user settings at this time.');
    }
  };

  const handleEnableNotifications = async () => {
    let token = isSimulator ? 'simulator-dummy-token' : null; // Default dummy token for simulator

    if (!isSimulator) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Notifications permission not granted');
        return;
      }

      const expoPushToken = await Notifications.getExpoPushTokenAsync({ projectId: process.env.EXPO_PUBLIC_PROJECT_ID });
      token = expoPushToken.data;
    } else {
      Alert.alert('Running on Simulator', 'Mocking enabling of notifications.');
    }

    await updateUserWithToken(token);
    await AsyncStorage.setItem('expoPushToken', token); // Store the token locally
    await refreshAuth();
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
