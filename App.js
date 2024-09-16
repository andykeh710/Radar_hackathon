import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ThemeProvider from "./src/context/ThemeProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./src/components/TabBar";

// Custom Screens
import Onboarding from "./src/screens/Onboarding";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import InfluencerReportScreen from "./src/screens/InfluencerReportScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props) => <TabBar {...props} />}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Influencer" component={InfluencerReportScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
