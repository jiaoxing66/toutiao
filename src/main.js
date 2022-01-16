import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'

// 移动端REm适配 加载flexible模块
import 'amfe-flexible'
// 引入dayjs
import '@/utils/dayjs.js'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
