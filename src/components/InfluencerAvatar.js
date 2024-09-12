import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { typography } from "../misc/styles";
import { useColors } from "../hooks/useColors";
import Avatar from "./Avatar";

const InfluencerAvatar = ({
  influencer,
  horizontal = false,
  size = 60,
  outline = 0,
  nameTextStyle,
  handleTextStyle,
}) => {
  const styles = useStyle(horizontal);
  const avatar = useMemo(() => influencer.avatar, [influencer]);
  return (
    <View style={styles.influencerAvatarContainer}>
      <Avatar image={avatar} size={size} outline={outline} />
      <View style={styles.textContainer}>
        <Text style={[styles.influencerNameText, nameTextStyle]}>
          {influencer.username}
        </Text>
        <Text style={[styles.influencerHandleText, handleTextStyle]}>
          {influencer.handle}
        </Text>
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
