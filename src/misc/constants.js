export const categories = {
  NEW: "new",
  TRENDING: "trending",
  TOP: "top_influencer",
  RECOMMENDED: "recommended",
};

export const filterOptions = [
  {
    option: categories.TRENDING,
    label: "Trending",
    active: true,
  },
  {
    option: categories.NEW,
    label: "New",
    active: false,
  },
  {
    option: categories.RECOMMENDED,
    label: "Recommended",
    active: false,
  },
  {
    option: categories.TOP,
    label: "Top Influencers",
    active: false,
  },
];
