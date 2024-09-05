import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScoreBlock from "../components/ScoreBlock";

const ScoreBlockGroup = () => {
  return (
    <View style={styles.scoreBlockContainer}>
      <ScoreBlock score="97" description="Short-Term" />
      <ScoreBlock score="97" description="Short-Term" />
      <ScoreBlock score="97" description="Short-Term" />
    </View>
  );
};

export default ScoreBlockGroup;

const styles = StyleSheet.create({
  scoreBlockContainer: {
    flexDirection: "row",
  },
});
