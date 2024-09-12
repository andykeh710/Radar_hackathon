import { StyleSheet } from "react-native";
import React from "react";
import CustomTextInput from "./CustomTextInput";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColors } from "../hooks/useColors";

const FormTextInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry = false,
  icon,
  textFieldStyle,
}) => {
  const colorScheme = useColors();
  return (
    <CustomTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoComplete={false}
      textFieldStyle={textFieldStyle}
    >
      <AntDesign name={icon} size={24} color={colorScheme.text.primary} />
    </CustomTextInput>
  );
};

export default FormTextInput;

const styles = StyleSheet.create({});
