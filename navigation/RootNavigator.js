import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer, usePreventRemoveContext } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { OnboardingStack } from './OnboardingStack';
import { AuthenticatedUserContext } from '../providers';
import { LoadingIndicator } from '../components';
import { auth, db } from '../config'; 
import { updateDoc } from 'firebase/firestore';

export const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(auth, async (authenticatedUser) => {
      setIsChecking(true);
      if (authenticatedUser) {
        setUser(authenticatedUser);
  
        // Fetch the 'onboarded' status from Firestore
        const userDocRef = doc(db, "user", authenticatedUser.uid); // Adjust "users" if your collection is named differently
        try {
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            // Assuming the field is named 'onboarded' in Firestore. Adjust if it's named differently.
            const onboardedStatus = userDocSnapshot.data().onboarded || false; // default to false if the field doesn't exist
            setIsOnboarded(onboardedStatus);
          } else {
            // Handle the case where the user document doesn't exist
            setIsOnboarded(false); // Assuming you want to show onboarding if the document doesn't exist
          }
        } catch (error) {
          // Handle the error accordingly
          console.error("Error fetching user data: ", error);
        }
      } else {
        setUser(null);
        setIsOnboarded(null); // Reset to initial state when no user is authenticated
      }
      setIsLoading(false); // This line might be adjusted based on how you plan to handle loading states.
      setIsChecking(false);
    });
  
    return unsubscribeAuthStateChanged;
  }, [setUser]); // 'setUser' is specified as a dependency to ensure it's the latest function from context
  
  const handleCompleteOnboarding = async () => {
    // Here, you can also update the user's Firestore document to mark that onboarding is complete.
    try {
      console.log('User completed onboarding!', usePreventRemoveContext);
      const userDocRef = doc(db, "user", user.uid);
      await updateDoc(userDocRef, {
        onboarded: true,
      });
      // After successfully updating Firestore, update the local state.
      setIsOnboarded(true);
    } catch (error) {
      console.error("Error updating onboarding status: ", error);
      // Handle the error accordingly (e.g., show an error message to the user).
    }
  };

  if (isChecking) {
    return null; // Create a SplashScreen component as per your design.
  }

  if (isLoading || isChecking ) {
    return <LoadingIndicator />;
  }
  
  return (
    <NavigationContainer>
      { user ? (isOnboarded ? <AppStack /> : <OnboardingStack onCompleted={handleCompleteOnboarding} />
) : <AuthStack />}
    </NavigationContainer>
  );
};
