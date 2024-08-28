import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { useColors } from "../../hooks/useColors";
import { LinearGradient } from "expo-linear-gradient";
import { typography } from "../../misc/styles";

const ProgressBar = ({ progress = 95.4, description }) => {
  const colorScheme = useColors();
  const styles = useStyle(progress, colorScheme);
  return (
    <View style={styles.viewContainer}>
      <View style={styles.barContainer} />
      <LinearGradient
        style={[styles.bar]}
        colors={colorScheme.button.activeHighlightBg}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <></>
      </LinearGradient>
      <View
        style={{
          width: "50",

          width: 100,
          paddingStart: 20,
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.label}>{progress}%</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;

const useStyle = (progress, colorScheme) => {
  const BAR_HEIGHT = 35;
  const PROGRESS = `${(progress / 100) * 0.72 * 100}%`;
  const MIN_WIDTH = 20;

  const styles = StyleSheet.create({
    viewContainer: {
      flexDirection: "row",
      marginVertical: 5,
    },
    barContainer: {
      flex: 1,
      borderRadius: 100,
      height: BAR_HEIGHT,
      backgroundColor: colorScheme.background.onCardBg,
      opacity: 0.3,
    },
    bar: {
      position: "absolute",
      borderRadius: 50,
      height: BAR_HEIGHT,
      width: progress < MIN_WIDTH ? 35 : PROGRESS,
      backgroundColor: colorScheme.background.primary,
    },
    label: {
      color: colorScheme.text.primary,
      alignSelf: "flex-start",
    },
    description: {
      color: colorScheme.text.secondary,
      fontWeight: "400",
      alignSelf: "flex-start",
    },
    textContainer: {},
  });
  return styles;
};
