import React from 'react'; // Make sure React is imported, as it's needed for JSX.
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingScreen1 } from '../screens/OnboardingScreen1'; // Ensure these paths are correct
import { OnboardingScreen2 } from '../screens/OnboardingScreen2';
// Import other necessary components

const Stack = createStackNavigator();

export const OnboardingStack = () => {
  return (
    <Stack.Navigator>
      {/* Use the component prop for the screens. This is the standard way of assigning screens. */}
      <Stack.Screen 
        name="OnboardingScreen1" 
        component={OnboardingScreen1} 
        options={{ headerShown: false }}
      />
      {/* Here we're setting up initialParams to pass the onCompleted function */}
      <Stack.Screen 
        name="OnboardingScreen2" 
        component={OnboardingScreen2} // Direct reference to the component
        options={{ headerShown: false }}
      />
      {/* More screens, if necessary... */}
    </Stack.Navigator>
  );
};

// No default export here as we're using named exports
