import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import api from '@/api/instance'

Vue.config.productionTip = false
Vue.prototype.$api = api

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi,{size:'small'})
import "@/assets/css/common.scss"


import * as filters from './filters' // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* 全局权限配置 */
Vue.prototype.$auth = function(authId, action) {
  if (store.getters.permission && store.getters.permission[authId] && store.getters.permission[authId][action]) {
      return true;
  }
  return false;
}
import TableMain from '@/components/TableMain';
Vue.component('TableMain',TableMain)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
