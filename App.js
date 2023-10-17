import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import { useFonts } from 'expo-font';

const App = () => {
   /* @info */ const [loaded] = useFonts({
    California: require('./assets/fonts/California.ttf'),
  });
  /* @end */

  if (!loaded) {
    return null;
  }

  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
};

export default App;
