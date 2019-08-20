<template>
  <el-row type="flex" justify="space-between" class="layout-header">
    <el-col :span="6" class="left-header">
      <i class="el-icon-s-unfold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="2" class="layout-right">
      <img :src="user.photo ? user.photo : defaultImg" alt="">
      <!-- <img src="../../assets/img/avatar.jpg" alt />  -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ user.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 dropdown -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      // 转换base64 [用require 包裹下图片 转换base64]
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    // 获取个人信息 get
    getUserInfo () {
      let userInfo = window.localStorage.getItem('user-info')
      let token = userInfo ? JSON.parse(userInfo).token : null
      token && this.$axios({
        // method: 'get', // 默认get接口可以不写
        url: '/user/profile',
        // 将headers赋值 后端需要的token身份信息
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(result => {
        // 获取到用户最新的个人资料
        this.user = result.data.data
      })
    },
    created () {
      this.getUserInfo()
    }
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  padding: 12px 0;
  .left-header {
    display: flex;
    align-items: center;
    i {
      font-size: 20px;
      margin-right: 4px;
    }
  }
  .layout-right {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
