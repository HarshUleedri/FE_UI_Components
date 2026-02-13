export const getpagination = (
  total: number,
  currentPage: number,
  delta = 2,
) => {
  const range: number[] = [];
  const rangeWithDot: (number | string)[] = [];
  let prev = null;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  for (let n of range) {
    if (prev) {
      if (n - prev > 2) {
        rangeWithDot.push("...");
      } else if (n - prev === 2) {
        rangeWithDot.push(prev + 1);
      }
    }

    rangeWithDot.push(n);
    prev = n;
  }

  return rangeWithDot;
};
