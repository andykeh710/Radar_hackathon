import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TextInput,
} from "react-native";
import React from "react";
import { theme } from "../misc/styles";

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  children,
}) => {
  const styles = useStyle();

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

const useStyle = () => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    textInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 50,
      paddingLeft: 20,
      paddingRight: 20,
      opacity: 0.5,
      marginVertical: 10,
      backgroundColor:
        colorScheme === "light"
          ? theme.light.textInput.primary
          : theme.dark.textInput.primary,
    },
    textInput: {
      borderRadius: 50,
      flex: 1,
      padding: 20,
      marginLeft: 0,
      color:
        colorScheme === "light"
          ? theme.light.text.primary
          : theme.dark.text.primary,
      backgroundColor:
        colorScheme === "light"
          ? theme.light.textInput.primary
          : theme.dark.textInput.primary,
    },
  });
  return styles;
};
