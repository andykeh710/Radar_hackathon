import { _influencers } from "../data/influencers";
export const getIndexFromFlatlist = (event) => {
  const totalWidth = event.nativeEvent.layoutMeasurement.width;
  const xPosition = event.nativeEvent.contentOffset.x;
  const index = Math.round(xPosition / totalWidth);
  return index;
};

export const getAuthorAvatar = (author) => {
  return _influencers.filter(
    (influencer) => influencer.handle === author.handle
  )[0].avatar;
};
