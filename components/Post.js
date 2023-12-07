// Post.js
import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput, Button } from 'react-native';
import { Comment } from './Comment'; // Make sure this is properly imported from its path
import { formatDistanceToNowStrict } from "date-fns";
import { Avatar } from './Avatar'
import { db } from '../config/firebase'; // Make sure this is the correct path to your firebase config
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Icon } from './Icon'
import { useAuthentication } from '../contexts/AuthenticationContext';


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

const PostFooter = ({ username, highFives = 0, caption }) => {
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
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.caption}>{caption}</Text>
        </View>
    )
}

const Post = ({ postId, username, imageUri, caption, comments = [], highFives = 0 }) => {
  const { user } = useAuthentication(); // Get the authenticated user from context
  const [newComment, setNewComment] = useState('');
  // State to determine if all comments are shown
  const [showAllComments, setShowAllComments] = useState(false);
  // Number of comments to show initially
  const initialCommentCount = 3;
  // Comments to display based on state
  const displayedComments = showAllComments ? comments : comments.slice(0, initialCommentCount);
  // Toggle the state to show all comments
  const toggleCommentsDisplay = () => {
    setShowAllComments(!showAllComments);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return; // Don't submit if the comment is empty

    try {
      // Reference to the Firestore comments collection
      // Assuming you have a subcollection 'comments' under each 'posts' document
      const commentsRef = collection(db, 'posts', postId, 'comments');
      
      // Add a new document in the comments collection
      await addDoc(commentsRef, {
        text: newComment,
        createdAt: serverTimestamp(), // Use server timestamp for consistency
        username: user ? user.name : "Anonymous", // Replace with current user's username
        // Add any other comment related fields here
      });

      // Reset the comment input
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };
  
  return (
    <View style={styles.postContainer}>
      <PostHeader username={username} createdAt={new Date()} />
      <PostImage imageUri={imageUri} />
      <PostFooter username={username} highFives={highFives} caption={caption} />
        
      {/* Comments Section */}
      <View style={styles.commentsContainer}>
        {displayedComments.map((comment, index) => (
          <Comment key={comment.id} username={comment.username} text={comment.text} />
        ))}

        {/* 'View more comments' button */}
        {comments.length > initialCommentCount && !showAllComments && (
          <TouchableOpacity onPress={toggleCommentsDisplay}>
            <Text style={styles.viewMoreCommentsText}>View more comments</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Comment Input Section */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={text => setNewComment(text)}
          placeholderTextColor={darkThemeColors.subtext}
        />
        <TouchableOpacity onPressIn={handleCommentSubmit}>
          <Icon name="send" color={darkThemeColors.text} size={20}  />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth - 20; // Add more padding for the image
const imageHeight = imageWidth * 9 / 16; // Assuming a 16:9 aspect ratio for simplicity

const styles = StyleSheet.create({
  postContainer: {
    // backgroundColor: "#111",
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
    padding: 10
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
    paddingBottom: 5
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
    paddingHorizontal: 10,
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
  },
  commentInputContainer: {
    // borderTopColor: darkThemeColors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#2C2C2C', // Slightly lighter than the background for visibility
    color: darkThemeColors.text,
    borderRadius: 20,
  },
  viewMoreCommentsText: {
    color: darkThemeColors.text,
    fontSize: 14,
    padding: 8,
    textAlign: 'center'
  },
});

export default Post;

export function CardDivider() {
  return <View style={styles.divider} />;
}

