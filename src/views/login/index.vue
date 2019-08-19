<template>
  <div class="login">
    <el-card class="box-card">
      <img src="../../assets/img/logo_index.png" alt="黑马头条" >

      <el-form :modle='formData' :rules='rules' ref="loginForm">
          <el-form-item prop='mobile'>
              <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item prop='code'>
              <el-input v-model="formData.code" placeholder="请输入验证码" style="width:65%"></el-input>
              <el-button style="float:right">发送验证码</el-button>
          </el-form-item>

          <el-form-item prop='check'>
              <el-checkbox v-model="formData.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>

          <el-form-item>
              <el-button @click="login" style="width:100%" type="primary">登录</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var func = function (rule, value, callback) {
      // rule当前校验规则 米用
      // value 当前表单字段的值
      if (value) {
        // 满足校验
        callback()// 同意继续往下走
      } else {
        // 不满足校验
        callback(new Error('用户协议和隐私条款未勾选，请认真阅读并确认！'))
      }
    }
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      // 定义数据规则 给elementUI的表单使用
      rules: {
        mobile: [
          { required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号码格式错误',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            massage: '验证码不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^\d{6}$/,
            massage: '验证码格式错误',
            trigger: 'blur'
          }
        ],
        ckeck: [
          {
            validator: func
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((isOK, result) => {
        if (isOK) {
          this.$router.push('/home')
        } else {
          alert('')
        }
      })
    }
  }
}
</script>

<style lang='less'>
    .login{
        background-image: url('../../assets/img/login_bg.jpg');
        width: 100%;
        height: 100vh;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .box-card {
            width: 400px;
            height: 340px;
            img{
                display: block;
                margin: 10px auto;
                width: 200px;
            }
        }
    }
</style>
