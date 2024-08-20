import { StyleSheet } from "react-native";
import React from "react";
import Button from "./Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColors } from "../hooks/useColors";

const CloseButton = ({ onClose }) => {
  const colorScheme = useColors();
  return (
    <Button onPress={onClose}>
      <AntDesign
        name="closecircleo"
        size={24}
        color={colorScheme.text.primary}
      />
    </Button>
  );
};

export default CloseButton;

const styles = StyleSheet.create({});
