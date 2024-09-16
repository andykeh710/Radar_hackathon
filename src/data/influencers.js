import { FILTER_CATEGORIES } from "../misc/constants";

export const _influencers = [
  {
    id: 1,
    username: "MMCrypto",
    handle: "@mmcrypto",
    avatar: {
      uri: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    category: [
      FILTER_CATEGORIES.NEW,
      FILTER_CATEGORIES.TRENDING,
      FILTER_CATEGORIES.RECOMMENDED,
    ],
  },
  {
    id: 2,
    username: "Lia Sadia",
    handle: "@salsabeela",
    avatar: { uri: "https://pbs.twimg.com/media/FmZf1SWagAAiGNg.jpg" },
    category: [FILTER_CATEGORIES.TRENDING, FILTER_CATEGORIES.RECOMMENDED],
  },
  {
    username: "Kelly Bunning",
    handle: "@keling",
    avatar: { uri: "https://pbs.twimg.com/media/FmSgc2-aAAIXH80.jpg" },
    category: [
      FILTER_CATEGORIES.TRENDING,
      FILTER_CATEGORIES.TOP,
      FILTER_CATEGORIES.RECOMMENDED,
    ],
  },
  {
    username: "Luc Doc",
    handle: "@luc_doc(fi)",
    avatar: { uri: "https://pbs.twimg.com/media/Fl0y_iZXEAAlDqO.jpg" },
    category: [FILTER_CATEGORIES.RECOMMENDED],
  },
  {
    username: "Crypto Kitty",
    handle: "@cryptkitty",
    avatar: {
      uri: "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    category: [
      FILTER_CATEGORIES.NEW,
      FILTER_CATEGORIES.TRENDING,
      FILTER_CATEGORIES.TOP,
    ],
  },
];
