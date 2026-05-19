import { createContext, useContext, useEffect, useState } from "react";
import { PREFERENCES_STORAGE_KEY } from "../config";

const PreferencesContext = createContext(null);

const defaultPreferences = {
  college: "",
  branch: "",
};

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }

  return context;
};
