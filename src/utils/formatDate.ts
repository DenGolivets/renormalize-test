export const formatDate = (date: string): string => {
  return new Date(date)
    .toLocaleDateString("uk-UA")
    .replaceAll(".", "/");
};
