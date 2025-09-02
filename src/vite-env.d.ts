/// <reference types="vite/client" />

// 让ts文件知道如何处理vue单文件组件（.vue文件的导入）
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 让ts文件知道nprogress模块的类型
declare module 'nprogress'
