<template>
  <Category />
  <el-card style="margin: 10px 0;">
    <el-button type="primary" size="large" icon="Plus" :disabled="!categoryStore.c2Id"
      @click="waitToDo">添加属性</el-button>
    <el-table border style="margin: 10px 0;" :data="attrArr">
      <el-table-column label="序号" width="80" type="index" align="center" />
      <el-table-column label="属性" width="120" align="center" prop="attrName" />
      <el-table-column label="属性值" align="center">
        <template #="{ row }">
          <el-tag v-for="item in row.attrList" :key="item.id" style="margin: 0 5px;" type="success">
            {{ item.valueName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template #>
          <el-button type="warning" size="small" icon="Edit" @click="waitToDo">编辑</el-button>
          <el-button type="danger" size="small" icon="Delete" @click="waitToDo">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang='ts'>
// 组合式API函数watch
import { watch, ref, onUnmounted } from 'vue'
// 引入分类小仓库
import useCategoryStore from '@/store/modules/category'
// 引入获取属性值的接口
import { reqAttr } from '@/api/product/attr'
// 引入属性列表响应结果的类型
import type { AttrResponseData, AttrObj } from '@/api/product/attr/type'
// 引入消息提示框
import { ElMessageBox } from 'element-plus'

// 获取分类小仓库
const categoryStore = useCategoryStore()
// 存储属性列表
let attrArr = ref<AttrObj[]>([])

// 监听仓库二级分类ID的变化
watch(() => categoryStore.c2Id, () => {
  // 清空上一次的属性列表
  attrArr.value = []
  getAttr()
})

// 将获取属性值的接口封装成函数
const getAttr = async () => {
  // 获取分类的ID
  const { c1Id, c2Id } = categoryStore
  if (!c2Id) return
  // 调用获取属性值的接口
  const result: AttrResponseData = await reqAttr(c1Id, c2Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}

// 暂未实现的按钮
const waitToDo = () => {
  ElMessageBox.alert('不好意思，暂未实现这个功能哦~', '提示', {
    confirmButtonText: 'OK'
  })
}

// 组件卸载时，清空分类选择
onUnmounted(() => {
  categoryStore.c1Id = ''
  categoryStore.c2Id = ''
})
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>