<template>
  <div class="layout_container">

    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: settingStore.fold }">
      <!-- logo -->
      <Logo />
      <!-- 展示菜单：滚动组件 -->
      <el-scrollbar class=" scrollbar">
        <!-- 菜单组件 -->
        <el-menu :default-active="$route.path" background-color="black" text-color="white"
          active-text-color="cyan" :collapse="settingStore.fold">
          <!-- 根据项目路由动态生成菜单 -->
          <Menu :menuRoutes="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: settingStore.fold }">
      <Tabbar />
    </div>

    <!-- 内容展示区 -->
    <div class="layout_main" :class="{ fold: settingStore.fold }">
      <Main />
    </div>

  </div>
</template>

<script setup lang='ts'>
// 获取路由对象
import { useRoute } from 'vue-router'
// 引入左侧logo组件
import Logo from './logo/index.vue'
// 引入左侧菜单组件
import Menu from './menu/index.vue'
// 引入右侧展示组件
import Main from './main/index.vue'
// 引入顶部标签组件
import Tabbar from './tabbar/index.vue'
// 引入用户仓库
import useUserStore from '@/store/modules/user'
// 引入layout配置相关的仓库
import useSettingStore from '@/store/modules/setting'

// 获取用户仓库
const userStore = useUserStore()
// 获取layout配置相关的仓库
const settingStore = useSettingStore()
// 获取路由对象
const $route = useRoute()


</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    position: relative;
    z-index: 0;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: white;

    transition: all 0.1s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-fold-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    border-bottom: 1px solid #1e1d1d7f;

    &.fold {
      width: calc(100% - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }
  }

  .layout_main {
    position: absolute;
    padding: 20px;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    top: $base-tabbar-height;
    left: $base-menu-width;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }
  }

}
</style>