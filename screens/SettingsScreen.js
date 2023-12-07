import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const settingsOptions = [
    { id: '1', title: 'Account', screen: 'AccountScreen' },
    { id: '2', title: 'Notifications', screen: 'NotificationsScreen' },
    { id: '3', title: 'Privacy', screen: 'PrivacyScreen' },
    // Add more options here
  ];

export const SettingsScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  itemText: {
    fontSize: 16
  }
});
