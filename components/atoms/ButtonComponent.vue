<template>
  <button
    type="button"
    class="rounded-3xl px-8 py-2 font-bold transition-colors"
    :class="variantClasses"
    :="$attrs"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  variant?: ButtonVariant;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
});

const variantClassMap: Record<ButtonVariant, Record<string, boolean>> = {
  primary: {
    'bg-primary-500 hover:bg-primary-400 text-white': true,
  },
  secondary: {
    'bg-secondary-300 hover:bg-secondary-200 text-black': true,
  },
};

const variantClasses = computed(() => variantClassMap[props.variant]);
</script>
