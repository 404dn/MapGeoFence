import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../localization/en.json";
import ar from "../localization/ar.json";

export const langResources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "en",
  fallbackLng: "en",
  resources: langResources,
});

export default i18next;
