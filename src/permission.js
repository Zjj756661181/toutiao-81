import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 获取token
router.beforeEach(function (to, from, next) {
  nprogress.start()
  // 如果以home为起始就认为进入了需要检查token的区域
  if (to.path.startsWith('/home')) {
    // 获取前端的token
    let result = window.localStorage.getItem('user-info')
    if (result) {
      let userInfo = JSON.parse(result)
      if (userInfo && userInfo.token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }

  // 如果没有进入home的领域 就不需要管
})
router.afterEach(() => {
  nprogress.done()
})
export default router
