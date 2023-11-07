import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const Avatar = ({ uri, size, initials }) => {
  // If a URI is provided, render the image. Otherwise, render initials.
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[
          styles.image,
          {
            // You can dynamically change the width and height with the size prop
            width: size,
            height: size,
            borderRadius: size / 2, // This will make it a circle
          },
        ]}
      />
    );
  } else {
    return (
      <View
        style={[
          styles.initialsContainer,
          {
            // Same dynamic size adjustment for initials
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <Text style={styles.initialsText}>{initials}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  image: {
    // The image will cover the view
    resizeMode: 'cover',
  },
  initialsContainer: {
    // Center the initials text
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cccccc', // A neutral background color
  },
  initialsText: {
    // Adjust the text styling as needed
    color: '#ffffff',
    fontSize: 20,
  },
});

export default Avatar;
