import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Comment = ({ username, text, children }) => (
  <View style={styles.commentContainer}>
    <Text style={styles.commentUsername}>{username}</Text>
    <Text style={styles.commentText}>{text || children}</Text>
  </View>
);

const styles = StyleSheet.create({
  commentContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: '#343434', // a slightly lighter dark border for subtle separation
    paddingVertical: 4,
    paddingHorizontal: 12,
    // backgroundColor: '#1E1E1E', // a dark background for the comments
    flexDirection: 'row', // align username and comment text in a row
    alignItems: 'flex-start', // align items to the start of the flex direction
  },
  commentUsername: {
    color: '#FFFFFF', // white or a light color for the username for contrast
    fontWeight: '600', // semi-bold for the username
    marginRight: 6, // add some space between the username and the comment text
  },
  commentText: {
    flex: 1, // take the remaining space for the comment text
    color: '#BBBBBB', // a lighter gray to contrast against the dark background
    lineHeight: 16, // adjusted line height for better readability
    fontSize: 14, // standard font size for the text
  },
  // ... other styles ...
});
