<template>
  <el-row type="flex" justify="space-between" class="layout-header">
    <el-col :span="16" class="left-header">
      <i @click="openOrClose" :class="{currentClass:'el-icon-fold'}"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="3" class="layout-right">
      <img :src="user.photo ? user.photo : defaultImg" alt="">
      <!-- <img src="../../assets/img/avatar.jpg" alt />  -->
      <el-dropdown trigger="click" @command='commandAction'>
        <span class="el-dropdown-link">
          {{user.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 dropdown -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='account'>个人信息</el-dropdown-item>
          <el-dropdown-item command='git'>git地址</el-dropdown-item>
          <el-dropdown-item command='out'>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventbus'
export default {
  data () {
    return {
      user: {},
      currentClass: 'el-icon-fold',
      // 转换base64 [用require 包裹下图片 转换base64]
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    // -------------------------------------
    // 左侧菜单展开或折叠 -- 点击header  上图标<i class="el-icon-s-unfold"></i> 实现左侧菜单展开或折叠
    // eventBus抛出事件 由左侧菜单接收并设置事件
    openOrClose () {
      eventBus.$emit('collapseOrClose')
      this.currentClass = this.currentClass === 'el-icon-fold' ? 'el-icon-s-unfold' : 'el-icon-fold'
    },
    // -------------------------------------
    // 获取个人信息 get
    getUserInfo () {
      this.$axios({
        // method: 'get', // 默认get接口可以不写
        url: '/user/profile'
        // 将headers赋值 后端需要的token身份信息
      }).then(result => {
        // 获取到用户最新的个人资料
        this.user = result.data
      })
    },
    // 绑定菜单项点击事件
    commandAction (command) {
      if (command === 'account') {
        // 跳转账户信息
        this.$router.push('/home/account')
      } else if (command === 'git') {
        // 跳转git
        window.location.href = 'https://github.com/Zjj756661181/toutiao-81'
      } else if (command === 'out') {
        // 退出
        // 擦除本项目在浏览器上的所有前端缓存
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
    eventBus.$on('updateUserInfoSuccess', () => {
      // 监听用户信息中抛出的事件eventBus（公共事件），当用户名变动时同步更新 之后重新获取用户名
      this.getUserInfo()// 重新获取
    })
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  // position: fixed;
  padding: 12px 0;
  .left-header {
    display: flex;
    width: 700px;
    align-items: center;
    i {
      font-size: 20px;
      margin-right: 4px;
    }
  }
  .layout-right {
    display: flex;
    align-items: center;
    width: 300px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
