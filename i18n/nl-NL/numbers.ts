import type { TBaseNumberTranslations } from '../../types/number-translation-map';

const baseTranslations: TBaseNumberTranslations = {
  0: 'nul',
  1: 'een',
  2: 'twee',
  3: 'drie',
  4: 'vier',
  5: 'vijf',
  6: 'zes',
  7: 'zeven',
  8: 'acht',
  9: 'negen',
  10: 'tien',
  11: 'elf',
  12: 'twaalf',
  13: 'dertien',
  14: 'veertien',
  15: 'vijftien',
  16: 'zestien',
  17: 'zeventien',
  18: 'achttien',
  19: 'negentien',
  20: 'twintig',
  30: 'dertig',
  40: 'veertig',
  50: 'vijftig',
  60: 'zestig',
  70: 'zeventig',
  80: 'tachtig',
  90: 'negentig',
  100: 'honderd',
  1000: 'duizend',
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
          baseTranslations[parts[1] as TBaseTranslationKey],
          baseTranslations[(parts[0] * 10) as TBaseTranslationKey],
        ];

  return segments.join('en');
};
