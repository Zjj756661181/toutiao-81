<template>
  <el-card v-loading="loading">
    <!-- el-card 具名插槽 header  -->
    <bread-crumb slot="header">
      <!-- 面包屑插槽 具名title -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- ---------------------------------------------------------------------- -->
    <!-- 表格组件 -->
    <!-- :stripe='true' => 带斑马纹属性  -->
    <el-table :data="list" stripe>
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column prop="comment_status" label="评论状态" :formatter="formatter"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作" width="200">
        <!-- 作用域插槽 父组件 写组件内容 调用子组件的数据 -->
        <!-- obj相当于 el-table-column下的子组件中给slot的属性集合 -->
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button @click="closeOrOpen(obj.row)" :style="{color:obj.row.comment_status ? '#E6A23C' : '#409EFF'}" type="text">{{ obj.row.comment_status ? "关闭评论" : "打开评论" }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- -------------------------------------------------------------------- -->
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" style="margin:20px 0">
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
      // 分页信息
      // 当前页码 每页多少
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      loading: false
    }
  },
  methods: {
    // ------------------------------------------------
    // 页码改变时触发
    changePage (newPage) {
      // 用最新页码区查询
      this.page.currentPage = newPage// 将当前页码赋值给data中的变量
      this.getComments()// 获取当前newPage的数据
    },
    // ------------------------------------------------
    // 查询评论列表数据
    getComments () {
      // this.loading = true

      // query参数 => 指的是get参数 => url链接上
      // post参数 => 指的是body参数
      // axios中 有一个对象储存的就是query参数 params
      // axios中 有一个对象存储的就是body参数 data
      this.$axios({
        url: '/articles',
        params: {
          // 查询评论相关的数据
          response_type: 'comment',
          page: this.page.currentPage
        }
      }).then(result => {
        // 取到列表数据给当前的数据对象
        this.list = result.data.results
        this.page.total = result.data.total_count// 当前总条数
      })
    },
    // ------------------------------------------------
    // formatter 需要返回结果 需要根据当前值进行返回
    // formatter 是elementUI提供的过滤器是Vue自特性
    // row 当条数据对象
    // cilumn 当前列的属性
    // cellValue 当前单元格的属性
    // index 索引
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // -----------------------------------------------
    // 操作
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论么？`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComments()
        })
      })
    }
  },
  // ----------------------------------------------------
  // 创建实例之后执行
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
