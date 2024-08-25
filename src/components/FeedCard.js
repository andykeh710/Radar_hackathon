import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { stylings } from "../misc/styles";
import { useColors } from "../hooks/useColors";
import Avatar from "./Avatar";
import InfluencerAvatar from "./InfluencerAvatar";

const FeedCard = ({ author }) => {
  const styles = useStyle();
  return <View style={styles.container}></View>;
};

export default FeedCard;
const useStyle = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    container: {
      borderRadius: stylings.borderRadiusSmall,
      backgroundColor: colorScheme.background.cardBg,
      padding: 50,
    },
  });
  return styles;
};
