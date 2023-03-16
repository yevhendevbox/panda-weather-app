import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import FavoritesView from '@/views/FavoritesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
      meta: {
        title: 'Favorites'
      }
    }
  ]
});

router.beforeEach(async (to) => {
  document.title = `${to.meta.title} | Panda Weather`;
});

export default router;
