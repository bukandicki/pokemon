<script setup>
import { onMounted } from 'vue';
import { usePokemonStore } from '@/stores';
import PokemonCard from '@/components/PokemonCard/PokemonCard.component.vue';

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
      <ul class="grid 2xl:grid-cols-5 gap-4 mx-auto" v-else>
        <li v-for="(pokemon, idx) in pokemonStore.favorites" :key="idx">
          <router-link :to="{ name: 'detail', params: { name: pokemon.name } }">
            <PokemonCard :pokemon="pokemon" />
          </router-link>
        </li>
      </ul>
      <div id="infiniteScroll"></div>
    </section>
  </main>
</template>
