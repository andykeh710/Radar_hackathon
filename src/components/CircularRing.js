import { StyleSheet } from "react-native";
import React from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { useColors } from "../hooks/useColors";

const CircularRing = ({ rating }) => {
  const SIZE = 56;
  const COUNT = 10;
  const WIDTH = 34;
  const colorScheme = useColors();

  return (
    <CircularProgress
      value={rating}
      radius={SIZE}
      duration={800}
      progressValueColor={colorScheme.text.primary}
      maxValue={100}
      activeStrokeColor={"#2465FD"}
      activeStrokeSecondaryColor={"#C25AFF"}
      inActiveStrokeColor={colorScheme.background.cardBg}
      titleColor={colorScheme.text.primary}
      dashedStrokeConfig={{
        count: COUNT,
        width: WIDTH,
      }}
    />
  );
};

export default CircularRing;

const styles = StyleSheet.create({});
