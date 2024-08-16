import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const Button = ({ children, style, onPress }) => {
  return (
    <Pressable style={style} onPress={onPress}>
      {children}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
