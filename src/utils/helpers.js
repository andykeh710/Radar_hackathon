export const getIndexFromFlatlist = (event) => {
  const totalWidth = event.nativeEvent.layoutMeasurement.width;
  const xPosition = event.nativeEvent.contentOffset.x;
  const index = Math.round(xPosition / totalWidth);
  return index;
};
