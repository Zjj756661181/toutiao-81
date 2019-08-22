import axios from 'axios'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// -------------------------------------------
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 发起请求时做一些处理
  // 进行配置的注入
  // 获取用户储存信息 储存信息里有
  let userInfo = window.localStorage.getItem('user-info')
  // 获取token
  let token = userInfo ? JSON.parse(userInfo).token : null
  // 直接将token注入到 请求参数中
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 请求失败的处理
  return Promise.reject(error)
})
// -------------------------------------------
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  // 对于响应错误做处理
  let code = error.response ? error.response.status : ''
  let message = ''
  switch (code) {
    case 400:
      message = '请求参数错误'
      break
    case 401:
      message = 'token过期或未传'
      window.localStorage.clear()// 只能清除本项目的缓存
      window.location.hash = '#/login'
      break
    case 403:
      message = '用户非实名认证用户'
      break
    case 404:
      message = '手机号码不正确'
      break
    case 507:
      message = '服务器数据库异常'
      break
    default:
      message = '未知错误'
      break
  }
  Message({ message, type: 'warning' })
  return new Promise(function () {})
  // 如果不return就会抛出异常 控制台会看到错误
  // 返回一个新的promise对象就意味着 一个新的没有错的promise ， 之前的错误被终止了
})
// -------------------------------------------.resolve(error)
export default axios
