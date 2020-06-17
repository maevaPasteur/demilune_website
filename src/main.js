import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Default from './layouts/Default';

Vue.component('default-layout', Default);

Vue.filter('price', function (value) {
  if(!value) {
    return ''
  } else if((value % 1) === 0) {
    return value
  } else {
    return Number(value).toFixed(2)
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
