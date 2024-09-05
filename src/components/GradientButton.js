import { StyleSheet, Text } from "react-native";
import React from "react";
import Button from "./Button";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "../hooks/useColors";

const GradientButton = ({ onPress, label, style, disabled = false }) => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: colorScheme.button.activeHighlightBg[0],
      borderRadius: 50,
      padding: 20,
      marginTop: 30,
      opacity: disabled ? 0.3 : 1,
    },
    buttonLabel: {
      color: colorScheme.button.activeLabelInversed,
      letterSpacing: 1,
      fontWeight: "500",
    },
  });
  return (
    <Button onPress={onPress} disabled={disabled}>
      <LinearGradient
        style={[styles.button, style]}
        colors={colorScheme.button.activeHighlightBg}
        start={{ x: -1, y: 2 }}
        end={{ x: 2, y: 0 }}
      >
        <Text style={[styles.buttonLabel, { color: "#ffffff" }]}>{label}</Text>
      </LinearGradient>
    </Button>
  );
};

export default GradientButton;
