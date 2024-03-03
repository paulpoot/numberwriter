export const splitNumberIntoDigits = (input: number): number[] => {
  return input
    .toString()
    .split('')
    .map((part: string) => parseInt(part));
};
