import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { typography } from "../misc/styles";
import { useColors } from "../hooks/useColors";

const InfluencerAvatar = ({ influencer }) => {
  const styles = useStyle();
  return (
    <View style={styles.influencerAvatarContainer}>
      <Image source={influencer.avatar} style={styles.influencerAvatar} />
      <Text style={styles.influencerNameText}>{influencer.username}</Text>
      <Text style={styles.influencerHandleText}>{influencer.handle}</Text>
    </View>
  );
};

export default InfluencerAvatar;

const useStyle = () => {
  const colorScheme = useColors();

  const styles = StyleSheet.create({
    influencerAvatarContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    influencerAvatar: {
      height: 50,
      width: 50,
      borderRadius: 50,
      resizeMode: "contain",
      marginHorizontal: 10,
    },
    influencerNameText: {
      color: colorScheme.text.primary,
      fontSize: typography.fontStyles.caption2.fontSize,
      paddingHorizontal: 10,
      paddingTop: 10,
      fontWeight: "600",
    },
    influencerHandleText: {
      color: colorScheme.text.secondary,
      fontSize: typography.fontStyles.caption2.fontSize,
      paddingHorizontal: 10,

      fontWeight: "300",
    },
  });
  return styles;
};
