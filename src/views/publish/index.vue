<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- ---------------------------------------- -->
    <el-form class="publish-form" :rules="rules" :model="formData" ref="myForm" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input placeholder="文章名称" v-model="formData.title" style="width:500px;"></el-input>
      </el-form-item>
      <!--  -->
      <el-form-item label="内容" prop="content">
        <quill-editor
          style="width:700px;height:400px;margin-bottom:100px"
          placeholder="请输入内容"
          v-model="formData.content"
        ></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-radio-group v-model="formData.cover.type" @change="changeType">
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <!-- 添加图片区 -->
        <!-- 父组件给子组件传值  props 封面类型 封面图片 -->
        <cover-image :images="formData.cover.images" @updateImages="updateImages"></cover-image>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish(false)">发布文章</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
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
        channel_id: '',
        cover: {
          type: 0,
          images: []
        } // 默认无图
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '标题字数5到30之间' }
        ],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '请选择频道' }]
      }
    }
  },
  methods: {
    // ----------------------------------------
    updateImages (url, index) {
      // 第一种写法
      // this.formData.cover.images = this.formData.cover.images.map((item, i) => {
      //   return i === index ? url : item
      // })
      // 简写
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    // ----------------------------------------
    // 设图片类型改变事件 单图 => [''] , 三图 => ['','',''] , 无图/自动 => []
    changeType () {
      // 获取到对应值formData.cover.type
      if (this.formData.cover.type === 1) {
        // 单图 = 1
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        // 三图 = 3
        this.formData.cover.images = ['', '', '']
      } else {
        // 自动 / 无图 = '空' []
        this.formData.cover.images = []
      }
    },
    // ----------------------------------------
    // 发布文章 validate 验证
    publish (draft) {
      this.$refs.myForm.validate(isOK => {
        if (isOK) {
          // 根据id判定文章类型 put || post 根据不同的类型赋上不同的url
          let { articlesId } = this.$route.params
          let method = articlesId ? 'put' : 'post'
          let url = articlesId ? `/articles/${articlesId}` : '/articles'
          // 发布文章
          this.$axios({
            method,
            url,
            params: { draft },
            data: this.formData
          }).then(() => {
            // 发布成功跳转内容列表
            this.$router.push('/home/articles')
          })
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
    },
    // -----------------------------------------
    // 通过id获取文章信息
    getArticlesById (articleId) {
      // 接收内容列表传出的id
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    // 接收内容列表传出的id 根据id做加载事件
    // 如果有id就是编辑 没有就是新增（新增不用）
    let { articleId } = this.$route.params

    // if (articlesId) {
    //   // 获取文章信息
    //   this.getArticlesById()
    // }
    articleId && this.getArticlesById(articleId)
    this.getChannel()
  }
}
</script>

<style lang="less" scoped>
.publish-form {
  margin-left: 60px;
}
</style>
