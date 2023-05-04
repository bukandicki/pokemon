import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView/index.component.vue')
    },
    {
      path: '/pokemon-detail/:name',
      name: 'detail',
      component: () => import('@/views/PokemonDetail/index.component.vue')
    },
    {
      path: '/favorites',
      name: 'favorite',
      component: () => import('@/views/Favorites/index.component.vue')
    }
  ]
});

export default router;
