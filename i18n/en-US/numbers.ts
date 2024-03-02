import type { TBaseNumberTranslations } from '../../types/number-translation-map';

const baseTranslations: TBaseNumberTranslations = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
  100: 'hundred',
  1000: 'thousand',
};

type TBaseTranslationKey = keyof typeof baseTranslations;

export const translateNumber = (input: number): string => {
  if (input >= 0 && input <= 20) {
    return translateLTETwenty(input);
  }

  if (input > 20 && input < 100) {
    return translateGTTwentyLTHundred(input);
  }
};

const translateLTETwenty = (input: number): string => {
  return baseTranslations[input as TBaseTranslationKey];
};

const translateGTTwentyLTHundred = (input: number): string => {
  const parts = input
    .toString()
    .split('')
    .map((part: string) => parseInt(part));

  if (parts.length !== 2) {
    throw new Error(
      `Unexpected input for translateGTTwentyLTHundred, received ${input}`,
    );
  }

  const segments =
    parts[1] === 0
      ? [baseTranslations[(parts[0] * 10) as TBaseTranslationKey]]
      : [
          baseTranslations[(parts[0] * 10) as TBaseTranslationKey],
          baseTranslations[parts[1] as TBaseTranslationKey],
        ];

  return segments.join('');
};
