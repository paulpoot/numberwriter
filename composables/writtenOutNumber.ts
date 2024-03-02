import { translations } from '../i18n';
import type { Locale } from '../types/locale';

export const useWrittenOutNumber = (
  input: Ref<number>,
  locale: Ref<Locale>,
) => {
  const writtenOutNumber = ref<string>('');

  watchEffect(() => {
    writtenOutNumber.value = translations[locale.value].translateNumber(
      input.value,
    );
  });

  return writtenOutNumber;
};
