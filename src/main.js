import Vue from 'vue';
import SvgIcon from 'vue-svgicon';
import App from './App.vue';
import router from './router';
import ApiService from './services/api.service';
// import ClickOutside from './directives/ClickOutside.directive';

import './design/main.scss';
import './assets/icons/sprite';

ApiService.init('/');

Vue.config.productionTip = false;

Vue.use(SvgIcon, {
  tagName: 'dd-icon',
  classPrefix: 'dd-',
});

// Vue.directive('click-outside', ClickOutside);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
