<template>
  <!-- 左侧图标 -->
  <el-icon style="margin-right: 10px;" @click="changeIcon">
    <component :is="settingStore.fold ? 'Expand' : 'Fold'" />
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- $route.matched能获取到当前路由以及所有父级路由 -->
    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" v-show="item.meta.title"
      :to="item.path">
      <!-- 图标 -->
      <el-icon>
        <component v-if="item.meta && item.meta.icon" :is="item.meta.icon" />
      </el-icon>
      <!-- 面包屑动态展示路由名字与标题 -->
      <span style="margin-left: 7px;">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang='ts'>
// 引入路由对象
import { useRoute } from 'vue-router'
// 引入layout配置相关的仓库
import useSettingStore from '@/store/modules/setting'

// 获取layout配置相关的仓库
const settingStore = useSettingStore()
// 获取路由对象
const $route = useRoute()


// 点击图标回调函数
const changeIcon = () => {
  settingStore.fold = !settingStore.fold
}
</script>

<style lang="scss" scoped>
.el-icon {
  cursor: pointer;
}
</style>