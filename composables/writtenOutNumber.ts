import { translations } from '../i18n';
import type { Locale } from '../types/locale';

export const useWrittenOutNumber = (
  input: Ref<number>,
  locale: Ref<Locale>,
) => {
  const writtenOutNumber = ref<string>('');

  watchEffect(() => {
    try {
      writtenOutNumber.value = translations[locale.value].translateNumber(
        input.value,
      );
    } catch {
      writtenOutNumber.value =
        translations[locale.value].common.invalidNumberMessage;
    }
  });

  return writtenOutNumber;
};
