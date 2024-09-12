import { Modal, StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { BlurView } from "expo-blur";
import { stylings } from "../misc/styles";
import { SafeAreaView } from "moti";
import CloseButton from "../components/CloseButton";

const SettingScreen = (_, ref) => {
  const styles = useStyle();
  const [settingState, setSettingState] = useState({
    isVisible: false,
  });
  const colorScheme = useColorScheme();
  const tint = colorScheme === "light" ? "light" : "dark";

  const handleClose = () => {
    setSettingState((state) => ({
      ...state,
      isVisible: false,
    }));
  };

  useImperativeHandle(ref, () => ({
    openModal: () =>
      setSettingState((state) => ({
        ...state,
        isVisible: true,
      })),
    closeModal: () =>
      setSettingState((state) => ({
        ...state,
        isVisible: false,
      })),
  }));

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={settingState.isVisible}
    >
      <BlurView tint={tint} intensity={100} style={styles.container}>
        <SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              justifyContent: "flex-end",
            }}
          >
            <CloseButton onClose={handleClose} colorScheme={colorScheme} />
          </View>
        </SafeAreaView>
      </BlurView>
    </Modal>
  );
};

export default forwardRef(SettingScreen);

const useStyle = () => {
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      borderTopLeftRadius: stylings.borderRadiusLarge,
      borderTopRightRadius: stylings.borderRadiusLarge,
      overflow: "hidden",
      width: "100%",
      height: "100%",
      padding: 30,
    },
  });
  return styles;
};
