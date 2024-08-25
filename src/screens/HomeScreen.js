import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useMemo } from "react";
import { useColors } from "../hooks/useColors";
import { typography, stylings } from "../misc/styles";
import CircularButton from "../components/CircularButton";
import { _influencers } from "../data/influencers";
import { categories, filterOptions } from "../misc/constants";
import InfluencerAvatar from "../components/InfluencerAvatar";
import Filters from "../components/Filters";
import Avatar from "../components/Avatar";

const HomeScreen = () => {
  const styles = useStyle();
  const colorScheme = useColors();

  // Variables to be replaced after data fetching is
  // implemented
  const USERNAME = "Ethmaster";
  const AVATAR = useMemo(() => ({
    uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
  }));

  // data
  const INFLUENCERS = _influencers;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topCard}>
          <SafeAreaView style={styles.topCardContentContainer}>
            <Header avatar={AVATAR} userName={USERNAME} styles={styles} />
            <FilterMenu
              filterOptions={filterOptions}
              influencers={INFLUENCERS}
              styles={styles}
              colorScheme={colorScheme}
            />
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const useStyle = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    avatarsContainer: {
      flex: 1,
      flexDirection: "row",
      paddingTop: 20,
      paddingBottom: 10,
    },
    buttonContainer: {
      justifyContent: "center",
      margin: 10,
    },
    button: {
      height: 40,
      width: 40,
    },
    container: {
      flex: 1,
      backgroundColor: colorScheme.background.primary,
    },
    caption: {
      color: colorScheme.text.secondary,
      fontSize: typography.fontStyles.title3.size,
      fontWeight: "300",
      letterSpacing: stylings.letterSpacing,
      marginVertical: 3,
    },
    glanceSectionContainer: {
      flex: 0.5,
      marginTop: 5,
    },
    sectionTitle: {
      color: colorScheme.text.secondary,
      fontSize: typography.fontStyles.caption1.fontSize,
      fontWeight: "600",
      letterSpacing: stylings.letterSpacing,
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    userNameText: {
      color: colorScheme.text.primary,
      fontSize: typography.fontStyles.headline.fontSize,
      fontWeight: "800",
      letterSpacing: stylings.letterSpacing,
    },
    userSectionContainer: {
      flex: 0.5,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    userContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 20,
    },
    userAvatarContainer: {
      height: 50,
      width: 50,
      borderRadius: 50,
      resizeMode: "contain",
      marginRight: 10,
    },
    userNameContainer: {
      paddingHorizontal: 20,
    },
    tabScrollContainer: {
      flex: 1,
      paddingHorizontal: 15,
    },
    tabContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },

    tab: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: colorScheme.button.inactiveBg,
      margin: 5,
    },
    inactiveTab: {
      opacity: 0.5,
    },
    tabText: {
      color: colorScheme.text.onButtonPrimary,
      letterSpacing: stylings.letterSpacing,
      fontSize: typography.fontStyles.caption2.fontSize,
      fontWeight: "500",
    },
    topCard: {
      flex: 1,
      backgroundColor: colorScheme.background.cardBg,

      borderBottomLeftRadius: stylings.borderRadiusMedium,
      borderBottomRightRadius: stylings.borderRadiusMedium,
    },
    topCardContentContainer: {
      flex: 1,
      justifyContent: "space-between",
      marginBottom: 20,
    },
  });
  return styles;
};

const Header = ({ avatar, styles, userName }) => {
  return (
    <View style={styles.userSectionContainer}>
      <View style={styles.userContainer}>
        <Avatar image={avatar} />
        <View style={styles.userNameContainer}>
          <Text style={styles.caption}>Welcome Back</Text>
          <Text style={styles.userNameText}>{userName}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CircularButton icon="bell" iconSize="20" style={styles.button} />
      </View>
    </View>
  );
};

const FilterMenu = ({ styles, filterOptions, influencers, colorScheme }) => {
  const [activeFilter, setActiveFilter] = useState(categories.TRENDING);

  // functions
  const handleFilterPress = (filter) => {
    setActiveFilter(filter.option);
  };
  return (
    <>
      <View style={styles.glanceSectionContainer}>
        <Text style={styles.sectionTitle}>At a glance</Text>
        <ScrollView
          style={styles.tabScrollContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {filterOptions.map((filter) => (
            <Filters
              key={filter.label}
              activeFilter={activeFilter}
              filter={filter}
              onPress={() => handleFilterPress(filter)}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        style={styles.avatarsContainer}
      >
        {influencers
          .filter((influencer) => influencer.category.includes(activeFilter))
          .map((influencer) => (
            <InfluencerAvatar
              key={influencer.username}
              influencer={influencer}
              colorScheme={colorScheme}
            />
          ))}
      </ScrollView>
    </>
  );
};
