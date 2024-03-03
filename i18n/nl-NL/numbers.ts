import { splitNumberIntoDigits } from '../../helpers/split-number-into-digits';
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

const SEPERATOR_TENS = 'en';

type TBaseTranslationKey = keyof typeof baseTranslations;

export const translateNumber = (input: number): string => {
  const parts = input.toString().split('');

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
          baseTranslations[digits[1] as TBaseTranslationKey],
          baseTranslations[(digits[0] * 10) as TBaseTranslationKey],
        ];

  return segments.join(SEPERATOR_TENS);
};
