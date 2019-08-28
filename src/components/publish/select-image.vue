<template>
  <el-card v-loading="loading">
    <!-- tab 页面 -->
    <el-tabs v-model="activeName">
      <!-- 素材页面 -->
      <el-tab-pane label="素材库" name="material">
        <div class="material-list">
          <!-- 循环列表 -->
          <el-card class="material-item" v-for="item in list" :key="item.id">
            <img @click="selectOneImg(item)" :src="item.url" alt />
          </el-card>
        </div>
        <!-- 分页 -->
        <el-row style="margin:10px 0" type="flex" justify="center">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <!-- 上传图片 -->
      <el-tab-pane label="上传图片" name="upload">
        <el-upload :http-request="uploadImg" class="avatar-uploader" action :show-file-list="false">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: '',
      list: [], // 需要循环的素材列表
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      },
      loading: false
    }
  },
  methods: {
    // ---------------------------------
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(result => {
        this.loading = false
        // 获取url地址 抛出由index.vue接收处理
        // 同之前抛出事件一样处理方式 so 用同一个方法
        this.$emit('selectOneImg', result.data.url)
      })
    },
    // ---------------------------------
    // 选择1张图片 selectOneImg(item)
    selectOneImg (item) {
      // 把地址给到封面组件让组件显示图片 在返回imdex.vue上层组件的images
      this.$emit('selectOneImg', item.url)
      // 在当前页面触发了一个事件selectOneImg 传出了一个参数url地址
    },
    // ---------------------------------
    // 分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // ---------------------------------
    // 获取
    getMatterial () {
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$axios({
        url: '/user/images',
        params: { collect: false, ...pageParams }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMatterial()
  }
}
</script>

<style lang='less' scoped>
.material-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .material-item {
    margin: 5px 0;
    width: 150px;
    height: 150px;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
