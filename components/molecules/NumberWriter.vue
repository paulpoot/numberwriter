<template>
  <div class="flex w-full max-w-3xl flex-col items-center gap-8">
    <div class="flex flex-col gap-4 md:flex-row">
      <NumberInput v-model="inputNumber" min="0" max="999999" />
      <ButtonComponent
        v-for="localeKey in Object.values(Locale)"
        :key="localeKey"
        type="button"
        :variant="locale === localeKey ? 'primary' : 'secondary'"
        @click="activateLocale(localeKey)"
        >{{ localeKey }}</ButtonComponent
      >
    </div>

    <p class="break-words">{{ writtenOutNumber }}</p>
  </div>
</template>

<script lang="ts" setup>
import { Locale } from '../../types/locale';

const inputNumber = ref(0);
const locale = ref<Locale>(Locale.nlNL);

const activateLocale = (newLocale: Locale) => {
  locale.value = newLocale;
};

const writtenOutNumber = useWrittenOutNumber(inputNumber, locale);
</script>

<style></style>
