import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import Onboarding from "./src/screens/Onboarding";
import HomeScreen from "./src/screens/HomeScreen";
import ThemeProvider from "./src/context/ThemeProvider";
import "react-native-reanimated";
import ProfileScreen from "./src/screens/ProfileScreen";
import InfluencerReportScreen from "./src/screens/InfluencerReportScreen";
import CircularButton from "./src/components/CircularButton";

const App = () => {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <InfluencerReportScreen />
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
});
