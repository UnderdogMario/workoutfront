import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import Vuex from 'vuex'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPen)

Vue.component('font-awesome-icon', FontAwesomeIcon)


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
