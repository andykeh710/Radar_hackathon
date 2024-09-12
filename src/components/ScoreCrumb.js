import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useColors } from "../hooks/useColors";
import { stylings } from "../misc/styles";

const ScoreCrumb = ({ score }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text>Score: 87</Text>
    </View>
  );
};

export default ScoreCrumb;

const useStyles = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colorScheme.background.onCardBg,
      borderRadius: stylings.borderRadiusSmall,
      padding: 6,
      paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
  });
  return styles;
};
