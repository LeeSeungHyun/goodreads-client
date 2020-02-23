import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import GoodreadsLogin from '@/views/goodreads-login.vue';
import GoodreadsDetail from '@/views/goodreads-detail.vue';
import GoodreadsList from '@/views/goodreads-list.vue';
import GoodreadsRegister from '@/views/goodreads-register.vue';

Vue.use(VueRouter);

// const requireAuth = () => (to, from, next) => {
//   console.log(store.getter.userInfo)
//   if(store.getter.userInfo.hasOwnProperty('user')) {
//     return next();
//   } else {
//     next('/list');
//   }
// };

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
    },
    {
      path: '/register',
      component: GoodreadsRegister
    },
  ]
});