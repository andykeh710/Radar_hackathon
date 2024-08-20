import React, { useRef } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
// Custom Components
import Button from "../components/Button";
import SignInScreen from "./SignInScreen";
import GradientButton from "../components/GradientButton";
import Carousel from "../components/Carousel";
import { useColors } from "../hooks/useColors";

export default function Onboarding() {
  const signInModalRef = useRef(null);
  const colorScheme = useColorScheme();
  const styles = useStyle();
  const handleSignInModal = () => signInModalRef.current?.openModal();

  return (
    <View style={styles.container}>
      <Carousel />
      <View style={styles.card}>
        <GradientButton
          colorScheme={colorScheme}
          label="CREATE ACCOUNT"
          style={{ marginHorizontal: 30 }}
        />
        <Button style={styles.buttonSimple} onPress={() => handleSignInModal()}>
          <Text style={styles.buttonLabel}>SIGN IN</Text>
        </Button>
      </View>
      <SignInScreen ref={signInModalRef} />
    </View>
  );
}

const useStyle = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: colorScheme.button.activeHighlightBg[0],
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
      color: colorScheme.button.activeLabelInversed,
      letterSpacing: 2,
    },
    card: {
      flex: 0.3,
      backgroundColor: colorScheme.background.cardBg,
      borderRadius: 30,
    },
    container: {
      flex: 1,
      backgroundColor: colorScheme.background.primary,
      justifyContent: "center",
    },
  });

  return styles;
};
