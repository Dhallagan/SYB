import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { ItineraryScreen } from '../screens/ItineraryScreen';
import { DirectoryScreen } from '../screens/DirectoryScreen';
import { TimelineScreen } from '../screens/TimelineScreen';
import { PhotosScreen } from '../screens/PhotosScreen';
import { Icon } from '../components'
import { LostAndFoundScreen } from '../screens/LostAndFoundScreen';
// import Icon from 'react-native-vector-icons/Ionicons'; 

const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  return (

      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={'black'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Itinerary1"
          component={ItineraryScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Itinerary1',
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar" color={'black'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Itinerary2"
          component={TimelineScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Itinerary2',
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar" color={'black'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Photos"
          component={PhotosScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Photos',
            tabBarIcon: ({ color, size }) => (
              <Icon name="image-multiple-outline" color={'black'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Lost and Found"
          component={LostAndFoundScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Lost and Found',
            tabBarIcon: ({ color, size }) => (
              <Icon name="image-multiple-outline" color={'black'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Directory"
          component={DirectoryScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Directory',
            tabBarIcon: ({ color, size }) => (
              <Icon name="book" color={'black'} size={size} />
            ),
          }}
        />
      </Tab.Navigator>

  );
}

export default HomeTabNavigator;
