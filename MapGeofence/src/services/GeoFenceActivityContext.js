import React, { createContext, useContext, useState } from "react";

const GeofenceActivityContext = createContext();

export const useGeofenceActivity = () => {
  return useContext(GeofenceActivityContext);
};

export const GeofenceActivityProvider = ({ children }) => {
  const [activityLog, setActivityLog] = useState([]);

  const addActivityLogEntry = (entry) => {
    setActivityLog([...activityLog, entry]);
  };

  const clearActivityLog = () => {
    setActivityLog([]);
  };

  return (
    <GeofenceActivityContext.Provider
      value={{ activityLog, addActivityLogEntry, clearActivityLog }}
    >
      {children}
    </GeofenceActivityContext.Provider>
  );
};
