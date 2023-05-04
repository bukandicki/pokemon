<script setup>
import { usePokemonStore } from '@/stores';
import { computed, onMounted } from 'vue';

const props = defineProps({ pokemon: Object });

const pokemonStore = usePokemonStore();

const stats = computed(() => {
  return props?.pokemon?.detail?.stats.reduce((filtered, stat) => {
    filtered[stat.stat.name] = stat.base_stat;
    if (/^(hp|attack)/.test(stat.stat.name))
      filtered.push({
        value: stat.base_stat,
        name: stat.stat.name,
        color: stat.stat.name === 'hp' ? 'text-green-500' : 'text-red-500'
      });
    return filtered;
  }, []);
});

const isFavorite = computed(() => {
  return (
    props?.pokemon?.detail &&
    pokemonStore.favorites.some(({ detail }) => detail.id === props?.pokemon?.detail?.id)
  );
});

const addToFavorite = (e) => {
  e.preventDefault();

  pokemonStore.getFavorites();

  const isExist = pokemonStore.favorites.some(
    ({ detail }) => detail.id === props?.pokemon?.detail?.id
  );
  const filteredFavorites = pokemonStore.favorites.filter(
    ({ detail }) => detail.id !== props?.pokemon?.detail?.id
  );

  if (isExist) pokemonStore.favorites = filteredFavorites;
  else pokemonStore.favorites = [...pokemonStore.favorites, props?.pokemon];

  localStorage.setItem('favorites', JSON.stringify(pokemonStore.favorites));
};

onMounted(() => {
  pokemonStore.getFavorites();
});
</script>
<template>
  <div
    class="border rounded-2xl p-4 transition-shadow hover:shadow-lg min-w-[250px] min-h-[150px] relative group"
  >
    <div class="flex space-x-2 mb-2">
      <jublia-label v-for="(item, index) in pokemon?.detail?.types" :key="index">
        {{ item.type.name }}
      </jublia-label>
    </div>

    <button
      class="absolute z-10 top-3 right-3"
      :class="isFavorite ? '' : 'transition-opacity opacity-0 group-hover:opacity-100'"
      @click="addToFavorite"
    >
      <em class="bx bxs-heart text-2xl text-red-500" v-if="isFavorite"></em>
      <em class="bx bx-heart text-2xl transition-colors hover:text-red-500" v-else></em>
    </button>

    <figure>
      <div class="w-24 h-24 bg-gray-100 mx-auto" v-if="!pokemon.detail"></div>
      <img
        v-else
        class="mx-auto"
        :src="pokemon.detail.sprites.front_default"
        :alt="`${pokemon.name} avatar`"
      />
      <figcaption class="font-medium text-center capitalize">
        #{{ pokemon?.detail?.id }} {{ pokemon.name }}
      </figcaption>
    </figure>
    <ul
      class="flex justify-center mt-4 space-x-5 before:absolute before:w-1/4 before:h-[1px] before:bg-gray-200"
    >
      <li v-for="stat in stats" :key="stat.name" class="text-center mt-4">
        <strong class="uppercase text-xs text-gray-400">{{ stat.name }}</strong>
        <span class="font-bold text-2xl block" :class="stat.color">{{ stat.value }}</span>
      </li>
    </ul>
  </div>
</template>
