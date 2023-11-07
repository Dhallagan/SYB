import React, {useState } from 'react';
import { View, StyleSheet, Button, SafeAreaView, Text, Image, Dimensions, Alert, ScrollView } from 'react-native';
import { signOut } from 'firebase/auth';
import { CustomHeader, Section } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, auth } from '../config';
import { itineraries } from '../mock/itinerary';
import Post from '../components/Post';
import CreatePostModal from '../components/CreatePostModal';

const itinerary = itineraries[1]
const posts =
[
  {
    "username": "Bridgett Y",
    "imageUri": "https://www.travelandleisure.com/thmb/1ZNi1aFJlzZpGXf0vOqdmj_U5VE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-header-vik-reykjavik-iceland-summer-CRUISEICELAND0523-da5be9587e3a4cb1b5efa8ab0d8b6dc8.jpg",
    "caption": "Just dropped new photos of this stunning view during my hike today! 📸 #NatureLover",
    "reactions": {
      "highFives": 12,
    },
    "comments": [
      {
        "username": "Fred",
        "text": "Absolutely stunning photos! Makes me want to pack my bags and head out now. 😍"
      },
      {
        "username": "Johnny",
        "text": "Remarkable capture! Which hiking trail was this?"
      },
      {
        "username": "Beth",
        "text": "Iceland never fails to amaze! Looking forward to more photos. 👏"
      }
    ]
  },
  {
    "username": "Mantas",
    "imageUri": "https://d17t27i218htgr.cloudfront.net/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWt4T0RJM1lUTTBOeTAzWlROa0xUUmhPV1V0T1dFMk9TMHhaRFJoWkRGaFpUQmhNR0VHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--55fab09c6d4353196156b99fcd62677191c06a50/IMG_4503-Edit%20(1).jpg",
    "caption": "🧘‍♀️ Yoga Class Announcement! 🧘‍♂️\n\nJoin us for a serene morning session by the pool.\n\n❗️ Tomorrow  8:30am\n📍 Villa Luna pool (image in next post)\n📌 Bring a towel and water",
    "reactions": {
      "highFives": 0,
    },
    "comments": [
      {
        "username": "Steph",
        "text": "Love these morning sessions, can't wait!"
      },
      {
        "username": "Bridgett Y",
        "text": "The perfect way to start the day. See you there!"
      }
    ]
  },
  {
    "username": "Dylan",
    "imageUri": "",
    "caption": "Has anyone seen some Nike Vapor Maxs by the hottub?",
    "reactions": {
      "highFives": 1,
    },
    "comments": []
  }
]


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
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    const onboardstatus = await AsyncStorage.removeItem('isOnboarded')
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  const openCreatePostModal = () => {
    setModalVisible(true);
  };

  const closeCreatePostModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <CustomHeader
        title="ICELAND 2023"
        rightIcon={{
          name: 'add-circle-outline', // Assuming you have an icon named like this, if not, replace with your own
          onPress: openCreatePostModal,
        }}
        onRightPress={openCreatePostModal}
      />

      {posts.map((post, index) => (
        <Post 
          key={index} // Make sure to add a unique key for each item in a list
          username={post.username} 
          imageUri={post.imageUri} 
          caption={post.caption} 
          comments={post.comments} 
          highFives={post.reactions.highFives}
        />
      ))}

      <Button title='Sign Out' onPress={handleLogout} />

      <CreatePostModal
        visible={modalVisible}
        onClose={closeCreatePostModal}
      />
    </ScrollView>
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
  commentContainer: {
    //borderTopWidth: 1,
    //borderTopColor: 'white', // assuming white fits your design
    padding: 10,
    flexDirection: 'column', // change to 'row' if you want text right beside the username
  },
  commentUsername: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5, // spacing between username and comment text
  },
  commentText: {
    color: 'white',
    lineHeight: 22,
  },
});

export const Comment = ({username, children}) => (
  <View style={styles.commentContainer}>
    <Text style={styles.commentUsername}>{username}</Text>
    <Text style={styles.commentText}>{children}</Text>
  </View>
);
