import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import Buefy from 'buefy';
import VueDebounce from 'vue-debounce';
import VueMoment from 'vue-moment';
import LineClamp from 'vue-line-clamp';
import 'buefy/dist/buefy.css';
import "@/assets/scss/global.scss";

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueDebounce)
Vue.use(VueMoment)
Vue.use(LineClamp)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
