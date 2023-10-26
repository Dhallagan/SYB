import React from 'react';
import { View, StyleSheet, Button, SafeAreaView, Text, Image, Dimensions, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { CustomHeader, Section } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, auth } from '../config';
import { itineraries } from '../mock/itinerary';

const itinerary = itineraries[1]

const screenWidth = Dimensions.get('window').width;

// Assuming you know the original dimensions of the image. If these are unknown, they would need to be determined dynamically.
const originalWidth = 1920; // example values
const originalHeight = 1080; // example values

// Calculate the aspect ratio of the image
const aspectRatio = originalWidth / originalHeight;

// Adjust the width for the padding, and calculate the new height based on the aspect ratio.
const imageWidth = screenWidth - 20; // account for padding; 10 from each side
const imageHeight = imageWidth / aspectRatio;

export const HomeScreen = () => {
  const handleLogout = async () => {
    const onboardstatus = await AsyncStorage.removeItem('isOnboarded')
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        title="ICELAND 2023"
        rightIcon={null}
        onRightPress={() => {
          console.log('Right button pressed!');
        }}
      />

      {/* <Text style={{ fontSize: 48, padding: 5, margin: 5, color: 'white', alignSelf: 'center', fontFamily: 'California' }}>tODAY</Text> */}

      <Section title={'tOMORROW'}>
        <Text style={{ color: 'white', fontSize: 16, lineHeight: 22, fontWeight: 'bold' }}>YOGA CLASS</Text>
        <Text style={{ color: 'white', fontSize: 16, lineHeight: 22 }}>❗️ Tomorrow @ 8:30am</Text>
        <Text style={{ color: 'white', fontSize: 16, lineHeight: 22 }}>📍 Meet at at the Villa Luna pool (Shown in pic)</Text>
        <Text style={{ color: 'white', fontSize: 16, lineHeight: 22 }}>📍 Bring a towel and water 💦🤘</Text>
        <Text>tet</Text>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://d17t27i218htgr.cloudfront.net/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWt4T0RJM1lUTTBOeTAzWlROa0xUUmhPV1V0T1dFMk9TMHhaRFJoWkRGaFpUQmhNR0VHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--55fab09c6d4353196156b99fcd62677191c06a50/IMG_4503-Edit%20(1).jpg' }} 
            style={{ 
              width: imageWidth, 
              height: imageHeight,
              alignSelf: 'stretch', 
              resizeMode: 'cover',
              // margin: 10, // this ensures padding on both sides
            }} 
          />
        </View>
      </Section>
      
      <Button title='Sign Out' onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  imageContainer: {
    // margin: 10, // This will serve as padding around the image.
    alignItems: 'center', // To align the image in the center of the container
    justifyContent: 'center', // Works with alignItems to center the image
  },
});

