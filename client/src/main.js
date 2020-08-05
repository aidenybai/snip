import Vue from 'vue';

import 'popper.js';
import 'bootstrap';

import Clipboard from 'vue-clipboard2';
import Toast from 'vue-toastification';
import VueAnalytics from 'vue-analytics';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLink, faHandScissors, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { VueReCaptcha } from 'vue-recaptcha-v3';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-toastification/dist/index.css';

import App from './App.vue';

library.add(faLink, faHandScissors, faCopy);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueReCaptcha, { siteKey: '6Lery7gZAAAAAJEWi_hdL1VmlSkLHQlnJqN7ZH0B' });
Vue.use(VueAnalytics, { id: 'UA-110509374-3' });
Vue.use(Clipboard);
Vue.use(Toast);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
