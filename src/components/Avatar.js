import { StyleSheet, Image, View } from "react-native";
import React from "react";

const Avatar = ({ image, style, size = 50, outline }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={[
          styles.userAvatarContainer,
          { height: size, width: size, borderWidth: outline ? outline : 0 },
          style,
        ]}
      />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
  },
  userAvatarContainer: {
    borderRadius: 50,
    resizeMode: "cover",
    borderColor: "white",
  },
});
