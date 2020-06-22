import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Default from './layouts/Default';

Vue.component('default-layout', Default);

/**
 * Arron dire l'affichage des prixe soit à l'entier,
 * soit 2 chiffres après la virgules
 */
Vue.filter('price', function (value) {

  // si la valeur est null
  if(!value) {
    return ''

  // si le nombre est déjà entier
  } else if((value % 1) === 0) {
    return value

    // autrement on arrondie 2 chiffres après la virgule
  } else {
    return Number(value).toFixed(2)
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
