export const isEmpty = (value: string) => {
  const checkLength = value.trim().length;
  return checkLength > 0 ? false : true;
};
