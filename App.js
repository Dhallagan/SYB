import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticationProvider } from './contexts/AuthenticationContext';
import { useFonts } from 'expo-font';
import { Colors, auth } from './config';
import { TripProvider } from './contexts/TripContext';

const App = () => {
   /* @info */ const [loaded] = useFonts({
    California: require('./assets/fonts/California.ttf'),
  });
  /* @end */
  signOut(auth).catch(error => console.log('Error logging out: ', error));

  if (!loaded) {
    return null;
  }

  return (
    <AuthenticationProvider>
      <TripProvider>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </TripProvider>
    </AuthenticationProvider>
  );
};

export default App;
