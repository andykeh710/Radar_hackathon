import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  useColorScheme,
} from "react-native";
import React, { useCallback } from "react";
import { BlurView } from "expo-blur";
import { useColors } from "../hooks/useColors";
import { tabBarItems } from "../data/tabBarConfig";

const TabBar = ({ state, descriptors, navigation }) => {
  const styles = useStyle();
  const colorScheme = useColorScheme();
  const getColorSchemeIcon = useCallback(
    (index) =>
      colorScheme === "light"
        ? tabBarItems[index].icons.light
        : tabBarItems[index].icons.dark,
    [colorScheme]
  );
  const tint =
    colorScheme === "light"
      ? "systemChromeMaterialLight"
      : "systemChromeMaterialDark";

  return (
    <BlurView tint={tint} intensity={100} style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
            key={index}
          >
            <Image
              source={
                isFocused
                  ? getColorSchemeIcon(index).active
                  : getColorSchemeIcon(index).inActive
              }
              style={{ width: 18, flex: 1 }}
              resizeMode="contain"
            />
          </Pressable>
        );
      })}
    </BlurView>
  );
};

export default TabBar;

const useStyle = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    tabBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      bottom: 25,
      borderRadius: 100,
      backgroundColor: colorScheme.background.secondary,
      overflow: "hidden",
      marginHorizontal: 25,
    },
    tabBarItem: {
      flex: 1,
      alignItems: "center",
    },
  });
  return styles;
};
