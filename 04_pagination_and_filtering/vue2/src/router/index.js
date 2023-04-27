import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
];

const router = new VueRouter({
  routes,
});

export default router;
