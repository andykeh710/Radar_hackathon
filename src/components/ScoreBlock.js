import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { stylings, typography } from "../misc/styles";
import { useColors } from "../hooks/useColors";

const ScoreBlock = ({ score, description }) => {
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <Text style={styles.score}>{score}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default ScoreBlock;

const useStyle = () => {
  const SIZE = 110;
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    container: {
      borderRadius: stylings.borderRadiusSmall,
      backgroundColor: colorScheme.background.primary,
      padding: 15,
      justifyContent: "center",
      alignItems: "center",
      width: SIZE,
      height: SIZE,
      margin: 3,
    },
    score: {
      color: colorScheme.text.primary,
      fontSize: typography.fontStyles.title1.fontSize,
      fontWeight: "800",
    },
    description: {
      color: colorScheme.text.secondary,
      fontSize: typography.fontStyles.caption1.fontSize,
      margin: 5,
    },
  });
  return styles;
};
