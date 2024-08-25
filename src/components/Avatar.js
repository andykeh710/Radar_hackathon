import { StyleSheet, Image, View } from "react-native";
import React from "react";

const Avatar = ({ image, style }) => {
  return (
    <View>
      <Image source={image} style={[styles.userAvatarContainer, style]} />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  userAvatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "contain",
  },
});
