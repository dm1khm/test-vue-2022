import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

import './assets/scss/main.scss'
console.log(store);
Vue.config.productionTip = false
Vue.use(Vuelidate)
new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('initialize');
  },
  render: h => h(App)
}).$mount('#app')