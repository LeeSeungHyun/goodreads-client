import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import Buefy from 'buefy'
import vueDebounce from 'vue-debounce'
import 'buefy/dist/buefy.css'
import "@/assets/scss/global.scss"

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(vueDebounce)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
