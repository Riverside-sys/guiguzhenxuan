<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang='ts'>

</script>

<style lang="scss">
// 控制进度条颜色，!important为强制覆盖
#nprogress .bar {
  background: $base-progress-color;
}
</style>
