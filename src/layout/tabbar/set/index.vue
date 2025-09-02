<template>
  <!-- 刷新按钮 -->
  <el-button icon="Refresh" size="small" circle @click="updateRefresh"></el-button>
  <!-- 全屏按钮 -->
  <el-button icon="FullScreen" size="small" circle @click="fullScreen"></el-button>
  <!-- 设置按钮 -->
  <el-popover placement="bottom" title="主题设置" :width="200" :visible="visible">
    <!-- 表单元素 -->
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker @change="changeColor" v-model="color" show-alpha
          :predefine="predefineColors" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch @change="changeDark" v-model="dark" active-icon="Moon" inactive-icon="Sunny"
          inline-prompt />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button icon="Setting" size="small" circle @click="visible = true"></el-button>
    </template>
  </el-popover>
  <!-- 头像 -->
  <img :src="userStore.avatar"
    style="margin:0px 10px; width: 24px; height: 24px; border-radius: 50%;">
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
// 引入路由器
import { useRoute, useRouter } from 'vue-router'
// 引入layout配置相关的仓库
import useSettingStore from '@/store/modules/setting'
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user'

// 获取仓库
const settingStore = useSettingStore()
const userStore = useUserStore()
// 获取路由器
const $router = useRouter()
// 获取路由
const $route = useRoute()
// 暗黑模式控制按钮
const dark = ref<boolean>(false)
// 设置按钮弹窗
const visible = ref<boolean>(false)

// 刷新按钮点击回调
const updateRefresh = () => {
  settingStore.refresh = !settingStore.refresh
}

// 全屏按钮点击回调
const fullScreen = () => {
  // DOM对象的一个熟悉，可以用来判断当前是不是全屏模式，全屏则为true，否则为false
  let full = document.fullscreenElement
  // 切换/退出 全屏模式
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 退出登录点击回调
const logout = () => {
  /* 第一件事：向服务器发送请求（需配置退出登录接口）
  第二件事：仓库当中清空用户相关的数据（token、username、avatar）
  第三件事：跳转到登录页面 */

  userStore.userLogout()
  // 跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

// 颜色组件的数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

// 暗黑模式控制按钮点击回调
const changeDark = () => {
  // 获取HTML根节点
  let html = document.documentElement
  // 判断HTML标签是否有类名dark
  dark.value ? html.className = 'dark' : html.className = ''
  // 关闭弹窗
  visible.value = false
}

// 改变主题颜色回调
const changeColor = () => {
  // 通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
  html.style.setProperty('--el-color-warning', color.value)
  html.style.setProperty('--el-color-danger', color.value)
  html.style.setProperty('--el-color-success', color.value)
  html.style.setProperty('--el-color-info', color.value)
  html.style.setProperty('--el-color-warning', color.value)
  html.style.setProperty('--el-color-danger', color.value)
  html.style.setProperty('--el-color-success', color.value)
  html.style.setProperty('--el-color-info', color.value)
  // 关闭弹窗
  visible.value = false
}

</script>

<style scoped></style>