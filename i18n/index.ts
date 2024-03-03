import { Locale } from '../types/locale';
import type { TCommonTranslations } from '../types/common-translations';
import { translateNumber as nlNlTranslateNumber } from './nl-NL/numbers';
import { common as nlNLCommon } from './nl-NL/common';
import { translateNumber as enUSTranslateNumber } from './en-US/numbers';
import { common as enUSCommon } from './en-US/common';

export const translations: Record<
  Locale,
  { translateNumber: (input: number) => string; common: TCommonTranslations }
> = {
  [Locale.nlNL]: {
    translateNumber: nlNlTranslateNumber,
    common: nlNLCommon,
  },
  [Locale.enUS]: {
    translateNumber: enUSTranslateNumber,
    common: enUSCommon,
  },
};
