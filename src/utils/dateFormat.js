export const dateFormat = (date) => {
  return date ? new Date(date).toLocaleDateString('en-GB') : '';
};