<template>
  <el-card>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="categoryStore.c1Id" @change="handleC1Change">
          <el-option v-for="item in categoryStore.c1Arr" :key="item.id" :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="categoryStore.c2Id">
          <el-option v-for="item in categoryStore.c2Arr" :key="item.id" :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang='ts'>
// 引入生命周期
import { onMounted } from 'vue'
// 引入分类小仓库
import useCategoryStore from '@/store/modules/category'

// 获取分类小仓库
const categoryStore = useCategoryStore()

// 分类组件挂载完毕，通过仓库发请求获取一级分类的数据
onMounted(() => {
  getC1()
})

// 将仓库中获取一级分类的请求方法封装成一个函数
const getC1 = () => {
  // 通知分类仓库发请求获取一级分类数据
  categoryStore.getC1()
}


// 一级分类菜单的change事件
const handleC1Change = () => {
  // 将二级分类的数据清空
  categoryStore.c2Id = ''
  categoryStore.c2Arr = []
  // 通知分类仓库发请求获取二级分类数据
  categoryStore.getC2()
}
</script>

<style scoped></style>