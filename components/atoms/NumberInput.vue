<template>
  <input
    v-model="model"
    type="number"
    class="rounded-3xl border-2 px-8 py-2 font-bold transition-colors"
    :="$attrs"
  />
</template>

<script lang="ts" setup>
const model = defineModel<number>();
</script>
