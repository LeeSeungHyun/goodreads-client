import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store';
import GoodreadsUserDetail from '@/views/goodreads-user-detail.vue'
import GoodreadsList from '@/views/goodreads-list.vue'
import GoodreadsRegister from '@/views/goodreads-register.vue'

Vue.use(VueRouter)

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
      name: 'list',
      path: '/list',
      component: GoodreadsList,
      props: true
    },
    {
      path: '/user/detail',
      component: GoodreadsUserDetail
    },
    {
      name: 'register',
      path: '/register',
      component: GoodreadsRegister,
      props: true
    }
  ]
})
