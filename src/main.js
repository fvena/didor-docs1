import Vue from 'vue';
import SvgIcon from 'vue-svgicon';
import App from './App.vue';
import router from './router';
import ApiService from './services/api.service';

import './design/main.scss';
import './assets/icons/sprite';
import './components';

ApiService.init('/');

Vue.config.productionTip = false;

Vue.use(SvgIcon, {
  tagName: 'dd-icon',
  classPrefix: 'dd-',
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
