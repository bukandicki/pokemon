<script setup>
import { usePokemonStore } from '@/stores';
import { onMounted, onUnmounted } from 'vue';
import PokemonCard from '@/components/PokemonCard/PokemonCard.component.vue';

const pokemonStore = usePokemonStore();

if (!pokemonStore.filteredPokemonList.length) pokemonStore.getPokemonList();

onMounted(() => {
  const handleObserver = (entries) => {
    if (!(entries[0].isIntersecting && !pokemonStore.isLoading && !pokemonStore.searchQuery)) {
      return;
    }

    pokemonStore.getPokemonList();
  };

  const infiniteScrollElement = document.getElementById('infiniteScroll');
  const observer = new IntersectionObserver(handleObserver);

  observer.observe(infiniteScrollElement);
});

onUnmounted(() => {
  pokemonStore.clearState();
});
</script>

<template>
  <main>
    <section class="w-fit mx-auto">
      <h1 class="text-4xl text-center my-10">Pokemon List</h1>

      <div
        class="h-screen w-full flex justify-center items-center"
        v-if="pokemonStore.searchQuery && !pokemonStore.filteredPokemonList.length"
      >
        <h2 class="text-3xl font-bold text-gray-900">Pokemon not found</h2>
      </div>
      <ul class="grid 2xl:grid-cols-5 gap-4 mx-auto" v-else>
        <li v-for="(pokemon, idx) in pokemonStore.filteredPokemonList" :key="idx">
          <router-link :to="{ name: 'detail', params: { name: pokemon.name } }">
            <PokemonCard :pokemon="pokemon" />
          </router-link>
        </li>
      </ul>
      <div id="infiniteScroll"></div>
    </section>
  </main>
</template>
