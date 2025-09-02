<template>
  <!-- svg：图标外层容器节点，内部需要与use标签结合使用 -->
  <svg :style="{ width, height }">
    <!-- xlink:href指定用哪一个图标，属性值务必#icon-图标名称 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang='ts'>
// 接受父组件传递过来的参数
defineProps({
  // 图标前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  // 图标名称
  name: String,
  // 图标颜色
  color: {
    type: String,
    default: 'black'
  },
  // 图标宽度
  width: {
    type: String,
    default: '16px'
  },
  // 图标高度 
  height: {
    type: String,
    default: '16px'
  }

})

</script>

<style scoped></style>