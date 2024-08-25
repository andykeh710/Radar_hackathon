import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  useColorScheme,
  FlatList,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useColors } from "../hooks/useColors";
import { typography, stylings } from "../misc/styles";
import CircularButton from "../components/CircularButton";
import { _influencers } from "../data/influencers";
import { categories, filterOptions } from "../misc/constants";
import InfluencerAvatar from "../components/InfluencerAvatar";
import Filters from "../components/Filters";
import Avatar from "../components/Avatar";
import FeedCard from "../components/FeedCard";
import { BlurView } from "expo-blur";

const HomeScreen = () => {
  const styles = useStyle();
  const colorScheme = useColorScheme();
  const tint = colorScheme === "light" ? "systemThinMaterialLight" : "dark";
  return (
    <View style={styles.container}>
      <BlurView
        intensity={90}
        tint={tint}
        style={styles.headerSectionContainer}
      >
        <SafeAreaView>
          <HeaderSection styles={styles} />
        </SafeAreaView>
      </BlurView>
      <ScrollView>
        <View style={styles.topCard}>
          <FilterSection styles={styles} colorScheme={colorScheme} />
        </View>
        <View style={styles.feedSectionContainer}>
          <Text style={styles.sectionTitle}>Feeds</Text>
          <FeedSection />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const useStyle = () => {
  const colorScheme = useColors();
  const { width, height } = useWindowDimensions();

  const styles = StyleSheet.create({
    avatarsContainer: {
      flex: 1,
      flexDirection: "row",
      paddingVertical: 15,
      marginBottom: 10,
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
    feedSectionContainer: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },
    glanceSectionContainer: {},
    sectionTitle: {
      color: colorScheme.text.secondary,
      fontSize: typography.fontStyles.caption1.fontSize,
      fontWeight: "600",
      letterSpacing: stylings.letterSpacing,
      paddingHorizontal: 20,
      marginVertical: 8,
    },
    userNameText: {
      color: colorScheme.text.primary,
      fontSize: typography.fontStyles.headline.fontSize,
      fontWeight: "800",
      letterSpacing: stylings.letterSpacing,
    },
    userSectionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    userContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 20,
    },
    userNameContainer: {
      paddingHorizontal: 20,
    },
    tabScrollContainer: {
      flex: 1,
      paddingHorizontal: 15,
    },
    topCard: {
      flex: 1,
      paddingTop: height * 0.16,
      backgroundColor: colorScheme.background.cardBg,
      borderBottomLeftRadius: stylings.borderRadiusMedium,
      borderBottomRightRadius: stylings.borderRadiusMedium,
    },
    headerSectionContainer: {
      overflow: "hidden",
      borderBottomLeftRadius: stylings.borderRadiusMedium,
      borderBottomRightRadius: stylings.borderRadiusMedium,
      position: "absolute",
      height: height * 0.15,
      width: width,
      top: 0,
      zIndex: 1,
    },
  });
  return styles;
};

const HeaderSection = ({ styles }) => {
  // Variables to be replaced once backend is ready
  const AVATAR = {
    uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
  };
  const USERNAME = "Ethmaster";

  return (
    <View style={styles.userSectionContainer}>
      <View style={styles.userContainer}>
        <Avatar image={AVATAR} />
        <View style={styles.userNameContainer}>
          <Text style={styles.caption}>Welcome Back</Text>
          <Text style={styles.userNameText}>{USERNAME}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CircularButton icon="bell" iconSize="20" style={styles.button} />
      </View>
    </View>
  );
};

const FilterSection = ({ styles, colorScheme }) => {
  const [activeFilter, setActiveFilter] = useState(categories.TRENDING);
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  // data
  const INFLUENCERS = _influencers;
  // functions
  const handleFilterPress = (filter, index) => {
    setActiveFilter(filter.option);
    setIndex(index);
  };

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      viewOffset: 5,
      viewPosition: 0.5,
    });
  }, [index]);

  return (
    <>
      <View style={styles.glanceSectionContainer}>
        <Text style={styles.sectionTitle}>At a glance</Text>
        <FlatList
          ref={ref}
          contentContainerStyle={{ paddingRight: 20 }}
          style={styles.tabScrollContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={0}
          data={filterOptions}
          keyExtractor={(item) => item.option}
          renderItem={({ item, index }) => (
            <Filters
              key={item.label}
              activeFilter={activeFilter}
              filter={item}
              onPress={() => handleFilterPress(item, index)}
            />
          )}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={styles.avatarsContainer}
      >
        {INFLUENCERS.filter((influencer) =>
          influencer.category.includes(activeFilter)
        ).map((influencer) => (
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

const FeedSection = () => {
  return <FeedCard />;
};
