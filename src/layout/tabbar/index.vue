<template>
  <div class="tabbar">
    <!-- 顶部左侧静态 -->
    <div class="tabbar_left">
      <Breadcrumb />
    </div>

    <!-- 顶部右侧静态 -->
    <div class="tabbar_right">
      <Set />
    </div>
  </div>
</template>

<script setup lang='ts'>
// 引入tabbar左侧组件
import Breadcrumb from './breadcrumb/index.vue'
// 引入tabbar右侧组件
import Set from './set/index.vue'

</script>

<style lang="scss" scoped>
.tabbar {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  // tabbar背景颜色
  // background-image: linear-gradient(to right, white, rgb(226, 226, 226), gray);

  .tabbar_left {
    margin-left: 20px;
    display: flex;
    align-items: center;
  }

  .tabbar_right {
    margin-right: 20px;
    display: flex;
    align-items: center;
  }
}
</style>