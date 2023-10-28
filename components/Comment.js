import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Comment component (you can put this in a separate file e.g., Comment.js)
export const Comment = ({username, children}) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentUsername}>{username}</Text>
      <Text style={styles.commentText}>{children}</Text>
    </View>
  );
  
  const styles = StyleSheet.create({
    // ... other styles ...
    commentContainer: {
      borderTopWidth: 1,
      borderTopColor: 'white', // assuming white fits your design
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
    // ... other styles ...
  });
  