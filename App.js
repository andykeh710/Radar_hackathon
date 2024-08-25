import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Onboarding from "./src/screens/Onboarding";
import HomeScreen from "./src/screens/HomeScreen";
import ThemeProvider from "./src/context/ThemeProvider";
import "react-native-reanimated";

const App = () => {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <HomeScreen />
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
  },
});
