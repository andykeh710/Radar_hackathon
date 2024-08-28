export const FILTER_CATEGORIES = {
  NEW: "new",
  TRENDING: "trending",
  TOP: "top_influencer",
  RECOMMENDED: "recommended",
};

export const FILTER_OPTIONS = [
  {
    option: FILTER_CATEGORIES.TRENDING,
    label: "Trending",
    active: true,
  },
  {
    option: FILTER_CATEGORIES.NEW,
    label: "New",
    active: false,
  },
  {
    option: FILTER_CATEGORIES.RECOMMENDED,
    label: "Recommended",
    active: false,
  },
  {
    option: FILTER_CATEGORIES.TOP,
    label: "Top Influencers",
    active: false,
  },
];
