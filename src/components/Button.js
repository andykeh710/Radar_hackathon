import { Pressable } from "react-native";
import React from "react";

const Button = ({ children, style, onPress, disabled }) => {
  return (
    <Pressable style={style} onPress={onPress} disabled={disabled}>
      {children}
    </Pressable>
  );
};

export default Button;
