import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Accolade from "../components/Accolade";

const AccoladeGroup = () => {
  return (
    <View style={styles.accoladesContainer}>
      <Accolade title="HIDDEN GEM" description="Short-Term" />
      <Accolade title="OPTIMISTIC" description="Short-Term" />
      <Accolade title="OG" description="Short-Term" />
    </View>
  );
};

export default AccoladeGroup;

const styles = StyleSheet.create({
  accoladesContainer: {
    flexDirection: "row",
  },
});
