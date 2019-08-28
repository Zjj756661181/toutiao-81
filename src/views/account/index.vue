<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- -------------------------------------- -->
    <!-- 表单组件 -->
    <el-form ref="userForm" class="form" :model="formData" :rules="rules"  label-width="100px">
      <!-- 用户名 -->
      <el-form-item label="用户名称" prop="name">
        <el-input style='width:300px' v-model="formData.name"></el-input>
      </el-form-item>
      <!-- 简介 -->
      <el-form-item label="用户简介" prop="intro">
        <el-input style='width:300px' v-model="formData.intro"></el-input>
      </el-form-item>
       <!-- 邮箱 -->
      <el-form-item label="用户邮箱" prop="email">
        <el-input style='width:300px' v-model="formData.email"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机号码" prop="mobile">
        <el-input style='width:300px' v-model="formData.mobile" disabled></el-input>
      </el-form-item>
      <!-- 保存按钮 -->
      <el-form-item>
        <el-button type='primary' @click="saveUserInfo">保存信息</el-button>
      </el-form-item>
    </el-form>
    <!-- ---------------------------------------- -->
    <el-upload class="head-img" action="" :show-file-list="false" :http-request="uploadImg">
      <img :src="formData.photo ? formData.photo : imgUrl " alt="">
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventbus'
import URL from '../../constant/url'
// import { UploadImg } from '../../api/api'
// import { SaveUserInfo } from '../../api/api'

export default {
  data () {
    return {
      imgUrl: require('../../assets/img/404.png'),
      formData: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名称不能为空' },
          { min: 1, max: 7, message: '用户名称必须控制在1到7个字符' }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }
        ]
      }
    }
  },
  methods: {
    // -----------------------------------------
    // 保存数据
    saveUserInfo () {
      this.$refs.userForm.validate(async isOK => {
        if (isOK) {
          await this.$axios({
            method: 'patch',
            url: URL.APP_ACCOUNT_SAVEUSERINFO,
            data: this.formData
          })
          this.$message({ message: '保存成功', type: 'success' })
          // 触发一个事件 更新用户头像成功了
          eventBus.$emit('updateUserInfoSuccess')
        }
      })
    },
    // -----------------------------------------
    // 上传图片
    async uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      let result = await this.$axios({
        method: 'patch',
        url: URL.APP_ACCOUNT_UPLOADIMG,
        data
      })
      // 获取新地址后 赋值给当前页面
      this.formData.photo = result.data.photo
      // 触发一个事件 更新用户头像成功了
      eventBus.$emit('updateUserInfoSuccess')
    },
    // -----------------------------------------
    // 获取数据
    getUserInfo () {
      this.$axios({
        url: URL.APP_ACCOUNT_GETUSERINFO
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
 .head-img {
     position: absolute;
     left: 700px;
     top:150px;
    img {
      height: 200px;
      width: 200px;
      border-radius: 50%;
    }
}
</style>
