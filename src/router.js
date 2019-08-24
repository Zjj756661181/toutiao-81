import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'// 引入login
import Main from './views/home/main.vue'
// import HomeComment from '/components/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main // 默认二级路由
        },
        {
          path: '/home/comment',
          component: () => import('./views/comment') // 按需加载的写法 评论
        },
        {
          path: '/home/material',
          component: () => import('./views/material') // 按需加载的写法 图片/素材
        },
        {
          path: '/home/articles',
          component: () => import('./views/articles') // 按需加载的写法 内容
        }
      ]
    }
    // material
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
