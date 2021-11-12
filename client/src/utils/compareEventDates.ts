export const compareEventDates = (a, b) => {
  if (a.eventTime < b.eventTime) {
    return -1;
  }
  if (a.eventTime > b.eventTime) {
    return 1;
  }
  return 0;
};
