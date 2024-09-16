import React from "react";
import { StyleSheet, View } from "react-native";

import Button from "./Button";
import { useColors } from "../hooks/useColors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

const CircularButton = ({
  iconFamily,
  icon,
  iconSize = "24",
  onPress,
  style,
}) => {
  const colorScheme = useColors();
  const styles = useStyle(colorScheme);

  return (
    <Button onPress={onPress}>
      <View style={[styles.buttonWrapper, style]}>
        {getIconFamily(iconFamily, icon, iconSize, colorScheme)}
      </View>
    </Button>
  );
};

const getIconFamily = (iconFamily, icon, iconSize, colorScheme) => {
  switch (iconFamily) {
    case "antDesign":
      return (
        <AntDesign
          name={icon}
          size={iconSize}
          color={colorScheme.button.activeIcon}
        />
      );
    case "feather":
      return (
        <Feather
          name={icon}
          size={iconSize}
          color={colorScheme.button.activeIcon}
        />
      );
    case "fontAwesome6":
      return (
        <FontAwesome6
          name={icon}
          size={iconSize}
          color={colorScheme.button.activeIcon}
        />
      );
    case "ionicons":
      return (
        <Ionicons
          name={icon}
          size={iconSize}
          color={colorScheme.button.activeIcon}
        />
      );
  }
};
export default CircularButton;

const useStyle = () => {
  const colorScheme = useColors();
  const BUTTON_SIZE = 40;
  const styles = StyleSheet.create({
    buttonWrapper: {
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      borderRadius: 100,
      backgroundColor: colorScheme.button.activeBg,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 10,
    },
  });
  return styles;
};
