import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useState, createContext } from "react";

const THEME_ASYNC_STORAGE_KEY = "THEME_STATE";

export const ThemeContext = createContext(undefined);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState();
  const [loading, setLoading] = useState(true);

  // load preference from asyncStorage on app load;
  useEffect(() => {
    const load = async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_ASYNC_STORAGE_KEY);
      setTheme(storedTheme);
      setLoading(false);
    };
    load();
  }, []);

  // update asyncStorage when theme preferences changes
  useEffect(() => {
    if (theme) {
      AsyncStorage.setItem(THEME_ASYNC_STORAGE_KEY, theme);
    } else {
      AsyncStorage.removeItem(THEME_ASYNC_STORAGE_KEY);
    }
  }, [theme]);

  const contextState = useMemo(
    () => ({ loading, setTheme, theme }),
    [theme, loading]
  );

  if (loading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextState}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
