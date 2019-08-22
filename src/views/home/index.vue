<template>
  <!-- 最外边容器 -->
  <el-container>
    <!-- 左侧栏容器 -->
    <el-aside style='width:200px;min-height:100vh;background-color:#323745'>
      <!-- 左侧菜单 -->
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧嵌套大容器 -->
    <el-container>
      <!-- 头部内容 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 中间区域 -->
      <el-main style='padding:0;'>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import layoutAside from '../../components/home/layout-aside'// 引入左侧菜单栏
// import layoutHeader from '../../components/home/layout-header'// 引入右侧头部nav
export default {
  components: {
    // 'layout-aside': layoutAside,
    // 'layout-header': layoutHeader
  }
}
</script>

<style >
</style>
