import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { useColors } from "../hooks/useColors";

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  children,
}) => {
  const colorScheme = useColors();
  const styles = useStyle(colorScheme);

  return (
    <View style={styles.textInputContainer}>
      {children}
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={false}
        autoComplete={false}
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
      paddingLeft: 20,
      paddingRight: 20,
      opacity: 0.5,
      marginVertical: 10,
      backgroundColor: colorScheme.textInput.primary,
    },
    textInput: {
      borderRadius: 50,
      flex: 1,
      padding: 20,
      marginLeft: 0,
      color: colorScheme.text.primary,
      backgroundColor: colorScheme.textInput.primary,
    },
  });
  return styles;
};
