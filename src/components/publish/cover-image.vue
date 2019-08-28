<template>
  <div class="cover-image">
      <div @click="showDialog=true,selectIndex=index" class="cover-item" v-for="(item,index) in images" :key="index">
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <!-- ------------------------------------ -->
      <el-dialog :visible="showDialog" @close="showDialog=false">
          <!-- 监听事件 -->
          <select-images @selectOneImg="selectImg"></select-images>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      selectIndex: -1,
      showDialog: false,
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    // -------------------------------------------
  // @click="showDialog=true,selectIndex=index" ==> 还可写成
  // clickImg(index) {
  //     this.showDialog = true
  //     this.selectIndex = index // 赋值当前点击索引
  // }
  // -------------------------------------------
  // 1.点击图片图标获取其索引 抛出 select-image接收
  // 2.select-image接收后 弹层显示获取图片url，index（selectIndex = index） 将其抛出
  // 3.select-image抛出的url--index后 index.vue接收
  // index.vue接收事件 url,index -- map遍历[赋值给this.formData.cover.images = ]
    selectImg (url) {
    // 显示图片  => 图片来源 =>上层 => props只能读取 不能更改 只能上层去改
    // 显示图片 => 获取图片 => 通过 再次传递 传给上层组件 => 只传图片 => 因为images是个数组 只传一个值 不足以修改
    // 再次抛出事件 由index.vue接收（上层）
      this.$emit('updateImages', url, this.selectIndex)
      this.showDialog = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
    display: flex;
    .cover-item {
        width:200px;
        height:200px;
        border: 1px solid #ccc;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img {
            width:100%;
            height:100%;
        }
    }
}
</style>
