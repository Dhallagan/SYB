import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const Day = ({ index, heading, content }) => {
  return (
    <ScrollView style={styles.dayScrollView}>
      <View style={styles.dayContent}>
        <Text style={styles.dayHeading}>Day {index + 1} - {heading}</Text>
        <Text style={{ color: 'white' }}>{content}</Text>
        {/* Add more content or components for the day as needed */}
      </View>
    </ScrollView>
  );
};

export const Timeline = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.daysColumn}>
        {Array.from({ length: 6 }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedDay(index)}
            style={[styles.dayNumber, selectedDay === index ? styles.selectedDay : null]}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>0{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Day index={selectedDay} heading={'HIT THE GROUND RUNNING'} content={`We'll find you at the airport (meet at KEF between 8-10am) and right away head to some sweet spots along the way to our basecamp.
The first stop is Reykjadalur! This is where we'll hike (3-4 hours) and jump in the hot springs to wash off afterwards!
When we arrive to basecamp in the late afternoon, we'll shower, hot tub, sauna, and have dinner at home. Dancing will be rampant, daylight will be plentiful, and the elves come out to play at night. Where this night takes you is your story, but this is just day 1.`}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  daysColumn: {
    width: 55,
    alignItems: 'center',
    backgroundColor: '#111', // optional background for contrast
  },
  dayNumber: {
    padding: 15,
    color: 'white',
  },
  selectedDay: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
  },
  dayScrollView: {
    flex: 1,
  },
  dayContent: {
    padding: 20,
  },
  dayHeading: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
  },
});

