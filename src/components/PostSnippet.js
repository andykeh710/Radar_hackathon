import { StyleSheet, Text, Image, View } from "react-native";
import React from "react";
import ScoreCrumb from "./ScoreCrumb";
import { useColors } from "../hooks/useColors";
import { stylings, typography } from "../misc/styles";

const PostSnippet = ({ snippet }) => {
  const styles = useStyles();

  return (
    <View style={styles.snippetContainer}>
      <View>
        <View style={styles.contentContainer}>
          <Text style={styles.headline}>{snippet.headline}</Text>
          <Text style={styles.description}>{snippet.description}</Text>
          <ScoreCrumb />
        </View>
      </View>
    </View>
  );
};

export default PostSnippet;

const useStyles = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    contentContainer: {
      alignItems: "flex-start",
    },
    snippetContainer: {
      borderRadius: stylings.borderRadiusSmall,
      backgroundColor: colorScheme.background.primary,
      padding: 20,
      flexDirection: "row",
      marginVertical: 10,
      alignItems: "center",
      marginEnd: 10,
    },
    headline: {
      color: colorScheme.text.primary,
      fontWeight: "bold",
      fontSize: typography.fontStyles.subheading.fontSize,
      margin: 5,
    },
    description: {
      color: colorScheme.text.secondary,
      fontSize: typography.fontStyles.subheading.fontSize,
      marginHorizontal: 5,
    },
  });
  return styles;
};
