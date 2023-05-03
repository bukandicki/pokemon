<script setup>
import { onMounted, ref } from 'vue';
import { usePokemonStore } from '@/stores';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const pokemonStore = usePokemonStore();

const showSearch = ref(false);
const showType = ref(false);
const showTypeList = ref(false);
const selectedType = ref(null);

const handleSearch = (e) => {
  pokemonStore.searchQuery = e.target.value;
};

const handleSelectedType = (type) => {
  if (selectedType.value === type) selectedType.value = null;
  else selectedType.value = type;
};

onMounted(() => {
  pokemonStore.getTypeList();
});
</script>

<template>
  <header>
    <nav
      class="shadow-2xl backdrop-blur-xl z-20 transition-all fixed left-1/2 -translate-x-1/2 rounded-3xl"
      :class="
        pokemonStore.isLoading
          ? 'bottom-20 shadow-2xl px-10 py-4 border-2'
          : 'bottom-10 shadow-xl p-4 border'
      "
    >
      <div class="flex items-center" v-if="pokemonStore.isLoading">
        <span class="relative flex h-3 w-3">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
          ></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
        <span class="font-semibold text-sky-400 ml-3"> Loading... </span>
      </div>

      <ul class="flex space-x-3 items-center" v-else>
        <template v-if="/(detail|favorite)/.test(route.name)">
          <li>
            <button @click="router.back()">
              <em class="bx bx-arrow-back text-2xl transition-colors hover:text-sky-500"></em>
            </button>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link :to="{ name: 'favorite' }">
              <em class="bx bx-heart text-2xl transition-colors hover:text-sky-500"></em>
            </router-link>
          </li>
          <li class="relative flex items-center space-x-2">
            <button @click="showType = !showType">
              <em
                class="bx bx-filter-alt text-2xl transition-colors hover:text-sky-500"
                :class="selectedType ? 'text-sky-500' : ''"
              ></em>
            </button>
            <div
              v-if="showType"
              @click="showTypeList = !showTypeList"
              class="py-2 px-4 rounded-lg flex items-center relative justify-between min-w-[200px] cursor-pointer"
            >
              <label class="capitalize text-xl" :class="selectedType ? 'text-sky-500' : ''">
                {{ selectedType ? selectedType : 'Filter type' }}
              </label>
              <em class="bx bxs-chevron-down" :class="selectedType ? 'text-sky-500' : ''"></em>

              <ol
                class="absolute transition-all bottom-16 max-h-96 overflow-y-auto left-0 w-full shadow-lg rounded-lg bg-white"
                :class="showTypeList ? 'visible' : 'invisible'"
              >
                <li
                  v-for="(type, idx) in pokemonStore.types"
                  :key="idx"
                  @click="handleSelectedType(type)"
                  class="py-2 px-4 hover:bg-gray-100 transition-colors capitalize"
                  :class="selectedType === type ? 'bg-gray-100' : ''"
                >
                  {{ type }}
                </li>
              </ol>
            </div>
          </li>
          <li class="flex items-center">
            <button @click="showSearch = !showSearch">
              <em
                class="bx bx-search text-2xl transition-colors hover:text-sky-500"
                :class="pokemonStore.searchQuery ? 'text-sky-500' : ''"
              ></em>
            </button>
            <input
              v-if="showSearch"
              :value="pokemonStore.searchQuery"
              @change="handleSearch"
              type="text"
              class="outline-none text-xl ml-2 bg-transparent text-sky-500"
              placeholder="Search pokemon..."
            />
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>
