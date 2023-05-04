<script setup>
import { usePokemonStore } from '@/stores';
import { onMounted, onUnmounted, ref } from 'vue';

const pokemonStore = usePokemonStore();

const observer = ref(null);

onMounted(() => {
  if (!pokemonStore.filteredPokemonList.length) pokemonStore.getPokemonList();

  const handleObserver = (entries) => {
    if (
      !(
        entries[0].isIntersecting &&
        !pokemonStore.isLoading &&
        !pokemonStore.searchQuery &&
        pokemonStore.filteredPokemonList.length >= 30
      )
    ) {
      return;
    }

    pokemonStore.getPokemonList();
  };

  const infiniteScrollElement = document.getElementById('infiniteScroll');
  observer.value = new IntersectionObserver(handleObserver);

  observer.value.observe(infiniteScrollElement);
});

onUnmounted(() => {
  pokemonStore.clearState();
  observer.value.disconnect();
});
</script>

<template>
  <main>
    <section class="w-fit mx-auto">
      <h1 class="text-4xl text-center my-10">Pokemon List</h1>

      <div
        class="h-screen w-full flex justify-center items-center"
        v-if="!pokemonStore.isLoading && !pokemonStore.filteredPokemonList.length"
      >
        <h2 class="text-3xl font-bold text-gray-900">Pokemon not found</h2>
      </div>

      <jublia-grid v-else :items="pokemonStore.filteredPokemonList" />
      <div id="infiniteScroll"></div>
    </section>
  </main>
</template>
