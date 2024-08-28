import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "./Button";
import { Feather } from "@expo/vector-icons";
import { useColors } from "../hooks/useColors";
import { typography } from "../misc/styles";

const FeedPostReactButton = ({ icon, counter, onPress, size = 20 }) => {
  const colorScheme = useColors();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
      <Button onPress={onPress}>
        <Feather
          name={icon}
          size={size}
          color={colorScheme.text.secondary}
          style={styles.icon}
        />
      </Button>
      {counter !== undefined && (
        <Text
          style={{
            color: colorScheme.text.secondary,
            fontSize: typography.fontStyles.body.fontSize,
          }}
        >
          {counter}
        </Text>
      )}
    </View>
  );
};

export default FeedPostReactButton;

const styles = StyleSheet.create({
  icon: { marginHorizontal: 10 },
});
