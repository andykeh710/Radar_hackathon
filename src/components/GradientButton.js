import { StyleSheet, Text } from "react-native";
import React from "react";
import Button from "./Button";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../misc/styles";

const GradientButton = ({
  onPress,
  label,
  colorScheme,
  style,
  disabled = false,
}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor:
        colorScheme === "light"
          ? theme.light.button.activeHighlightBg[0]
          : theme.dark.button.activeHighlightBg[0],
      borderRadius: 50,
      padding: 20,
      marginTop: 30,
      opacity: disabled ? 0.3 : 1,
    },
    buttonLabel: {
      color: colorScheme === "light" ? "#000000" : "#ffffff",
      letterSpacing: 2,
    },
  });
  return (
    <Button onPress={onPress} disabled={disabled}>
      <LinearGradient
        style={[styles.button, style]}
        colors={
          colorScheme === "light"
            ? theme.light.button.activeHighlightBg
            : theme.dark.button.activeHighlightBg
        }
      >
        <Text style={[styles.buttonLabel, { color: "#ffffff" }]}>{label}</Text>
      </LinearGradient>
    </Button>
  );
};

export default GradientButton;
