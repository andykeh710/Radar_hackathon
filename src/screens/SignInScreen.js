import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, StyleSheet, Text, View, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import { stylings, typography } from "../misc/styles";
import FormTextInput from "../components/FormTextInput";
import Button from "../components/Button";
import CloseButton from "../components/CloseButton";
import CircularButton from "../components/CircularButton";
import GradientButton from "../components/GradientButton";
import { useColors } from "../hooks/useColors";

const SignInScreen = (_, ref) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const styles = useStyle();
  const colorScheme = useColorScheme();
  const tint = colorScheme === "light" ? "systemThinMaterialLight" : "dark";
  const handleUsernameChange = (username) => {
    setLoginData({
      ...loginData,
      username,
    });
  };

  // Pass the ref of setModalIsVisible Function to parent
  useImperativeHandle(ref, () => ({
    openModal: () => setSignInModalVisible(true),
  }));

  const handleClose = () => setSignInModalVisible(false);

  const handlePasswordChange = (password) => {
    setLoginData({
      ...loginData,
      password,
    });
  };

  // TODO: Implement action
  const handlePasswordRecovery = () => {
    console.log("Recovery");
  };

  // TODO: Implement action
  const handleSignUp = () => {
    console.log("Sign Up");
  };

  // TODO: Implement action
  const handleSignIn = () => {
    console.log("Sign In");
  };

  // TODO: Implement action
  const handleAppleSignIn = () => {
    console.log("Apple Sign In");
  };

  // TODO: Implement action
  const handleGoogleSignIn = () => {
    console.log("Google Sign In");
  };
  // TODO: Implement action
  const handleFacebookSignIn = () => {
    console.log("Facebook Sign In");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={signInModalVisible}
    >
      <BlurView intensity={90} tint={tint} style={styles.modalContent}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>Welcome Back</Text>
          </View>
          <CloseButton onClose={handleClose} colorScheme={colorScheme} />
        </View>
        <View style={styles.loginFormContainer}>
          <FormTextInput
            value={loginData.username}
            onChangeText={(username) => handleUsernameChange(username)}
            placeholder="Username / Email"
            keyboardType="email-address"
            clearButtonMode="while-editing"
            icon="user"
            textFieldStyle={{ padding: 20 }}
            colorScheme={colorScheme}
          />
          <FormTextInput
            value={loginData.password}
            onChangeText={(password) => handlePasswordChange(password)}
            placeholder="Password"
            keyboardType="default"
            clearButtonMode="while-editing"
            secureTextEntry={true}
            textFieldStyle={{ padding: 20 }}
            textContainerStyle={{ width: "100%" }}
            icon="key"
            colorScheme={colorScheme}
          />
          <View style={styles.pwdCaptaionContainer}>
            <Text style={styles.caption}>Forgot Password?</Text>
            <Button onPress={handlePasswordRecovery}>
              <Text style={[styles.caption, { textDecorationLine: true }]}>
                Recover Here
              </Text>
            </Button>
          </View>
          <View>
            <GradientButton
              colorScheme={colorScheme}
              label="SIGN IN"
              onPress={handleSignIn}
              disabled={!loginData.username || !loginData.password}
            />
          </View>
          <View style={styles.midCaptaionContainer}>
            <Text style={styles.descriptionText}>or continue with</Text>
          </View>
          <View style={styles.socialBtnContainer}>
            <CircularButton
              iconFamily="fontAwesome6"
              icon="apple"
              colorScheme={colorScheme}
              style={{ width: 60, height: 60 }}
              onPress={handleAppleSignIn}
            />
            <CircularButton
              iconFamily="fontAwesome6"
              icon="google"
              colorScheme={colorScheme}
              style={{ width: 60, height: 60 }}
              onPress={handleGoogleSignIn}
            />
            <CircularButton
              iconFamily="fontAwesome6"
              icon="facebook-f"
              colorScheme={colorScheme}
              style={{ width: 60, height: 60 }}
              onPress={handleFacebookSignIn}
            />
          </View>
          <View style={styles.signUpCaptaionContainer}>
            <Text style={styles.caption}>Don't have an account?</Text>
            <Button onPress={handleSignUp}>
              <Text style={[styles.caption, { textDecorationLine: true }]}>
                Sign Up
              </Text>
            </Button>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const useStyle = () => {
  const colorScheme = useColors();
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: colorScheme.button.activeHighlightBg[0],
      borderRadius: 50,
      padding: 20,
      marginTop: 30,
    },
    buttonLabel: {
      color: colorScheme.button.activeLabelInversed,
      letterSpacing: 2,
    },

    caption: {
      color: colorScheme.text.secondary,
      marginHorizontal: 5,
      marginLeft: 1,
      letterSpacing: 0.5,
    },
    descriptionText: {
      color: colorScheme.text.primary,
      letterSpacing: 0.5,
    },
    headerContainer: {
      flex: 0.2,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    loginFormContainer: {
      flex: 0.2,
    },
    midCaptaionContainer: { alignItems: "center", marginTop: 50 },
    modalContent: {
      position: "absolute",
      bottom: 0,
      borderTopLeftRadius: stylings.borderRadiusLarge,
      borderTopRightRadius: stylings.borderRadiusLarge,
      overflow: "hidden",
      width: "100%",
      height: "93%",
      padding: 30,
    },
    pwdCaptaionContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginBottom: 30,
    },
    signUpCaptaionContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 120,
    },

    socialBtnContainer: {
      flex: 1,
      flexDirection: "row",
      padding: 20,
      justifyContent: "space-between",
    },
    titleContainer: { flex: 1 },
    title: {
      fontSize: typography.fontStyles.title1.fontSize,
      fontWeight: "bold",
      color: colorScheme.text.primary,
      marginVertical: 10,
      letterSpacing: 1,
    },
    subtitle: {
      fontSize: typography.fontStyles.title3.fontSize,
      fontWeight: "300",
      color: colorScheme.text.primary,
      letterSpacing: 1,
    },
  });
  return styles;
};

export default forwardRef(SignInScreen);
