import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { useColors } from "../hooks/useColors";

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  autoComplete,
  children,
  textContainerStyle,
  textFieldStyle,
}) => {
  const colorScheme = useColors();
  const styles = useStyle(colorScheme);

  return (
    <View style={[styles.textInputContainer, textContainerStyle]}>
      {children}
      <TextInput
        style={[styles.textInput, textFieldStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={false}
        autoComplete={autoComplete}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default CustomTextInput;

const useStyle = (colorScheme) => {
  const styles = StyleSheet.create({
    textInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 50,
      paddingHorizontal: 15,
      opacity: 0.6,
      marginVertical: 10,
      backgroundColor: colorScheme.textInput.primary,
    },
    textInput: {
      borderRadius: 50,
      flex: 1,
      color: colorScheme.text.primary,
      backgroundColor: colorScheme.textInput.primary,
    },
  });
  return styles;
};
