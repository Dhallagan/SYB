import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, SafeAreaView, Text, Image, Dimensions, Alert, ScrollView } from 'react-native';
import { signOut } from 'firebase/auth';
import { CustomHeader, Section } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, auth } from '../config';
import { itineraries } from '../mock/itinerary';
import Post from '../components/Post';
import CreatePostModal from '../components/CreatePostModal';
import { getFirestore, collection, query, onSnapshot, doc } from 'firebase/firestore';

import { useAuthentication } from '../contexts/AuthenticationContext';


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
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuthentication(); // Get the authenticated user from context


  const [commentsUnsubscribes, setCommentsUnsubscribes] = useState([]);

useEffect(() => {
  const db = getFirestore();
  const postsQuery = query(collection(db, "posts"));
  const unsubscribePosts = onSnapshot(postsQuery, (querySnapshot) => {
    const postsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      comments: [] // Initialize comments as an empty array
    }));

    // Update state immediately with posts without comments
    setPosts(postsArray);

    // Create a new array for unsubscribe functions
    const newCommentsUnsubscribes = [];

    // Now, set up comment subscriptions for each post
    postsArray.forEach((post, index) => {
      const commentsRef = collection(db, "posts", post.id, "comments");
      const unsubscribeComments = onSnapshot(commentsRef, (commentsSnapshot) => {
        const newComments = commentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Use functional update to ensure we have the latest state
        setPosts(currentPosts => {
          const newPosts = [...currentPosts];
          newPosts[index] = { ...newPosts[index], comments: newComments };
          return newPosts;
        });
      });

      // Push the unsubscribe function for the current post's comments into the array
      newCommentsUnsubscribes.push(unsubscribeComments);
    });

    // Update the state with the new unsubscribe functions
    setCommentsUnsubscribes(newCommentsUnsubscribes);
  });

  // Cleanup function
  return () => {
    unsubscribePosts();
    commentsUnsubscribes.forEach(unsubscribe => unsubscribe());
  };
}, []);
  

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
  console.log('1',posts[0])

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
    <CustomHeader
      title="ICELAND 2023"
      rightIcon={{
        name: 'add-circle-outline', // Assuming you have an icon named like this, if not, replace with your own
        onPress: openCreatePostModal,
      }}
      onRightPress={openCreatePostModal}
    />
    <ScrollView style={styles.container}>


      {posts.map((post, index) => (
        <Post 
          key={index} // Make sure to add a unique key for each item in a list
          postId={post.id}
          username={post.username} 
          imageUri={post.mediaUrl} 
          caption={post.caption} 
          comments={post.comments} 
          highFives={post.reactions?.highFives}
        />
      ))}

      <Button title='Sign Out' onPress={handleLogout} />

      <CreatePostModal
        visible={modalVisible}
        onClose={closeCreatePostModal}
        username={user ? user.name : "Anonymous"} // Assuming the username is stored in the displayName field
      />
    </ScrollView>
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
