<script setup>
import { onUnmounted, ref, watchEffect, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '@/stores';
import { addToFavorite } from '@/lib/utils';

const route = useRoute();
const pokemonStore = usePokemonStore();
const detail = ref(null);

pokemonStore.getPokemonDetail(route.params.name);
pokemonStore.getFavorites();

watchEffect(() => (detail.value = pokemonStore.currentDetail));

const isFavorite = computed(() => {
  return detail.value && pokemonStore.favorites.some((fav) => fav.detail.id === detail.value.id);
});

onUnmounted(() => {
  pokemonStore.clearDetail();
});
</script>
<template>
  <main>
    <section>
      <img class="h-96 mx-auto" :src="detail.sprites.front_default" :alt="detail.name" />
      <div class="flex flex-col items-center">
        <h1 class="text-center text-6xl capitalize font-bold m-4">{{ detail.name }}</h1>
        <div class="flex space-x-2">
          <jublia-label class="w-fit" v-for="(type, idx) in detail.types" :key="idx">
            {{ type.type.name }}
          </jublia-label>
        </div>

        <jublia-like
          :isActive="isFavorite"
          size="text-4xl"
          class="mt-4"
          @click="addToFavorite($event, pokemonStore, { name: detail.name, detail })"
        />
      </div>
    </section>

    <section class="m-10 lg:border-l-8 lg:p-8 md:pt-2 lg:border-sky-500">
      <h2 class="text-2xl capitalize font-bold mb-10 text-sky-500">Information</h2>
      <div class="grid max-md:mx-auto md:grid-cols-3 w-fit gap-14">
        <div class="text-center">
          <label class="block text-xl text-gray-400 uppercase font-bold"> Experiences </label>
          <span class="font-bold text-4xl">{{ detail.base_experience }}</span>
        </div>
        <div class="text-center">
          <label class="block text-xl text-gray-400 uppercase font-bold"> Height </label>
          <span class="font-bold text-4xl">{{ detail.height }}</span>
        </div>
        <div class="text-center">
          <label class="block text-xl text-gray-400 uppercase font-bold"> Weight </label>
          <span class="font-bold text-4xl">{{ detail.weight }}</span>
        </div>
      </div>
    </section>

    <section class="m-10 lg:border-l-8 lg:p-8 md:pt-2 lg:border-sky-500">
      <h2 class="text-2xl capitalize font-bold mb-10 text-sky-500">Stats</h2>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-flow-col gap-14">
        <div v-for="(stat, idx) in detail.stats" :key="idx" class="text-center">
          <label class="block 2xl:text-xl text-gray-400 uppercase font-bold">
            {{ stat.stat.name }}
          </label>
          <div>
            <span class="font-bold text-4xl">{{ stat.base_stat }}</span>
            <span class="font-bold ml-1">pts</span>
          </div>
        </div>
      </div>
    </section>

    <section class="m-10 lg:border-l-8 lg:p-8 md:pt-2 lg:border-sky-500">
      <h2 class="text-2xl capitalize font-bold mb-10 text-sky-500">Abilities</h2>
      <div class="flex flex-wrap gap-10">
        <div v-for="(ability, idx) in detail.abilities" :key="idx" class="text-center">
          <label
            class="block text-xl text-gray-500 uppercase font-bold border rounded-full p-4 w-fit"
          >
            {{ ability.ability.name }}
          </label>
        </div>
      </div>
    </section>

    <section class="m-10 lg:border-l-8 lg:p-8 md:pt-2 lg:border-sky-500">
      <h2 class="text-2xl capitalize font-bold mb-10 text-sky-500">Moves</h2>
      <div class="flex flex-wrap gap-10">
        <div v-for="(move, idx) in detail.moves" :key="idx" class="text-center">
          <label class="block text-xl text-gray-500 uppercase font-bold border rounded-full p-4">
            {{ move.move.name }}
          </label>
        </div>
      </div>
    </section>
  </main>
</template>
