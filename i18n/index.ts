import { Locale } from '../types/locale';
import { translateNumber as nlNlTranslateNumber } from './nl-NL/numbers';
import { translateNumber as enUSTranslateNumber } from './en-US/numbers';

export const translations: Record<
  Locale,
  { translateNumber: (input: number) => string }
> = {
  [Locale.nlNL]: {
    translateNumber: nlNlTranslateNumber,
  },
  [Locale.enUS]: {
    translateNumber: enUSTranslateNumber,
  },
};
