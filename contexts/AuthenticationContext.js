import { onAuthStateChanged } from 'firebase/auth';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, db } from '../config/firebase'; // Adjust path as per your structure
import { doc, getDoc } from 'firebase/firestore';


// Create a Context object
export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [combinedLoading, setCombinedLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const refreshAuth = useCallback(async () => {
    // You could re-run the GraphQL query or just update the onboarded status directly if you know it's changed.
    // For now, we will just set isOnboarded directly for simplicity.
    setIsOnboarded(true);
  }, []);

  // Handling side effects of auth state changing
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (authUser) => {
        if (authUser) {
          try {
            const userDoc = await getDoc(doc(db, 'user', authUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setIsOnboarded(userData.onboarded); // Fetching 'onboarded' status from Firestore
              setUser(authUser); // Set authenticated user
            } else {
              // Handle a scenario where the user document might not exist
              setError('User document does not exist.');
            }
          } catch (error) {
            console.log(error);
            setError('Error fetching user data.');
          }
        } else {
          setUser(null); // No user is signed in
        }
        setCombinedLoading(false);
      });

    // Cleanup the subscription on unmount
    return () => unsubscribeAuth();
  }, []);


  // Combining loading states into a single state for convenience
  const loading = combinedLoading ;

  return (
    <AuthenticationContext.Provider
      value={{
        combinedLoading, // Here we're using the combined loading state
        loading,
        isOnboarded,
        user, // This is the Firebase user
        error, // Error from GraphQL or Firebase or both
        refreshAuth,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

// Custom hook that shorthands the context!
export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};
