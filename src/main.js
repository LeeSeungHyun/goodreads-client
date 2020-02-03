import Vue from 'vue'
import App from './App.vue'
import { router } from './routes/index.js';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false
Vue.use(Buefy)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
