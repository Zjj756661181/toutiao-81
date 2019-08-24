<template>
  <el-card>
    <bread-crumb slot="header">
      <!-- 面包屑插槽 具名title -->
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- --------------------------------------- -->
    <el-upload class="upload-material" action="" :show-file-list="false" :http-request='uploadImg'>
      <el-button type="primary">上传图片</el-button>
    </el-upload>
    <!-- ---------------------------------------------------------------------- -->
    <!--el-tabs中 v-model属性绑定是当前子标签页的name -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部图片" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row type="flex" justify="space-around" align="middle" class="operate">
              <i class="el-icon-star-on" :style="{color: item.is_collected ? 'red' : ''}" @click="collectOrCancel(item)"></i>
              <i class="el-icon-delete-solid" @click="delMaterial(item)"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination  @current-change="changePage"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
            background
            layout="prev,pager,next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <!-- ------------------------------------------------------------------ -->
      <el-tab-pane label="收藏图片" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
            @current-change="changePage"
            background
            layout="prev, pager, next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 15,
        total: 0
      }
    }
  },
  methods: {
    // 删除素材
    delMaterial (item) {
      this.$confirm('您确定删除此图片吗', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${item.id}`
        }).then(result => {
          this.getMaterial()
        })
      })
    },
    // collectOrCancel 收藏图片
    // is_collected 为false时 表示没有收藏
    collectOrCancel (item) {
      let mess = this.is_collected ? '取消收藏' : '收藏'
      this.$confirm(`您是否要${mess}此图片?`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: `/user/images/${item.id}`,
          data: { collect: !item.is_collected }
        }).then(result => {
          this.getMaterial()
        })
      })
    },
    // uploadImg 自定义上传图片
    uploadImg (params) {
      // formData 添加参数 用append方法
      let formData = new FormData()
      formData.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: formData
      }).then(result => {
        this.getMaterial()
      })
    },
    // 切换页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 切换页签
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    // 获取
    getMaterial () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', ...params }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.upload-material {
  position: absolute;
  right:20px;
  margin-top: -10px;
}
.img-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 200px;
    margin: 20px 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30px;
      width: 100%;
      background-color: #f4f5f6;
      i {
        font-size: 22px;
      }
    }
  }
}
</style>
