import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../config';
import { color } from 'react-native-reanimated';
import { CustomHeader, Section } from '../components';
import { ScrollView } from 'react-native-gesture-handler';
import { Timeline } from '../components/Timeline';

export const TimelineScreen = () => {
  return (
    <View style={styles.container}>
      <CustomHeader
        title="trip Guide"
        rightIcon={null}
        onRightPress={() => {
          console.log('Right button pressed!');
        }}
      />

      <Timeline />

     
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
