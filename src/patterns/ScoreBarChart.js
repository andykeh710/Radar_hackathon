import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import ProgressBar from "../components/charts/ProgressBar";
import { useColors } from "../hooks/useColors";

const useStyle = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    captionText: {
      color: colorScheme.text.secondary,
      fontSize: 12,
      marginVertical: 5,
    },
    scoreDisplayBlockContainer: {
      alignItemst: "flex-start",
      margin: 15,
    },
    scoreText: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#ffff",
    },
    descriptionText: {
      color: colorScheme.text.primary,
      lineHeight: 22,
      paddingHorizontal: 10,
      marginVertical: 10,
      width: "25%",
    },
  });
  return styles;
};

const ScoreBarChart = ({ data }) => {
  const styles = useStyle();
  return (
    <View>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <ScoreDisplayBlock
            score={data.payload.statistic.sentiment}
            label="Sentiment"
          />
          <ScoreDisplayBlock
            score={data.payload.statistic.score}
            label="Score"
          />
          <ScoreDisplayBlock
            score={data.payload.statistic.reach}
            label="Reach"
          />
        </View>
        <Text style={styles.descriptionText}>{data.payload.description}</Text>
      </View>
      <View style={{ paddingHorizontal: 25, marginVertical: 10, width: "29%" }}>
        <ProgressBar
          progress={data.payload.statistic.sentiment}
          description="Sentiment"
        />
        <ProgressBar
          progress={data.payload.statistic.score}
          description="Score"
        />
        <ProgressBar
          progress={data.payload.statistic.reach}
          description="Reach"
        />
      </View>
    </View>
  );
};

const ScoreDisplayBlock = ({ score, label }) => {
  const styles = useStyle();
  return (
    <View style={styles.scoreDisplayBlockContainer}>
      <Text style={styles.scoreText}>{score}%</Text>
      <Text style={styles.captionText}>{label}</Text>
    </View>
  );
};

export default ScoreBarChart;
