import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { stylings, typography } from "../misc/styles";
import { useColors } from "../hooks/useColors";

const Accolade = ({ icon, title, description }) => {
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <Text style={styles.score}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default Accolade;

const useStyle = () => {
  const SIZE = 120;
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
      marginRight: 3,
    },
    score: {
      color: colorScheme.text.primary,
      fontSize: typography.fontStyles.caption1.fontSize,
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
