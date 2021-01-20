// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import 'echarts/theme/vintage.js'
import axios from 'axios'
axios.default.baseURL='/api'
Vue.prototype.$http = axios
import qs from 'qs'
Vue.prototype.$qs = qs

import api from "./interface/index.js"
Vue.prototype.$api=api.commonUrl
Vue.use(ElementUI)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
