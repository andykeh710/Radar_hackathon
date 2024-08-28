const FEED_CONTENT_TYPE = {
  SCORE_BAR: "score_bar",
};

export const FEED_POST_DATA = [
  {
    author: { name: "MMCrypto", handle: "@mmcrypto" },
    content: [
      {
        id: 1,
        type: FEED_CONTENT_TYPE.SCORE_BAR,
        payload: {
          statistic: {
            sentiment: "3.78",
            score: "95.4",
            reach: "100",
          },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut",
        },
      },
    ],
    favCount: 25,
    shareCount: 19,
  },
  {
    author: { name: "Lia Sadia", handle: "@salsabeela" },
    content: [
      {
        id: 1,
        type: FEED_CONTENT_TYPE.SCORE_BAR,
        payload: {
          statistic: {
            sentiment: "87.6",
            score: "90",
            reach: "67",
          },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut",
        },
      },
    ],
    favCount: 74,
    shareCount: 27,
  },
  {
    author: { name: "Kelly Bunning", handle: "@keling" },
    content: [
      {
        id: 1,
        type: FEED_CONTENT_TYPE.SCORE_BAR,
        payload: {
          statistic: {
            sentiment: "44.7",
            score: "85",
            reach: "32",
          },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut",
        },
      },
    ],
    favCount: 2,
    shareCount: 10,
  },
];
