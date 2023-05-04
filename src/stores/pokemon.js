import { inject, ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', () => {
  const axios = inject('axios');

  const pokemonList = ref([]);
  const favorites = ref([]);
  const types = ref([]);
  const offset = ref(0);
  const currentDetail = ref(null);
  const selectedType = ref('');
  const searchQuery = ref('');
  const isLoading = ref(false);

  const filteredPokemonList = computed(() => {
    return selectedType.value || searchQuery.value
      ? pokemonList.value.filter(
          (pokemon) =>
            pokemon?.detail?.types.some(({ type }) => type.name === selectedType.value) &&
            pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      : pokemonList.value;
  });

  async function getPokemonList() {
    try {
      isLoading.value = true;

      const { data } = await axios.get('/pokemon', { params: { offset: offset.value, limit: 30 } });

      pokemonList.value = [...pokemonList.value, ...data.results];

      isLoading.value = false;

      for (const pokemon of pokemonList.value) {
        if (pokemon.detail) continue;

        const detailData = await getPokemonDetail(pokemon.name, false);
        pokemon.detail = detailData;
      }

      offset.value += 30;
    } catch (error) {
      throw new Error(error);
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

  function selectType(type) {
    if (selectedType.value === type) selectedType.value = '';
    else selectedType.value = type;
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
    selectedType,
    searchQuery,
    types,
    isLoading,
    getPokemonList,
    getTypeList,
    getPokemonDetail,
    getFavorites,
    selectType,
    clearState,
    clearDetail
  };
});
