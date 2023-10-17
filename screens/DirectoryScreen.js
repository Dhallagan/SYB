import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Icon, Header, ListItem, Badge } from 'react-native-elements';
import { Colors } from '../config';
import { CustomHeader, Section } from '../components';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  { id: '1', name: 'Alex Ebs', location: 'New York, NY, USA', imageUrl: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp' },
  { id: '2', name: 'Amelia Allen', location: 'London', imageUrl: 'https://mdbcdn.b-cdn.net/img/new/avatars/5.webp' },
];

export const DirectoryScreen = () => {
  const navigation = useNavigation();

  const handleProfileNavigation = (item) => {
    navigation.navigate('Profile', { user: item });
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="People"
        rightIcon={null}
        onRightPress={() => {
          console.log('Right button pressed!');
        }}
      />

      <View style={styles.tabsContainer}>
        <Icon name='users' type='font-awesome' color={Colors.white} />
        <Text style={{ color: Colors.white}}>Guests</Text>
        <Icon name='user' type='font-awesome' color={Colors.white} />
        <Text style={{ color: Colors.white}}>Leaders</Text>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem containerStyle={{ backgroundColor: '#111'}} bottomDivider onPress={() => handleProfileNavigation(item)}>  
            <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />
            <ListItem.Content>
              <ListItem.Title style={{color: 'white'}}>{item.name}</ListItem.Title>
              <ListItem.Subtitle style={{color: 'white'}}>{item.location}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon name='chevron-right' type='font-awesome' color={'white'} />
          </ListItem>
        )}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    // paddingHorizontal: 12
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.blackSecondary
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#d1d1d1',
  },
});


