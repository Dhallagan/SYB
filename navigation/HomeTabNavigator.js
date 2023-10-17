import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { ItineraryScreen } from '../screens/ItineraryScreen';
import { DirectoryScreen } from '../screens/DirectoryScreen';
import { TimelineScreen } from '../screens/TimelineScreen';
import { Icon } from '../components'
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
          name="Itinerary"
          component={ItineraryScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Itinerary',
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar" color={'black'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Timeline"
          component={TimelineScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Timeline',
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar" color={'black'} size={size} />
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
