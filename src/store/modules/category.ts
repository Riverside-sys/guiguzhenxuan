import { ref } from 'vue'
// 商品分类全局组件的小仓库
import { defineStore } from 'pinia'
// 引入请求方法
import { reqC1, reqC2 } from '@/api/product/attr'
// 引入分类响应数据类型
import type { CategoryResponseData, CategoryObj } from '@/api/product/attr/type'


const useCategoryStore = defineStore('Category', () => {
  // 存储一级分类数据
  let c1Arr = ref<CategoryObj[]>([])
  // 存储一级分类的id
  let c1Id = ref<number | string>('')
  // 存储二级分类数据
  let c2Arr = ref<CategoryObj[]>([])
  // 存储二级分类的id
  let c2Id = ref<number | string>('')

  // 获取一级分类的方法
  const getC1 = async () => {
    // 发请求获取一级分类数据
    let result: CategoryResponseData = await reqC1()
    if (result.code === 200) {
      c1Arr.value = result.data
    }
  }
  // 获取二级分类的方法
  const getC2 = async () => {
    // 发请求获取二级分类数据
    let result: CategoryResponseData = await reqC2(c1Id.value)
    if (result.code === 200) {
      c2Arr.value = result.data
    }
  }
  return {
    getC1,
    c1Arr,
    c1Id,
    getC2,
    c2Arr,
    c2Id
  }
})

export default useCategoryStore