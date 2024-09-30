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
            "Bitcoin enthusiast sharing insights on market trends and blockchain technology. Passionate about cryptocurrency's potential to revolutionize finance and empower individuals worldwide.",
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
            "Shy crypto enthusiast exploring the world of digital currencies. Fascinated by blockchain technology and its potential, but still learning the ropes.",
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
            "Keen market watcher with a track record of accurate, everyday financial predictions that consistently outperform expectations.",
        },
      },
    ],
    favCount: 2,
    shareCount: 10,
  },
];
