import React from 'react';
import { View, StyleSheet, Button, SafeAreaView, Text, Image, Dimensions, Alert, ScrollView } from 'react-native';
import { signOut } from 'firebase/auth';
import { CustomHeader, Section } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, auth } from '../config';

const lostAndFoundItems = [
  {
    id: '1',
    name: 'Backpack',
    description: 'A outdoor backpack with multiple compartments.',
    imageUri: 'https://levysoutdoor.com/wp-content/uploads/2020/12/LVO-BPTRB-46-BLK_01-1.jpg', // an example image URL; you'd replace this
    location: 'Found in hallway',
    contact: 'John - 123-456-7890',
  },
  {
    id: '2',
    name: 'Water bottle',
    description: 'Stainless steel water bottle with a carabiner clip.',
    imageUri: 'https://m.media-amazon.com/images/I/61bxmY5zi1L._AC_UF1000,1000_QL80_.jpg', // another example image URL
    location: 'Found at hot tub',
    contact: 'Front desk - 987-654-3210',
  },
  // more items...
];

export const LostAndFoundScreen = () => {

  return (
    <ScrollView style={styles.container}>
      <CustomHeader
        title="Lost and Found"
        rightIcon={null}
        onRightPress={() => {
          console.log('Right button pressed!');
        }}
      />

      {/* List out the lost and found items */}
      <View style={styles.itemsList}>
        {lostAndFoundItems.map((item) => (
          <LostAndFoundItem key={item.id} item={item} />
        ))}
      </View>

      {/* ... your existing code ... */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#999', // light grey border for separation
    backgroundColor: '#111',
  },
  itemImage: {
    width: 50, // or whatever size you feel is appropriate
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemDescription: {
    color: '#fff',
  },
  itemLocation: {
    color: '#fff',
  },
  itemContact: {
    color: '#0066cc', // for a touch of color, perhaps your app's primary color
  },

  // ... your existing styles ...
});
  


const LostAndFoundItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemLocation}>Found: {item.location}</Text>
      {/* <Text style={styles.itemContact}>Contact: {item.contact}</Text> */}
    </View>
  </View>
);