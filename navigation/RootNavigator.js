import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer, usePreventRemoveContext } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Text } from 'react-native';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { OnboardingStack } from './OnboardingStack';
import { AuthenticatedUserContext } from '../providers';
import { LoadingIndicator } from '../components';
import { auth, db } from '../config'; 
import { updateDoc } from 'firebase/firestore';
import { useAuthentication } from '../contexts/AuthenticationContext';

export const RootNavigator = () => {
  const { loading, isOnboarded, error, user } = useAuthentication();

  if (loading ) {
    return <LoadingIndicator />;
  }

  if (error) {

    return <Text>Error loading data!</Text>;
  }
  
  return (
    <NavigationContainer>
      { user ? (
        isOnboarded ? <AppStack /> : <OnboardingStack />
      ) : <AuthStack />}
    </NavigationContainer>
  );
};
