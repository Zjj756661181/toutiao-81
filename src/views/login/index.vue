<template>
  <div class="login">
    <el-card class="box-card">
      <img src="../../assets/img/logo_index.png" alt="黑马头条" >
      <el-form>
          <el-form-item>
              <el-input placeholder="请输入手机号"></el-input>
          </el-form-item>
      </el-form>
      <el-form>
          <el-form-item>
              <el-input placeholder="请输入验证码" style="width:65%"></el-input>
              <el-button style="float:right">发送验证码</el-button>
          </el-form-item>
      </el-form>
      <el-form>
          <el-form-item>
              <el-checkbox :checkbox="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
      </el-form>
      <el-form>
          <el-form-item>
              <el-button style="width:100%" type="primary">登录</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
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
