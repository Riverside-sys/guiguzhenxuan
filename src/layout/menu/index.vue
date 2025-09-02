<template>
  <template v-for="item in menuRoutes" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta!.hidden" :index="item.path" @click="goRoute">
        <!-- 图标 -->
        <el-icon>
          <component :is="item.meta!.icon" />
        </el-icon>
        <!-- 标题 -->
        <template #title>
          <span>{{ item.meta!.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 只有一个子路由 -->
    <template v-else-if="item.children.length === 1">
      <el-menu-item v-if="!item.children[0].meta!.hidden" :index="item.children[0].path"
        @click="goRoute">
        <!-- 图标 -->
        <el-icon>
          <component :is="item.children[0].meta!.icon" />
        </el-icon>
        <!-- 标题 -->
        <template #title>
          <span>{{ item.children[0].meta!.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有多个（多级）子路由 -->
    <template v-else>
      <el-sub-menu v-if="!item.meta!.hidden" :index="item.path">
        <!-- 图标 -->
        <template #title>
          <el-icon>
            <component :is="item.meta!.icon" />
          </el-icon>
          <!-- 标题 -->
          <span>{{ item.meta!.title }}</span>
        </template>
        <!-- 递归调用 -->
        <Menu :menuRoutes="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang='ts'>
// 获取路由
import { useRouter } from 'vue-router'


// 获取父组件传递过来的路由数组
defineProps(['menuRoutes'])

// 获取编程式路由
const $router = useRouter()

// 跳转路由
const goRoute = (vc: any) => {
  $router.push(vc.index)
}
</script>

<script lang="ts">
export default {
  name: 'Menu'
}
</script>

<style scoped></style>