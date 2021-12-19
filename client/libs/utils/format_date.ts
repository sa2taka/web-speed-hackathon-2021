/**
 *
 * @param {string} dateStr
 * @returns {string}
 */
export const formatToJp = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};

/**
 *
 * @param {string} dateStr
 * @returns {string}
 */
export const formatToIso = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toISOString();
};
