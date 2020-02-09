import Vue from 'vue';
import VueRouter from 'vue-router';
import GoodreadsLogin from '@/views/goodreads-login.vue';
import GoodreadsDetail from '@/views/goodreads-detail.vue';
import GoodreadsList from '@/views/goodreads-list.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/login',
      component: GoodreadsLogin
    },
    {
      path: '/list',
      component: GoodreadsList
    },
    {
      path: '/list/:id',
      component: GoodreadsDetail
    }
  ]
});