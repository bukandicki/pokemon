<script setup>
import { onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '@/stores';
import Label from '@/components/Label/Label.component.vue';

const route = useRoute();
const pokemonStore = usePokemonStore();

const detail = ref(null);

pokemonStore.getPokemonDetail(route.params.name);

watch(
  () => pokemonStore.currentDetail,
  () => (detail.value = pokemonStore.currentDetail)
);

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
          <Label class="w-fit" v-for="(type, idx) in detail.types" :key="idx">
            {{ type.type.name }}
          </Label>
        </div>
      </div>
    </section>

    <section class="m-10 border-l-8 p-8 pt-2 border-sky-500">
      <h2 class="text-2xl capitalize font-bold mb-10 text-sky-500">Information</h2>
      <div class="grid grid-cols-3 w-fit gap-14">
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

    <section class="m-10 border-l-8 p-8 pt-2 border-sky-500">
      <h2 class="text-2xl capitalize font-bold mb-10 text-sky-500">Stats</h2>
      <div class="grid grid-flow-col gap-14">
        <div v-for="(stat, idx) in detail.stats" :key="idx" class="text-center">
          <label class="block text-xl text-gray-400 uppercase font-bold">
            {{ stat.stat.name }}
          </label>
          <div>
            <span class="font-bold text-4xl">{{ stat.base_stat }}</span>
            <span class="font-bold ml-1">pts</span>
          </div>
        </div>
      </div>
    </section>

    <section class="m-10 border-l-8 p-8 pt-2 border-sky-500">
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

    <section class="m-10 border-l-8 p-8 pt-2 border-sky-500">
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
