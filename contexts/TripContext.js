import React, { createContext, useContext, useState } from 'react';

const TripContext = createContext();

export const useTrip = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  const [currentTrip, setCurrentTrip] = useState(null);

  const selectTrip = (trip) => {
    setCurrentTrip(trip);
  };

  return (
    <TripContext.Provider value={{ currentTrip, selectTrip }}>
      {children}
    </TripContext.Provider>
  );
};