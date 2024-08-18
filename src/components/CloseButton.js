import { StyleSheet } from "react-native";
import React from "react";
import Button from "./Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../misc/styles";

const CloseButton = ({ colorScheme, onClose }) => {
  return (
    <Button onPress={onClose}>
      <AntDesign
        name="closecircleo"
        size={24}
        color={
          colorScheme === "light"
            ? theme.light.text.primary
            : theme.dark.text.primary
        }
      />
    </Button>
  );
};

export default CloseButton;

const styles = StyleSheet.create({});
