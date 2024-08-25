import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { typography } from "../misc/styles";
import { useColors } from "../hooks/useColors";
import Avatar from "./Avatar";

const InfluencerAvatar = ({ influencer, horizontal = false }) => {
  const styles = useStyle(horizontal);
  return (
    <View style={styles.influencerAvatarContainer}>
      <Avatar image={influencer.avatar} size={60} />
      <View style={styles.textContainer}>
        <Text style={styles.influencerNameText}>{influencer.username}</Text>
        <Text style={styles.influencerHandleText}>{influencer.handle}</Text>
      </View>
    </View>
  );
};

export default InfluencerAvatar;

const useStyle = (horizontal) => {
  const colorScheme = useColors();

  const styles = StyleSheet.create({
    influencerAvatarContainer: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: horizontal ? "row" : "column",
      marginHorizontal: 5,
    },

    influencerNameText: {
      color: colorScheme.text.primary,
      fontSize: typography.fontStyles.caption2.fontSize,
      paddingTop: 10,
      paddingHorizontal: 5,
      fontWeight: "600",
      textAlign: "center",
    },
    influencerHandleText: {
      color: colorScheme.text.secondary,
      fontSize: typography.fontStyles.caption2.fontSize,
      paddingHorizontal: 5,
      marginTop: 2,
      fontWeight: "300",
      textAlign: "center",
    },
    textContainer: {
      alignItems: horizontal ? "flex-start" : "center",
      marginHorizontal: horizontal && 10,
    },
  });
  return styles;
};
