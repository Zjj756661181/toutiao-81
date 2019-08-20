<template>
  <div class="login">
    <el-card class="box-card">
      <div class="title">
        <!-- title 图片 -->
        <img src="../../assets/img/logo_index.png" alt="黑马头条" />
      </div>
      <!-- 表单结构 element  el-form  el-form-item -->
      <el-form :model="formData" :rules="rules" ref="loginForm">
        <!-- 输入框 因需校验用 el-form-item标签 包裹input -->
        <!-- prop属性设置为需校验的字段 -->
        <el-form-item prop="mobile">
          <!-- 手机号绑定input -->
          <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <!-- 验证码绑定input -->
          <el-input v-model="formData.code" placeholder="请输入验证码" style="width:65%"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>

        <el-form-item prop="check">
          <!-- checkbox绑定check -->
          <el-checkbox v-model="formData.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <!-- 设置点击事件login -->
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
        callback() // 同意继续往下走
      } else {
        // 不满足校验 error错误提示
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
            message: '验证码不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误',
            trigger: 'blur'
          }
        ],
        ckeck: [
          {
            // 自定义函数 (return上方）
            validator: func
          }
        ]
      }
    }
  },
  methods: {
    // 登录点击事件
    login () {
      // validate 手动校验表单
      // isOK 是否通过校验
      // result 当前校验结果
      this.$refs.loginForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.formData
          })
            .then(result => {
              // 缓存本地
              window.localStorage.setItem(
                'user-info',
                JSON.stringify(result.data.data)
              )
              // 跳转页面 home
              this.$router.push('/home')
            })
            .catch(() => {
              // 警告弹框 登录不成功
              this.$message({
                message: '用户名或验证码错误',
                type: 'warning'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  width: 100%;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 400px;
    height: 340px;
    .title {
      text-align: center;
      img {
        display: block;
        margin: 10px auto;
        width: 200px;
      }
    }
  }
}
</style>
