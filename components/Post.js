// Post.js
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Comment } from './Comment'; // Make sure this is properly imported from its path
import { formatDistanceToNowStrict } from "date-fns";
import { Avatar } from './Avatar'

// You can define a dark theme color scheme here or import it from your 'Colors' config
const darkThemeColors = {
  background: '#1E1E1E', // Dark background for the entire post container
  text: '#FFFFFF', // Light text for high contrast on dark background
  subtext: '#BBBBBB', // Subtle text for less important information
  border: '#343434', // Border color for dividing sections
};


const PostHeader = ({ username, createdAt }) => {
    return (
        <View style={styles.headerContainer}>
        <View style={styles.leftHeader}>
          {/* Progress Avatar */}
            <Avatar size={24} uri={'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'}/>

        </View>
        <View style={styles.rightHeader}>
          <Text  style={styles.username}>{username}</Text>
          <Text style={styles.time}>{`${formatDistanceToNowStrict(
            new Date('2023-11-06'),
          )} ago`}</Text>
        </View>
      </View>      
    )
}

const PostImage = ({ imageUri }) => {
    return (
        <>
        {imageUri ? (
            <Image 
              source={{ uri: imageUri }} 
              style={styles.postImage} 
            />
          ) : null}
          </>
    )
}

const PostFooter = ({ username, highFives, caption }) => {
    return (
        <>
                    <View style={{marginTop: '5px'}}>
                <Caption username={username} caption={caption}/>
            </View>
            <View style={styles.topContainer}>
            {/*  */}
                <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => {}}
                >
                    <Text style={{ color: "#fff", fontSize: 14 }}>✋</Text>
                    {highFives ? (
                        <Text style={{ color: "#fff", fontSize: 14 }}>
                        {highFives}
                        </Text>
                    ) : (
                        <Text style={{ color: "#fff", fontSize: 14 }}></Text>
                    )}
                </TouchableOpacity>
            </View>

        </>
    )
}

const Caption = ({ username, caption}) => {
    return (
        <View style={styles.textContainer}>
            {/* <Text style={styles.username}>{username}</Text> */}
            <Text style={styles.caption}>{caption}</Text>
        </View>
    )
}

const Post = ({ username, imageUri, caption, comments, highFives }) => {
  return (
    <View style={styles.postContainer}>
      <PostHeader username={username} createdAt={new Date()} />
        <PostImage imageUri={imageUri} />
        <PostFooter username={username} highFives={highFives} caption={caption} />
        
      {/* <View style={styles.commentsContainer}>
        {comments.map((comment, index) => (
          <Comment key={index} username={comment.username} text={comment.text} />
        ))}
      </View> */}
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth - 20; // Add more padding for the image
const imageHeight = imageWidth * 9 / 16; // Assuming a 16:9 aspect ratio for simplicity

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#111",
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderTopWidth: 1,
    borderTopColor: '#343434',
  },
  headerContainer: {
    flex: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 2,
  },
  leftHeader: {
    flex: 0,
    flexDirection: "row",
  },
  rightHeader: {
    flex: 1,
    color: "#fff",
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderBottomColor: darkThemeColors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  time: {
    fontSize: 12,
    color: darkThemeColors.subtext,
  },
  username: {
    color: darkThemeColors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  postImage: {
    width: imageWidth,
    height: imageHeight,
    alignSelf: 'center',
    resizeMode: 'cover',
    paddingVertical: '5px'
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  caption: {
    color: darkThemeColors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  commentsContainer: {
    paddingHorizontal: 15,
  },
  divider: {
    marginHorizontal: 10,
    borderColor: darkThemeColors.border,
    borderWidth: 1,
  },
  subtitleText: {
    color: darkThemeColors.subtext,
  },
  likeButton:{
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
});

export default Post;

export function CardDivider() {
  return <View style={styles.divider} />;
}

