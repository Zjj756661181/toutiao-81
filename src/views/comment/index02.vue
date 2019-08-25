<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- -------------------------------------------------------- -->
    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="title" label="标题" width="550px"></el-table-column>
      <el-table-column prop="comment_status" label="评论状态" :formatter="formatter"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="colseOrOpen(obj.row)"
            :style="{ color:obj.row.comment_status ? '#E6A23C' : '#409EFF'}"
          >{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- ------------------------------------------------------- -->
    <el-row type="flex" justify="center" style="margin: 20px 0">
      <el-pagination
        :page-size="page.pageSize"
        :total="page.total"
        :current-page="page.currentPage"
        @current-change="changePage"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      }
    }
  },
  methods: {
    // formatter 需要返回结果 需要根据当前值进行返回
    // formatter 是elementUI提供的过滤器是Vue自特性
    // row 当条数据对象
    // cilumn 当前列的属性
    // cellValue 当前单元格的属性
    // index 索引
    formatter (row, cilumn, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // ----------------------------------------------------------
    // 打开关闭评论
    colseOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否要${mess}评论?`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: row.id
          },
          data: { allow_comment: !row.allow_comment }
        }).then(result => {
          this.getComment()
        })
      })
    },
    // ------------------------------------
    // changePage 点击分页数字 实现跳转当前点击页
    changePage (newPage) {
      console.log(newPage)

      // 当前页 = 点击页
      this.page.currentPage = newPage
      // 跳转 后 重新获取列表
      this.getComment()
    },
    // ------------------------------------
    // 获取列表
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage
        }
      }).then(result => {
        this.list = result.data.results
        // 获取全部页码
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
