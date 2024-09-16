import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ThemeProvider from "./src/context/ThemeProvider";
import "react-native-reanimated";

// Custom Screens
import Onboarding from "./src/screens/Onboarding";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import InfluencerReportScreen from "./src/screens/InfluencerReportScreen";

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
