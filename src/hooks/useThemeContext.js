import { useCallback, useContext } from "react";
import { useColorScheme } from "react-native";
import { ThemeContext } from "../context/ThemeProvider";
import { useColors } from "./useColors";

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  const systemColorScheme = useColorScheme();

  if (context === undefined) {
    throw new Error("useThemeContext must be within ThemeProvider");
  }

  const { theme, loading, setTheme } = context;
  if (loading) {
    throw new Error("Tried to use ThemeContext before initialisation");
  }

  const colorTheme = theme ?? systemColorScheme ?? "light";

  return {
    colors: useColors(),
    colorTheme,
    isSystemTheme: !theme,
    isDark: theme === "dark",
    systemTheme: systemColorScheme,
    setColorTheme: useCallback((themeName) => setTheme(themeName), [setTheme]),
  };
};

export default useThemeContext;
