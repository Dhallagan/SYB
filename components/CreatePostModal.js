import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker'; // Import from expo-image-picker instead
// Import Firebase services from your config file
import { db, storage } from '../config/firebase';
import { ref as storageRef, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


const CreatePostModal = ({ visible, onClose, username }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [isVideo, setIsVideo] = useState(false); // Add this line

  // Request permission to access the media library
  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  // // Handle choosing photo from the library
  // const handleChoosePhoto = async () => {
  //   try {
  //     await getPermission();
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //       // noData: true,
  //     });

  //     if (!result.cancelled) {
  //       console.log('Selected image URI:', result.uri);
  //       setImage(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'An error occurred while accessing the library.');
  //     console.log(error);
  //   }
  // };

  // // Handle taking new photo using camera
  // const handleTakePhoto = async () => {
  //   await getPermission();
  //   let result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //     saveToPhotos: true,
  //   });

  //   if (!result.cancelled) {
  //     console.log(result);
  //     setImage(result.uri);
  //   }
  // };

  const handleChooseMedia = async () => {
    try {
        await getPermission();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, // Changed to All to include videos
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
          console.log('Selected media URI:', result.assets[0].uri);
            setImage(result.assets[0].uri);
            setIsVideo(result.type === 'video'); // Set a flag if the selected media is a video
        }
    } catch (error) {
        Alert.alert('Error', 'An error occurred while accessing the library.');
        console.log(error);
    }
  };

  const uploadMediaToFirebase = async (mediaUri, isVideo) => {
    const response = await fetch(mediaUri);
    const blob = await response.blob();
    const fileRef = storageRef(storage, `uploads/${new Date().toISOString()}.${isVideo ? 'mp4' : 'jpg'}`);
    await uploadBytes(fileRef, blob);
    return await getDownloadURL(fileRef);
};

const createPostInFirestore = async (caption, mediaUrl, isVideo) => {
    const post = {
      username, // Include the username in the post object
      caption,
      mediaUrl,
      mediaType: isVideo ? 'video' : 'image',
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(db, 'posts'), post);
};

  // Handle the submit action
  const handleSubmit = async () => {
    try {
        if (image) {
            const mediaUrl = await uploadMediaToFirebase(image, isVideo);
            await createPostInFirestore(caption, mediaUrl, isVideo);
        } else {
            // Handle case where no media is selected
            console.log('No media selected');
        }
        setCaption('');
        setImage(null);
        onClose();
    } catch (error) {
        console.error('Error creating post:', error);
    }
  };

  return (
    <SafeAreaView>
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{color: 'white', fontSize: 20 }}>Close</Text>
            </TouchableOpacity>
            <View style={{ flex: 0, alignContent: 'center', }}>
              <Text style={{color: 'white', fontSize: 24, fontWeight: 800, fontFamily: 'California', paddingTop: 10  }}>New Post</Text>
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.closeButton}>
              <Text style={{color: 'gray', fontSize: 20, fontWeight: 800  }}>Share</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{flex: 0, flexDirection: 'row' }}>
            <TouchableOpacity onPress={handleChooseMedia} style={styles.button}>
                <Text style={{ color: 'white' }}>Choose Media</Text>
            </TouchableOpacity>
{/*             
            <TouchableOpacity onPress={handleChoosePhoto} style={styles.button}>
              <Text style={{color: 'white' }}>Choose Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleTakePhoto} style={styles.button}>
              <Text  style={{color: 'white' }}>Take Photo</Text>
            </TouchableOpacity> */}
          </View>

          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Share with your guests"
            onChangeText={setCaption}
            value={caption}
            placeholderTextColor={'white'}
          />

          {image && (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          )}

        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#000', // Set a background color for the modal
    paddingTop: 50
  },
  headerContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginRight: 10,
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    // margin: 10,
    width: '100%',
    height: 150,
    textAlignVertical: 'top',
    color: 'white',
    // backgroundColor: 'red',
  },
  imagePreview: {
    margin: 10,
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
    alignSelf: 'center',
  },
  button: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#111',
  }
});

export default CreatePostModal;
