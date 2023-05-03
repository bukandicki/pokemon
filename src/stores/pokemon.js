import { inject, ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', () => {
  const axios = inject('axios');

  const pokemonList = ref([]);
  const favorites = ref([]);
  const types = ref([]);
  const offset = ref(0);
  const currentDetail = ref(null);
  const searchQuery = ref('');
  const isLoading = ref(false);

  const filteredPokemonList = computed(() => {
    return pokemonList.value.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  async function getPokemonList() {
    try {
      isLoading.value = true;

      const { data } = await axios.get('/pokemon', { params: { offset: offset.value, limit: 30 } });

      pokemonList.value = [...pokemonList.value, ...data.results];

      for (const pokemon of pokemonList.value) {
        if (pokemon.detail) continue;

        const detailData = await getPokemonDetail(pokemon.name, false);
        pokemon.detail = detailData;
      }

      offset.value += 30;
    } catch (error) {
      throw new Error(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function getTypeList() {
    try {
      isLoading.value = true;

      const { data } = await axios.get('/type');

      types.value = data.results.map((type) => type.name);
    } catch (error) {
      throw new Error(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function getPokemonDetail(name, updateCurrentDetail = true) {
    try {
      const { data } = await axios.get(`/pokemon/${name}`);
      if (updateCurrentDetail) currentDetail.value = data;

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  function getFavorites() {
    const currentFavorites = localStorage.getItem('favorites');
    favorites.value = currentFavorites ? JSON.parse(currentFavorites) : [];
  }

  function clearDetail() {
    currentDetail.value = null;
  }

  function clearState() {
    isLoading.value = false;
    searchQuery.value = '';
  }

  return {
    pokemonList,
    favorites,
    filteredPokemonList,
    currentDetail,
    searchQuery,
    types,
    isLoading,
    getPokemonList,
    getTypeList,
    getPokemonDetail,
    getFavorites,
    clearState,
    clearDetail
  };
});
