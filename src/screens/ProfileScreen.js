import { StyleSheet, Text, ScrollView, View } from "react-native";
import React, { useRef } from "react";
import { useColors } from "../hooks/useColors";
import { stylings } from "../misc/styles";
import Avatar from "../components/Avatar";
import GradientButton from "../components/GradientButton";
import ScoreBlockGroup from "../patterns/ScoreBlockGroup";
import AccoladeGroup from "../patterns/AccoladeGroup";
import MentionGroup from "../patterns/MentionGroup";
import UserIdentityGroup from "../patterns/UserIdentityGroup";
import CircularButton from "../components/CircularButton";
import SettingScreen from "./SettingScreen";

const ProfileScreen = () => {
  const styles = useStyle();
  const settingRef = useRef(null);

  handleSettingPress = () => {
    settingRef.current?.openModal();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topCard}>
        <View style={styles.contentContainer}>
          <View style={styles.settingButton}>
            <CircularButton
              iconFamily="octicons"
              icon="gear"
              iconSize="20"
              onPress={handleSettingPress}
            />
          </View>
          <View style={styles.avatar}>
            <Avatar
              image={{ uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" }}
              size={100}
            />
            <Text style={styles.profileScoreText}>68</Text>
          </View>
          <UserIdentityGroup />
          <GradientButton label="PREMIUM" style={styles.membershipContainer} />
          <ScoreBlockGroup />
          <MentionGroup />
          <AccoladeGroup />
        </View>
      </View>
      <SettingScreen ref={settingRef} />
    </ScrollView>
  );
};

export default ProfileScreen;

const useStyle = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    avatar: {
      flexDirection: "row",
      alignItems: "flex-end",
      margin: 15,
    },
    container: {
      flex: 1,
      backgroundColor: colorScheme.background.primary,
    },
    contentContainer: {
      paddingTop: 45,
      justifyContent: "center",
      alignItems: "center",
    },
    membershipContainer: {
      marginBottom: 30,
      paddingHorizontal: 18,
      paddingVertical: 8,
      marginBottom: 20,
    },
    profileScoreText: {
      color: colorScheme.text.primary,
      textAlign: "left",
    },
    settingButton: {
      position: "absolute",
      top: 30,
      right: -5,
    },
    topCard: {
      flex: 0.3,
      padding: 30,
      alignItems: "center",
      borderRadius: stylings.borderRadiusMedium,
      backgroundColor: colorScheme.background.cardBg,
    },
  });
  return styles;
};
