import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../misc/styles";
// Custom Components
import Button from "../components/Button";
import OnboardingItems from "../components/OnboardingItems";
// Helper
import { getIndexFromFlatlist } from "../utils/helpers";
// Features data
import features from "../data/features";

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const styles = useStyle();
  const ITEM_WIDTH = width;

  // Function to get the current carousel index
  const handleScroll = (event) => {
    const newIndex = getIndexFromFlatlist(event);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          data={features}
          keyExtractor={(item) => item.id}
          bounces={false}
          pagingEnabled
          horizontal
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => <OnboardingItems item={item} />}
          onScroll={handleScroll}
        />
        <View style={styles.pagination}>
          {features.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && {
                  backgroundColor:
                    colorScheme === "light"
                      ? theme.light.text.primary
                      : theme.dark.text.primary,
                  opacity: 1,
                },
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.card}>
        <Button>
          <LinearGradient
            style={styles.button}
            colors={
              colorScheme === "light"
                ? theme.light.button.activeHighlightBg
                : theme.dark.button.activeHighlightBg
            }
          >
            <Text style={styles.buttonLabel}>CREATE ACCOUNT</Text>
          </LinearGradient>
        </Button>
        <Button style={styles.buttonSimple}>
          <Text style={styles.buttonLabel}>SIGN IN</Text>
        </Button>
      </View>
    </View>
  );
}

const useStyle = () => {
  const colorScheme = useColorScheme();
  const DOT_SIZE = 4;
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor:
        colorScheme === "light"
          ? theme.light.button.activeHighlightBg[0]
          : theme.dark.button.activeHighlightBg[0],
      borderRadius: 50,
      padding: 25,
      marginHorizontal: 30,
      marginTop: 30,
    },
    buttonSimple: {
      alignItems: "center",
      borderRadius: 50,
      padding: 25,
      marginHorizontal: 30,
      marginTop: 10,
    },
    buttonLabel: {
      color: colorScheme === "light" ? "#000000" : "#ffffff",
      letterSpacing: 2,
    },
    card: {
      flex: 0.3,
      backgroundColor:
        colorScheme === "light" ? "#EDEDED" : theme.dark.background.cardBg,
      borderRadius: 30,
    },
    carouselContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor:
        colorScheme === "light"
          ? theme.light.background.primary
          : theme.dark.background.primary,
      justifyContent: "center",
    },
    dot: {
      borderRadius: 100,
      height: DOT_SIZE,
      width: DOT_SIZE,
      padding: DOT_SIZE,
      margin: 5,
      opacity: 0.3,
      backgroundColor:
        colorScheme === "light"
          ? theme.light.text.secondary
          : theme.dark.text.secondary,
    },
    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      flex: 0.2,
    },
  });

  return styles;
};
