import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import Vuex from 'vuex'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    login: false
  },
  mutations: {
    signin (state) {
      state.login = true
    }
  }
})

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
