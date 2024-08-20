import React, { useState } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { theme } from "../misc/styles";
// Custom Components
import Button from "../components/Button";
import SignInScreen from "./SignInScreen";
import GradientButton from "../components/GradientButton";
import Carousel from "../components/Carousel";

export default function Onboarding() {
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const styles = useStyle();

  return (
    <View style={styles.container}>
      <Carousel />

      <View style={styles.card}>
        <GradientButton
          colorScheme={colorScheme}
          label="CREATE ACCOUNT"
          style={{ marginHorizontal: 30 }}
        />
        <Button
          style={styles.buttonSimple}
          onPress={() => setSignInModalVisible(true)}
        >
          <Text style={styles.buttonLabel}>SIGN IN</Text>
        </Button>
      </View>
      <SignInScreen
        isVisible={signInModalVisible}
        onClose={() => setSignInModalVisible(false)}
      />
    </View>
  );
}

const useStyle = () => {
  const colorScheme = useColorScheme();
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
    container: {
      flex: 1,
      backgroundColor:
        colorScheme === "light"
          ? theme.light.background.primary
          : theme.dark.background.primary,
      justifyContent: "center",
    },
  });

  return styles;
};
