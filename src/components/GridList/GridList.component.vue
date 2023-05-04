<script setup>
const props = defineProps({
  items: Array
});
</script>

<template>
  <ul class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mx-auto">
    <li v-for="(item, idx) in items" :key="idx">
      <router-link :to="{ name: 'detail', params: { name: item.name } }">
        <jublia-card :pokemon="item" />
      </router-link>
    </li>
  </ul>
</template>
