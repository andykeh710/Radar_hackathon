import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { typography } from "../misc/styles";

const OnboardingItems = ({ item, colorScheme }) => {
  const styles = useStyle(colorScheme);
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItems;

const useStyle = (colorScheme) => {
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    description: {
      fontSize: typography.fontStyles.subheading.size,
      paddingHorizontal: 64,
      letterSpacing: 1.5,
      textAlign: "center",
      color: colorScheme.text.primary,
    },
    container: {
      flex: 1,
      justifyContent: "space-around",
      width,
      marginTop: 50,
    },
    image: {
      flex: 0.6,
      justifyContent: "center",
      width,
      resizeMode: "contain",
    },
    textContainer: {
      flex: 0.3,
    },
    title: {
      fontSize: typography.fontStyles.title3.fontSize,
      color: colorScheme.text.primary,
      fontWeight: "bold",
      padding: 20,
      textAlign: "center",
    },
  });

  return styles;
};
