import React from "react";
import { StyleSheet, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Button from "./Button";
import { useColors } from "../hooks/useColors";

const SocialButton = ({ icon, onPress }) => {
  const colorScheme = useColors();
  const styles = useStyle(colorScheme);
  return (
    <View style={styles.buttonWrapper}>
      <Button onPress={onPress}>
        <FontAwesome5
          name={icon}
          size={24}
          color={colorScheme.button.activeIcon}
        />
      </Button>
    </View>
  );
};

export default SocialButton;

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
