import {
  StyleSheet,
  Text,
  View,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import FormTextInput from "../components/FormTextInput";
import Avatar from "../components/Avatar";
import CircularButton from "../components/CircularButton";
import { useColors } from "../hooks/useColors";
import { ScrollView } from "moti";
import { stylings, typography } from "../misc/styles";
import ScoreBlockGroup from "../patterns/ScoreBlockGroup";
import MentionGroup from "../patterns/MentionGroup";
import OverallRatingGroup from "../patterns/OverallRatingGroup";
import AccoladeGroup from "../patterns/AccoladeGroup";
import Button from "../components/Button";
import PostSnippet from "../components/PostSnippet";

const InfluencerReportScreen = () => {
  const styles = useStyle();
  const [searchString, setSearchString] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.reportCardContainer}>
          <HeaderSection
            styles={styles}
            searchString={searchString}
            onChangeText={setSearchString}
          />
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitleText}>Influencer Report</Text>
            <View style={styles.actionButtonsContainer}>
              <CircularButton
                iconFamily="ionicons"
                icon="refresh"
                iconSize="20"
              />
              <CircularButton
                iconFamily="ionicons"
                icon="share-social"
                iconSize="20"
              />
            </View>
          </View>
          <ScoreSection styles={styles} />
          <RecentPostSection styles={styles} />
          <AccoladeSection styles={styles} />
        </View>
      </ScrollView>
    </View>
  );
};
export default InfluencerReportScreen;
const useStyle = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    accoladeSectionContainer: {
      justifyContent: "center",

      marginBottom: 20,
    },
    actionButtonsContainer: {
      flexDirection: "row",
    },
    container: {
      flex: 1,
      backgroundColor: colorScheme.background.primary,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      margin: 10,
    },
    recentPostSectionContainer: {
      justifyContent: "center",
      // marginHorizontal: 25,
      marginBottom: 20,
    },
    reportCardContainer: {
      paddingTop: 45,
      backgroundColor: colorScheme.background.cardBg,
      borderRadius: stylings.borderRadiusMedium,
    },
    scoreContainer: {
      justifyContent: "center",
      marginHorizontal: 25,
      marginBottom: 20,
    },
    sectionHeaderContainer: {
      margin: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    sectionTitleText: {
      color: colorScheme.text.primary,
      fontSize: typography.fontStyles.subheading.fontSize,
      fontWeight: "700",
      letterSpacing: 0.5,
    },
    subSectionTitleText: {
      margin: 10,
      fontSize: typography.fontStyles.callout.fontSize,
      color: colorScheme.text.secondary,
      letterSpacing: 0.5,
    },
  });
  return styles;
};
const HeaderSection = ({ styles, searchString, onChangeText }) => {
  return (
    <View style={styles.headerContainer}>
      <FormTextInput
        value={searchString}
        onChangeText={(value) => onChangeText(value)}
        placeholder="Find Influencers"
        icon="search1"
        textFieldStyle={{ paddingVertical: 15 }}
      />
      <Avatar
        image={{ uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" }}
        outline={1}
      />
    </View>
  );
};
const ScoreSection = ({ styles }) => {
  return (
    <View style={styles.scoreContainer}>
      <View>
        <Text style={styles.subSectionTitleText}>Score</Text>
      </View>
      <OverallRatingGroup />
      <ScoreBlockGroup />
      <MentionGroup />
    </View>
  );
};
const RecentPostSection = ({ styles }) => {
  const [activeFilter, setActiveFilter] = useState(7);
  const colorScheme = useColors();
  const { width } = useWindowDimensions();
  const ITEM_SIZE = width * 0.4;
  const SNIPPETS = [
    {
      id: 1,
      headline: "25 Tweets about ETH",
      description: "Mostly Positive",
      score: 87,
    },
    {
      id: 2,
      headline: "2 Tweets about BTC",
      description: "Mostly Positive",
      score: 90,
    },
    {
      id: 3,
      headline: "134 Tweets about Dodge Coin",
      description: "Some negative. Mostly Positive",
      score: 65,
    },
  ];
  const filters = [
    {
      id: 1,
      value: 7,
      label: "7 Days",
    },
    {
      id: 2,
      value: 30,
      label: "30 Days",
    },
    {
      id: 3,
      value: 100,
      label: "All",
    },
  ];
  return (
    <View style={styles.accoladeSectionContainer}>
      <Text style={[styles.subSectionTitleText, { paddingHorizontal: 25 }]}>
        Recent
      </Text>
      <View>
        <FlatList
          data={filters}
          keyExtractor={(item) => item.id}
          horizontal
          snapToInterval={ITEM_SIZE}
          decelerationRate={0}
          contentContainerStyle={{
            paddingHorizontal: 25,
            alignItems: "center",
          }}
          renderItem={({ item }) => (
            <Button onPress={() => setActiveFilter(item.value)}>
              <View
                style={{
                  backgroundColor:
                    item.value === activeFilter
                      ? colorScheme.background.primary
                      : "transparent",
                  padding: 8,
                  borderRadius: 30,
                }}
              >
                <Text
                  style={{
                    color:
                      item.value === activeFilter
                        ? colorScheme.text.onButtonPrimaryDark
                        : colorScheme.text.secondary,
                    marginHorizontal: 10,
                  }}
                >
                  {item.label}
                </Text>
              </View>
            </Button>
          )}
        />
      </View>
      <FlatList
        data={SNIPPETS}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 25 }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => <PostSnippet snippet={item} />}
      />
    </View>
  );
};
const AccoladeSection = ({ styles }) => {
  return (
    <View style={styles.recentPostSectionContainer}>
      <Text style={[styles.subSectionTitleText, { paddingHorizontal: 25 }]}>
        Accolades
      </Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        <AccoladeGroup />
      </View>
    </View>
  );
};
