import Vue from 'vue';

import 'popper.js';
import 'bootstrap';

import Clipboard from 'vue-clipboard2';
import Toast from 'vue-toastification';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLink, faHandScissors, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { VueReCaptcha } from 'vue-recaptcha-v3';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/main.scss';
import './assets/scss/_buttons.scss';
import './assets/scss/_cards.scss';
import './assets/scss/_inputs.scss';
import './assets/scss/_transitions.scss';
import './assets/scss/_typography.scss';
import './assets/scss/_misc.scss';

import App from './App.vue';

library.add(faLink, faHandScissors, faCopy);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueReCaptcha, { siteKey: '6Lery7gZAAAAAJEWi_hdL1VmlSkLHQlnJqN7ZH0B' });
Vue.use(Clipboard);
Vue.use(Toast, {
  maxToasts: 3,
  newestOnTop: true,
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
