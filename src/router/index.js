import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import DocsLayout from '@/views/Docs.view.vue';
import NotFoundView from '@/views/NotFound.view.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'section',
    },
  },

  // Docs routes
  {
    path: '/:section*',
    name: 'section',
    component: DocsLayout,
    pathToRegexpOptions: { strict: false },
  },

  // Routes not found - 404
  {
    path: '/404',
    name: '404',
    component: NotFoundView,
  },
  {
    path: '*',
    redirect: {
      name: '404',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
