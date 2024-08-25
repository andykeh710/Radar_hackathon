import { StyleSheet, Image, View } from "react-native";
import React from "react";

const Avatar = ({ image, style, size = 50 }) => {
  return (
    <View>
      <Image
        source={image}
        style={[
          styles.userAvatarContainer,
          { height: size, width: size },
          style,
        ]}
      />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  userAvatarContainer: {
    borderRadius: 50,
    resizeMode: "contain",
  },
});
