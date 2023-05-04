<script setup>
import { computed } from 'vue';
const props = defineProps({
  isActive: Boolean,
  size: String
});

const classes = computed(() => {
  return props.size ? props.size : 'text-2xl';
});
</script>

<template>
  <button :class="classes">
    <em class="bx bxs-heart text-red-500" v-if="isActive"></em>
    <em class="bx bx-heart transition-colors hover:text-red-500" v-else></em>
  </button>
</template>
