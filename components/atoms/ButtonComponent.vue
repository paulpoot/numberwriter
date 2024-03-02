<template>
  <button
    type="button"
    class="bg-primary-500 hover:bg-primary-400 rounded-3xl px-8 py-2 font-bold text-white transition-colors"
    :="$attrs"
  >
    <slot />
  </button>
</template>
