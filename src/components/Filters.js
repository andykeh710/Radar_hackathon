import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Button from "./Button";
import { useColors } from "../hooks/useColors";
import { typography } from "../misc/styles";

const Filters = ({ activeFilter, filter, onPress }) => {
  const styles = useStyle();
  const colorScheme = useColors();

  const isActive = filter.option === activeFilter;

  return (
    <View style={styles.tabContainer}>
      <Button
        style={
          filter.option !== activeFilter && [styles.tab, styles.inactiveTab]
        }
        onPress={onPress}
      >
        {filter.option === activeFilter && (
          <LinearGradient
            style={[styles.tab]}
            colors={colorScheme.button.activeHighlightBg}
          >
            <Text
              style={[
                styles.tabText,
                isActive ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              {filter.label}
            </Text>
          </LinearGradient>
        )}
        {filter.option !== activeFilter && (
          <Text style={styles.tabText}>{filter.label}</Text>
        )}
      </Button>
    </View>
  );
};

export default Filters;

const useStyle = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    tabContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    tab: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: colorScheme.button.inactiveBg,
      margin: 5,
    },
    inactiveTab: {
      opacity: 0.3,
    },
    tabText: {
      letterSpacing: 1,
      fontSize: typography.fontStyles.caption2.fontSize,
      fontWeight: "500",
    },
    tabTextActive: {
      color: colorScheme.button.activeLabel,
    },
    tabTextInactive: {
      color: colorScheme.button.inactiveLabel,
    },
  });

  return styles;
};
