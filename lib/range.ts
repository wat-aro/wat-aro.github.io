export const range = (n: number): number[] =>
  Array(n)
    .fill('')
    .map((_, index) => index + 1);
