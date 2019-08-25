<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- -------------------------------------------- -->
    <!-- 工具栏  表单 -->
    <el-form style="margin-left:40px">
      <el-form-item label="文章状态">
        <el-radio-group  @change="refreshList" v-model="formData.status">
          <!-- label必须有值 定义5 -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核成功</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <el-select @change="refreshList" v-model="formData.channel_id" placeholder="请选择">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <!-- value-format 是指定 绑定值得格式 -->
        <el-date-picker @change="refreshList"
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- --------------------------------------------- -->
    <!-- 内容总条数 -->
    <div class="total_title">共找到{{page.total}}条符合条件的内容</div>
    <!-- 内容列表 -->
    <div class="content-list">
      <!-- 循环项 -->
      <div class="content-item" v-for="(item,index) in list" :key="index">
        <!-- 左侧内容 -->
        <div class="left">
          <img :src="item.cover.images[0]" alt />
          <!-- 内容信息 -->
          <div class="info">
            <!-- 文章标题 -->
            <span>{{item.title}}</span>
            <el-tag style="width:60px" :type="item.status | statusType">{{item.status | statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <span style="cursor:pointer">
            <i class="el-icon-edit"></i>
            修改
          </span>
          <span style="cursor:pointer" @click="delArticles(item)">
            <i class="el-icon-delete" ></i>
            删除
          </span>
        </div>
      </div>
    </div>
    <!-- ------------------------------------------- -->
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination
        @current-change="changePage"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        background
        layout="prev, pager, next"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null, // 定义频道id 当前选择的频道
        dateRange: null // 时间范围 是个数组
      },
      channels: [], // 频道数据
      list: [], // 内容列表
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    // -----------------------------------------------
    // 获取文章
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params: { ...params }
      }).then(result => {
        // console.log(result)

        this.list = result.data.results // 将当前数据赋值给data中对象
        this.page.total = result.data.total_count // 当前总条数
      })
    },
    // --------------------------------------------
    // 获取频道列表数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    //   -------------------------------------------
    // 删除方法
    delArticles (item) {
      this.$confirm('您确定删除此条文章?', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${item.id.toString()}`
        }).then(() => {
          // 重新加载
          this.getArticles(this.getConditions())
        })
      })
    },
    // --------------------------------------------
    // 获取条件 A状态改变 + B频道切换 + C日期改变
    getConditions () {
      let { status, channel_id: cid, dateRange } = this.FromData // 解析赋值
      let params = {
        // key:value(三元表达式)
        status: status === 5 ? null : status, // 由于默认全部文章给了5 但如果是5的话 不能传 所以这里特殊处理一下
        channel_id: cid,
        // 三元表达式
        begin_pubdate: dateRange && dateRange.length ? dateRange[0] : null,
        end_pubdate: dateRange && dateRange.length ? dateRange[0] : null
      }
      params.page = this.page.currentPage
      params.per_page = this.page.pageSize
      return params
    },
    // --------------------------------------------
    // 页码改变事件
    changePage (newPage) {
      // 获取当前最新页码
      this.page.currentPage = newPage
      // 如果点击了第二页  但是有条件 所以需要把所有条件都加到一起 发送给方法
      this.getArticles(this.getConditions())
    },
    // ----------------------------------------------
    refreshList () {
      // 当筛选条件改变时 应该将页码回归到第一页
      this.page.currentPage = 1
      this.getArticles(this.getConditions())
    }
  },
  filters: {
    statusText (value) {
      // value 是传过来的值
      switch (value) {
        case 0:
          return '草稿'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
        default:
          break
      }
    },
    // 过滤tag标签的类型
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  },
  created () {
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>
.total_title {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px dashed #ccc;
}
.content-list {
  .content-item {
    padding: 10px;
    border-bottom: 1px solid #f2f3f5;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 150px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        margin-left: 10px;
        display: flex;
        height: 100px;
        padding: 5px 0;
        flex-direction: column;
        justify-content: space-between;
        .date {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .right {
      span,
      span i {
        font-size: 12px;
        color: #333;
      }
      span {
        margin-right: 5px;
      }
    }
  }
}
</style>
