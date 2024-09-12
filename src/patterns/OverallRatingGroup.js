import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useColors } from "../hooks/useColors";
import { stylings, typography } from "../misc/styles";
import InfluencerAvatar from "../components/InfluencerAvatar";
import { _influencers } from "../data/influencers";
import CircularRing from "../components/CircularRing";

const OverallRatingGroup = () => {
  const INFLUENCERS = _influencers;
  const RATING = 86;
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <InfluencerAvatar
        influencer={INFLUENCERS[1]}
        size={100}
        outline={2}
        nameTextStyle={{
          fontSize: typography.fontStyles.subheading.fontSize,
          fontWeight: "bold",
        }}
      />
      <View style={styles.circularProgressContainer}>
        <CircularRing rating={RATING} />
        <Text style={styles.captionText}>Overall Rating</Text>
      </View>
    </View>
  );
};

export default OverallRatingGroup;

const useStyle = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    captionText: {
      color: colorScheme.text.secondary,
      alignSelf: "center",
      paddingTop: 10,
    },

    container: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: colorScheme.background.primary,
      borderRadius: stylings.borderRadiusSmall,
      padding: 25,
      alignItems: "center",
      justifyContent: "space-between",
    },
    circularProgressContainer: {
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    ratingText: {
      fontSize: typography.fontStyles.largeTitle.fontSize,
      fontWeight: typography.fontStyles.largeTitle.weight,
      color: colorScheme.text.primary,
    },
  });
  return styles;
};
