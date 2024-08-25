export const theme = {
  light: {
    // background
    background: {
      primary: "#ffffff",
      cardBg: "#EDEDED",
      gradient: ["#7253E8", "#914BAA"],
      onCardBg: "#ffffff",
    },
    // button
    button: {
      activeBg: "#000000",
      activeIcon: "#ffffff",
      activeLabel: "#ffffff",
      activeLabelInversed: "#000000",
      activeHighlightBg: ["#000000", "#000000"],
      inactiveBg: "#D3D3D3",
      inactiveLabel: "#A4A4A4",
      disabledBg: ["#EDEDED"],
      disabledLabel: "#D3D3D3",
    },
    // text
    text: {
      primary: "#000000",
      onButtonPrimary: "#ffffff",
      secondary: "#6B6B6B",
    },
    textInput: {
      primary: "#EDEDED",
    },
  },
  dark: {
    // background
    background: {
      primary: "#24283F",
      cardBg: "#0D1025",
      gradient: ["#7253E8", "#914BAA"],
      onCardBg: "#867FA1",
    },
    // button
    button: {
      activeBg: "#24283F",
      activeIcon: "#867FA1",
      activeLabel: "#ffffff",
      activeLabelInversed: "#ffffff",
      activeHighlightBg: ["#7253E8", "#914BAA"],
      inactiveBg: "#867FA1",
      inactiveLabel: "#ffffff",
      disabledBg: ["#EDEDED"],
      disabledLabel: "#D3D3D3",
    },
    // text
    text: {
      primary: "#ffffff",
      onButtonPrimary: "#ffffff",
      secondary: "#867FA1",
    },
    textInput: {
      primary: "#867FA1",
    },
  },
};

export const stylings = {
  borderRadiusLarge: 40,
  borderRadiusMedium: 30,
  borderRadiusSmall: 20,
  letterSpacing: 1,
};

export const typography = {
  fontFamily: "avenir",
  fontStyles: {
    largeTitle: {
      weight: "bold",
      fontSize: 34,
    },
    title1: {
      weight: "regular",
      fontSize: 28,
    },
    title2: {
      weight: "regular",
      fontSize: 22,
    },
    title3: {
      weight: "regular",
      fontSize: 20,
    },
    headline: {
      weight: "semibold",
      fontSize: 17,
    },
    body: {
      weight: "regular",
      fontSize: 17,
    },
    callout: {
      weight: "regular",
      fontSize: 16,
    },
    subheading: {
      weight: "regular",
      fontSize: 15,
    },
    subheadingLight: {
      weight: "300",
      fontSize: 15,
    },
    footnote: {
      weight: "regular",
      fontSize: 13,
    },
    caption1: {
      weight: "regular",
      fontSize: 12,
    },
    caption2: {
      weight: "regular",
      fontSize: 11,
    },
  },
};
