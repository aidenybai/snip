import Vue from 'vue';
import App from './App.vue';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Clipboard from 'vue-clipboard2';
import Toasted from 'vue-toasted';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLink, faHandScissors } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { VueReCaptcha } from 'vue-recaptcha-v3';

library.add(faLink, faHandScissors);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueReCaptcha, { siteKey: '6Lery7gZAAAAAJEWi_hdL1VmlSkLHQlnJqN7ZH0B' });
Vue.use(Clipboard);
Vue.use(Toasted);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
