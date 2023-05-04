import GridList from './GridList/GridList.component.vue';
import Label from './Label/Label.component.vue';
import Like from './Like/Like.component.vue';
import Navbar from './Navbar/Navbar.component.vue';
import PokemonCard from './PokemonCard/PokemonCard.component.vue';

export const installGlobalComponents = (app) => {
  app.component('jublia-grid', GridList);
  app.component('jublia-label', Label);
  app.component('jublia-like', Like);
  app.component('jublia-nav', Navbar);
  app.component('jublia-card', PokemonCard);
};
