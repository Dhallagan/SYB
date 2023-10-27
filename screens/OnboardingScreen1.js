import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../config'; // import based on your actual file structure
import { doc, updateDoc } from 'firebase/firestore';

// import { storeUserData } from '../api/firebase';


export const OnboardingScreen1 = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('Dylan');
  const [isValid, setIsValid] = useState(true);

  const handleNextPress = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'First Name is required!');
    } else {
      try {
        // Get the current user
        const currentUser = auth.currentUser;
  
        // Validate if there is a logged-in user
        if (currentUser) {
          const userDocRef = doc(db, "user", currentUser.uid);
  
          // Set the 'name' field in the user's document
          await updateDoc(userDocRef, {
            name: name,
          });
  
          // Navigate to the next screen upon successful update
          navigation.navigate('OnboardingScreen2');
        } else {
          // No user is signed in
          Alert.alert('No user found', 'Please sign in and try again.');
        }
      } catch (error) {
        console.log(error);
        // Handle any errors (e.g., from Firebase or network issues)
        Alert.alert('Error', 'An error occurred while updating your data. Please try again.');
      }
    }
  };  

  const handleChangeText = (text) => {
    setName(text);
    if (!isValid) setIsValid(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        <Text style={styles.title}>What's your first name</Text>
        {/* <Text style={styles.subtitle}>How do you want to be called?</Text> */}
        <Text style={styles.note}>
          Your name will be displayed in your interactions.
        </Text>

        <TextInput
          value={name}
          onChangeText={handleChangeText}
          style={styles.input}
          placeholderTextColor="#8D9AB0"
          placeholder="Enter your name"
        />
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleNextPress}>
        <Text style={styles.continueButtonText}>Looks Good</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerAction: {
    color: '#FFF',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  headerTime: {
    color: '#FFF',
    fontSize: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 22,
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'California',
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  note: {
    fontSize: 16,
    color: '#8D9AB0',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    fontSize: 20,
    // color: '#FFF',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    // textAlign: 'center',
    width: Dimensions.get('window').width * 0.9,
  },
  continueButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#121C33',
    fontSize: 18,
  },
});

export default OnboardingScreen1;
