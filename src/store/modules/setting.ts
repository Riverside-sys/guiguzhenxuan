// 小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSettingStore = defineStore('SettingStore', () => {
  // 定义一个响应式数据用于控制左侧菜单是否折叠
  let fold = ref(false)
  // 定义一个响应式数据用于控制刷新效果
  let refresh = ref(false)


  return {
    fold,
    refresh
  }
})

export default useSettingStore
