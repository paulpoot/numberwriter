<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-4">
      <NumberInput v-model="inputNumber" />
      <ButtonComponent type="button" variant="primary">Test</ButtonComponent>
    </div>

    <p>{{ inputNumber }}</p>
  </div>
</template>

<script lang="ts" setup>
const inputNumber = ref(0);
</script>

<style></style>
