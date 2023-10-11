import React, { createContext, useContext, useState, useEffect } from "react";

const GeofenceContext = createContext();

export const useGeofences = () => {
  return useContext(GeofenceContext);
};

export const GeofenceProvider = ({ children }) => {
  const [geofences, setGeofences] = useState([]);

  const addGeofence = (geofence) => {
    setGeofences([...geofences, geofence]);
  };

  const resetGeofences = () => {
    setGeofences([]);
  };

  useEffect(() => {
    console.log("Updated Geofences:", geofences);
  }, [geofences]);

  return (
    <GeofenceContext.Provider
      value={{ geofences, addGeofence, resetGeofences }}
    >
      {children}
    </GeofenceContext.Provider>
  );
};
