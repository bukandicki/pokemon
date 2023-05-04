export const addToFavorite = (e, pokemonStore, pokemon) => {
  e.preventDefault();

  pokemonStore.getFavorites();

  const isExist = pokemonStore.favorites.some(({ detail }) => detail.id === pokemon.detail.id);
  const filteredFavorites = pokemonStore.favorites.filter(
    ({ detail }) => detail.id !== pokemon.detail.id
  );

  if (isExist) pokemonStore.favorites = filteredFavorites;
  else pokemonStore.favorites = [...pokemonStore.favorites, pokemon];

  localStorage.setItem('favorites', JSON.stringify(pokemonStore.favorites));
};
