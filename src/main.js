import Vue from 'vue';
import SvgIcon from 'vue-svgicon';
import App from './App.vue';
import router from './router';

import './design/main.scss';
import './assets/icons/sprite';

Vue.config.productionTip = false;

Vue.use(SvgIcon, {
  tagName: 'dd-icon',
  classPrefix: 'dd-',
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
