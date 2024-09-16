import { randomUUID } from "expo-crypto";

export const tabBarItems = [
  {
    id: randomUUID(),
    screen: "HomeScreen",
    icons: {
      light: {
        active: require("../../assets/home_active_light.png"),
        inActive: require("../../assets/home_inactive_light.png"),
      },
      dark: {
        active: require("../../assets/home_active_dark.png"),
        inActive: require("../../assets/home_inactive_dark.png"),
      },
    },
  },
  {
    id: randomUUID(),
    screen: "ScoreBreakdownScreen",
    icons: {
      light: {
        active: require("../../assets/feed_active_light.png"),
        inActive: require("../../assets/feed_inactive_light.png"),
      },
      dark: {
        active: require("../../assets/feed_active_dark.png"),
        inActive: require("../../assets/feed_inactive_dark.png"),
      },
    },
  },
  {
    id: randomUUID(),
    screen: "ProfileScreen",
    icons: {
      light: {
        active: require("../../assets/profile_active_light.png"),
        inActive: require("../../assets/profile_inactive_light.png"),
      },
      dark: {
        active: require("../../assets/profile_active_dark.png"),
        inActive: require("../../assets/profile_inactive_dark.png"),
      },
    },
  },
];
