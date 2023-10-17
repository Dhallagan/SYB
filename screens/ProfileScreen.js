import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';  // Make sure to install @expo/vector-icons
import { Colors } from '../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

export const ProfileScreen = ({ route, navigation }) => { // <-- include navigation here
  const user = route.params.user;
  const insets = useSafeAreaInsets();

  // This function is called when the back button is pressed.
  const handleBackPress = () => {
    navigation.goBack(); // This will take you back to the previous screen in the stack.
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Back button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name='chevron-left' type='font-awesome' color={'white'} />
        </TouchableOpacity>
      </View>
      <Image 
        source={{ uri: 'https://mdbcdn.b-cdn.net/img/new/avatars/5.webp' }}  // Replace with your image URL or local path
        style={styles.profileImage}
      />

      <Text style={styles.profileName}>Jenavieve Agro</Text>
      <Text style={styles.profileDetail}>From Canada</Text>
      <Text style={styles.profileDetail}>Exploring since 2023</Text>

      <TouchableOpacity style={styles.messageIcon}>
        <MaterialIcons name="message" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.aboutTitle}>aBOUt</Text>
      <Text style={styles.aboutDescription}>Wellness Coordinator ✨🔮</Text>

      <Text style={styles.aboutLink} onPress={() => Linking.openURL('https://instagram.com/agsholis..training')}>
        IG: @agsholis..training
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.black,
  },
  headerContainer: {
    width: '100%', // ensures the container takes full width
    flexDirection: 'row', // children (back button) will align in a row
    alignItems: 'center', // vertically centers the back button
    justifyContent: 'flex-start', // horizontally aligns the back button to the start (left)
    padding: 10,
    height: 100, // You might want to adjust this as per your design requirements
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  profileDetail: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  messageIcon: {
    marginVertical: 20,
  },
  aboutTitle: {
    fontSize: 32,
    // fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    fontFamily: 'California'
  },
  aboutDescription: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white'
  },
  aboutLink: {
    fontSize: 18,
    color: 'lightgray',
    textDecorationLine: 'underline',
  },
  backButton: {
    position: 'absolute',
    top: 10, // Adjust as needed for your layout
    left: 10, // Adjust as needed for your layout
    padding: 10, // Makes area around icon clickable, easier to press
  },
});
