<script setup>
import { onMounted } from 'vue';
import { usePokemonStore } from '@/stores';

const pokemonStore = usePokemonStore();

onMounted(() => {
  pokemonStore.getFavorites();
});
</script>

<template>
  <main>
    <section class="w-fit mx-auto">
      <h1 class="text-4xl text-center my-10">Favorites Pokemon</h1>
      <div
        class="h-36 w-full flex justify-center items-center"
        v-if="!pokemonStore.favorites.length"
      >
        <h2 class="text-3xl font-bold text-gray-900">Empty</h2>
      </div>

      <jublia-grid v-else :items="pokemonStore.favorites" />
    </section>
  </main>
</template>
