import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomTextInput from "./CustomTextInput";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../misc/styles";

const FormTextInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  clearButtonMode,
  secureTextEntry = false,
  icon,
  colorScheme,
}) => {
  return (
    <CustomTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      clearButtonMode={clearButtonMode}
      secureTextEntry={secureTextEntry}
    >
      <AntDesign
        name={icon}
        size={24}
        color={
          colorScheme === "light"
            ? theme.light.text.primary
            : theme.dark.text.primary
        }
      />
    </CustomTextInput>
  );
};

export default FormTextInput;

const styles = StyleSheet.create({});
