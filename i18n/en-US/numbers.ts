import { splitNumberIntoDigits } from '../../helpers/split-number-into-digits';
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

// Much of the code here is shared, should look for a way to refactor and perhaps override parts where necessary for a given language
// Setup is currently very flexible (nice for French and Danish), but for languages with similar systems such as Dutch and English
// it becomes cumbersome to maintain

export const translateNumber = (input: number): string => {
  const parts = input.toString().split('');

  // These sections could be setup recursively perhaps to make it more DRY
  if (parts.length === 6) {
    const hundredThousands = parseInt(parts.slice(0, 3).join(''));
    const remainder = parseInt(parts.slice(3, 6).join(''));

    if (remainder === 0) {
      return `${hundredThousandsString(hundredThousands)}`;
    }

    const remainderString =
      remainder >= 100 ? hundredsString(remainder) : tensString(remainder);

    return `${hundredThousandsString(hundredThousands)}${remainderString}`;
  }

  if (parts.length === 5) {
    const tenThousands = parseInt(parts.slice(0, 2).join(''));
    const remainder = parseInt(parts.slice(2, 5).join(''));

    if (remainder === 0) {
      return `${tenThousandsString(tenThousands)}`;
    }

    const remainderString =
      remainder >= 100 ? hundredsString(remainder) : tensString(remainder);

    return `${tenThousandsString(tenThousands)}${remainderString}`;
  }

  if (parts.length === 4) {
    const thousands = parseInt(parts.slice(0, 1).join(''));
    const remainder = parseInt(parts.slice(1, 4).join(''));

    if (remainder === 0) {
      return `${thousandsString(thousands)}`;
    }

    const remainderString =
      remainder >= 100 ? hundredsString(remainder) : tensString(remainder);

    return `${thousandsString(thousands)}${remainderString}`;
  }

  if (parts.length === 3) {
    const hundreds = parseInt(parts.join(''));
    return hundredsString(hundreds);
  }

  const tens = parseInt(parts.join(''));
  return tensString(tens);
};

const hundredThousandsString = (nrOfThousands: number) => {
  if (nrOfThousands < 100 || nrOfThousands >= 1000) {
    throw new Error(
      `Unexpected input for hundredThousandsString: ${nrOfThousands}`,
    );
  }

  return hundredsString(nrOfThousands) + baseTranslations[1000];
};

const tenThousandsString = (nrOfThousands: number) => {
  if (nrOfThousands < 10 || nrOfThousands >= 100) {
    throw new Error(
      `Unexpected input for tenThousandsString: ${nrOfThousands}`,
    );
  }

  return tensString(nrOfThousands) + baseTranslations[1000];
};

const thousandsString = (nrOfThousands: number) => {
  if (nrOfThousands < 1 || nrOfThousands >= 10) {
    throw new Error(`Unexpected input for thousandsString: ${nrOfThousands}`);
  }

  return (
    (nrOfThousands !== 1
      ? baseTranslations[nrOfThousands as TBaseTranslationKey]
      : '') + baseTranslations[1000]
  );
};

const hundredsString = (nr: number) => {
  if (nr >= 1000) {
    throw new Error(`Unexpected input for hundredsString: ${nr}`);
  }

  const digits = splitNumberIntoDigits(nr);
  const hundredString = `${baseTranslations[100]}${digits[1] === 0 && digits[2] === 0 ? '' : tensString(digits[1] * 10 + digits[2])}`;
  return digits[0] === 1
    ? hundredString
    : `${baseTranslations[digits[0] as TBaseTranslationKey]}${hundredString}`;
};

const tensString = (nr: number) => {
  if (nr >= 100) {
    throw new Error(`Unexpected input for tensString: ${nr}`);
  }

  if (nr <= 20) {
    return baseTranslations[nr as TBaseTranslationKey];
  }

  // nr is between 20 and 100
  const digits = splitNumberIntoDigits(nr);
  const segments =
    digits[1] === 0
      ? [baseTranslations[(digits[0] * 10) as TBaseTranslationKey]]
      : [
          baseTranslations[(digits[0] * 10) as TBaseTranslationKey],
          baseTranslations[digits[1] as TBaseTranslationKey],
        ];

  return segments.join('');
};
