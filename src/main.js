// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.prototype.$ajax=axios

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
