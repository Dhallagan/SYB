import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../config';
import { color } from 'react-native-reanimated';
import { CustomHeader, Section } from '../components';
import { ScrollView } from 'react-native-gesture-handler';

export const ItineraryScreen = () => {
  return (
    <View style={styles.container}>
      <CustomHeader
        title="trip Guide"
        rightIcon={null}
        onRightPress={() => {
          console.log('Right button pressed!');
        }}
      />

      <View style={styles.calendarRow}>
        {['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'].map((day, index) => (
          <TouchableOpacity key={index} style={day === 'SAT' ? styles.selectedDay : styles.day}>
            <Text style={day === 'SAT' ? styles.selectedDayText : styles.dayText}>{day}</Text>
            <Text style={day === 'SAT' ? styles.selectedDateText : styles.dateText}>{19 + index}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.container}>
        <Section 
          title="Overview" 
          subtitle="Day 1 - Check-in"
        >
          <Text style={{ color: 'white', fontSize: 16, lineHeight: 20 }}>Welcome to The Year of The Sea Myth at The Yacht Week! As we navigate through the deep blue waters, we will be exploring the myths and legends of the sea. From the sirens of the Adriatic to the mermaids of the Caribbean, we will be uncovering the mysteries of the sea. So, get ready to dive into the deep blue and explore the myths of the sea!</Text>
        </Section>

        <Section 
          title="Check In" 
          subtitle="8:00 - 9:00"
        >
          <Text style={{ color: 'white', fontSize: 16, lineHeight: 20 }}>Welcome future sailors! You've landed yourself on The Yacht Week Croatia and let me tell you, this app is the real MVP of the week. It's your go-to f...</Text>
        </Section>

        <Section 
          title="Dinner" 
          subtitle="20:00"
        >
          <Text style={{ color: 'white', fontSize: 16, lineHeight: 20 }}>After check-in, you'll make your way into Trogir town where you can step onto the Riva and enjoy dinner at one of our recommended restaurants.</Text>
        </Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: Colors.blackSecondary,
    padding: 15,
  },
  day: {
    alignItems: 'center'
  },
  selectedDay: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    color: Colors.white
  },
  dayText: {
    color: Colors.white
  },
  selectedDayText: {
    fontWeight: 'bold',
    color: Colors.white
  },
  dateText: {
    color: Colors.white
  },
  selectedDateText: {
    fontWeight: 'bold',
    color: Colors.white
  },
  section: {
    marginBottom: 20,
    padding: 15,
  },
  sectionTime: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: Colors.white
  },
  sectionSubtitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.white
  },
  sectionDescription: {
    color: Colors.white
  }
});


// import React from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import { signOut } from 'firebase/auth';

// import { Colors, auth } from '../config';

// export const ItineraryScreen = () => {

//   return (
//     <View style={styles.container}>
//         <Text style={styles.color}>Itinerary Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.black,
//     paddingHorizontal: 12
//   },
//   text:{
//     color: Colors.white,
//     fontSize: 20,
//     fontWeight: '700'
//   }
// });
