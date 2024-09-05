import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { useColors } from "../hooks/useColors";
import { typography } from "../misc/styles";

const UserIdentityGroup = () => {
  const styles = useStyle();
  return (
    <View style={styles.textContainer}>
      <Text style={styles.userNameText}>Ethmaster</Text>
      <Text style={styles.userHandleText}>@ethmaster</Text>
    </View>
  );
};

export default UserIdentityGroup;

const useStyle = () => {
  const colorScheme = useColors();

  const styles = StyleSheet.create({
    textContainer: {
      justifyContent: "center",
    },
    userNameText: {
      color: colorScheme.text.primary,
      textAlign: "center",
      fontWeight: "800",
      fontSize: typography.fontStyles.title3.fontSize,
    },
    userHandleText: {
      color: colorScheme.text.secondary,
      textAlign: "center",
    },
  });
  return styles;
};
