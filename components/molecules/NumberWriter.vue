<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-4">
      <NumberInput v-model="inputNumber" />
      <ButtonComponent
        v-for="localeKey in Object.values(Locale)"
        :key="localeKey"
        type="button"
        :variant="locale === localeKey ? 'primary' : 'secondary'"
        @click="activateLocale(localeKey)"
        >{{ localeKey }}</ButtonComponent
      >
    </div>

    <p>{{ writtenOutNumber }}</p>
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
