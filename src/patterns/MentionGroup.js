import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { useColors } from "../hooks/useColors";
import { typography, stylings } from "../misc/styles";

const MentionGroup = () => {
  const styles = useStyle();
  return (
    <View style={styles.mentionContainer}>
      <Text style={styles.mentionText}>MENTIONS</Text>
      <View></View>
    </View>
  );
};

export default MentionGroup;

const useStyle = () => {
  const colorScheme = useColors();
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    mentionContainer: {
      flex: 1,
      flexDirection: "row",
      borderRadius: stylings.borderRadiusSmall,
      backgroundColor: colorScheme.background.primary,
      padding: 25,
      alignItems: "center",
      justifyContent: "space-between",
      width: width - 85,
    },
    mentionText: {
      color: colorScheme.text.primary,
      fontSize: typography.fontStyles.caption2.fontSize,
    },
  });
  return styles;
};
