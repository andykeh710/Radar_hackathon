import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Button from "./Button";
import { theme } from "../misc/styles";

const SocialButton = ({ icon, onPress, colorScheme }) => {
  const styles = useStyle();
  return (
    <View style={styles.buttonWrapper}>
      <Button onPress={onPress}>
        <FontAwesome5
          name={icon}
          size={24}
          color={
            colorScheme === "light"
              ? theme.light.button.activeIcon
              : theme.dark.button.activeIcon
          }
        />
      </Button>
    </View>
  );
};

export default SocialButton;

const useStyle = () => {
  const colorScheme = useColorScheme();
  const BUTTON_SIZE = 60;
  const styles = StyleSheet.create({
    buttonWrapper: {
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      padding: 10,
      borderRadius: 100,
      backgroundColor:
        colorScheme === "light"
          ? theme.light.button.activeBg
          : theme.dark.button.activeBg,
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
    },
  });
  return styles;
};
