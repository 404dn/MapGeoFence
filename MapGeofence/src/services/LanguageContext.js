import React, { createContext, useState, useContext } from "react";
import i18next from "../services/i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [active, setActive] = useState(true);

  const toggleLanguage = () => {
    setActive((prevActive) => !prevActive);
    const newLanguage = active ? "ar" : "en";
    i18next.changeLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={[active, toggleLanguage]}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
