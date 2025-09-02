<template>
  <!-- 路由组件出口位置 -->
  <router-view v-slot="{ Component }">
    <!-- 动画效果 -->
    <transition name="fade">
      <!-- 动态渲染路由组件 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang='ts'>
import { watch, ref, nextTick } from 'vue'
// 引入layout配置相关的仓库
import useSettingStore from '@/store/modules/setting'

// 获取layout配置相关的仓库
const settingStore = useSettingStore()

// 控制当前main展示的组件是否需要销毁重建
const flag = ref(true)

// 监听refresh数据的变化，如果发生变化，说明用户点击了刷新按钮
watch(() => settingStore.refresh, () => {
  // 点击刷新按钮，路由组件销毁
  flag.value = false
  // 等待动画结束后，重新创建组件
  nextTick(() => {
    flag.value = true
  })
})
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>