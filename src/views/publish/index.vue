<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- ---------------------------------------- -->
    <el-form class="publish-form" :rules="rules" :model="formData" ref="myForm"  label-width="80px">
        <el-form-item label="标题" prop="title">
            <el-input placeholder="文章名称"  v-model="formData.title" style="width:500px;"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="内容" prop="content">
            <el-input placeholder="请输入内容" v-model="formData.content"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
            <el-radio-group v-model="formData.cover">
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
            <el-select v-model="formData.channel_id">
                <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="publish">发布文章</el-button>
            <el-button>存入草稿</el-button>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: 0, // 默认无图
        channel_id: ''
      },
      rules: {
        title: [{ required: true, message: '标题不能为空' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '请选择频道' }]
      }
    }
  },
  methods: {
    // ----------------------------------------
    // 发布文章 validate 验证
    publish () {
      this.$refs.myForm.validate(isOK => {
        if (isOK) {
          // 发布文章
        }
      })
    },
    // ----------------------------------------
    // 获取频道
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style lang="less" scoped>
    .publish-form {
        margin-left: 60px;
    }
</style>
