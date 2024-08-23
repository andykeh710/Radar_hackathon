import React from "react";
import { StyleSheet, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Button from "./Button";
import { useColors } from "../hooks/useColors";

const CircularButton = ({ icon, iconSize = "24", onPress, style }) => {
  const colorScheme = useColors();
  const styles = useStyle(colorScheme);
  return (
    <View style={[styles.buttonWrapper, style]}>
      <Button onPress={onPress}>
        <FontAwesome5
          name={icon}
          size={iconSize}
          color={colorScheme.button.activeIcon}
        />
      </Button>
    </View>
  );
};

export default CircularButton;

const useStyle = (colorScheme) => {
  const BUTTON_SIZE = 55;
  const styles = StyleSheet.create({
    buttonWrapper: {
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      padding: 10,
      borderRadius: 100,
      backgroundColor: colorScheme.button.activeBg,
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
    },
  });
  return styles;
};
