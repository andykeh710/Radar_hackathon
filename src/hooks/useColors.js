import { useColorScheme } from "react-native";
import { theme } from "../misc/styles";

export const useColors = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "light" ? theme.light : theme.dark;
};
