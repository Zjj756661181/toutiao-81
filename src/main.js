import Vue from 'vue'
import App from './App.vue'
// import router from 'vue-router'
import router from './permission'
import ElementUI from 'element-ui'// 引入element-ui
import Component from './components'// 引入自定义全局插件
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import './style/index.less'// 引入初始化样式
import axios from './utils/axios.config'// 引入axios
Vue.prototype.$axios = axios// 把axios赋值给vue的原型属性
Vue.use(ElementUI)// 注册组件
Vue.use(Component)// 注册全局自定义组件
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
