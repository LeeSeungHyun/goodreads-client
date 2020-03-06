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

import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
 
// Add the required rule
extend('required', {
  ...required,
  message: (field) => {
    let str;
    if(field === 'book name') str = '책 이름'
    else if(field === 'author') str = '저자'
    else if(field === 'publisher') str = '출판사'
    else if(field === 'message') str = '메시지'

    return str + ' 를(을) 입력해주세요.'
  }
});

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
