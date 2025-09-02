import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus的国际化
// @ts-ignore
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// svg插件需要的配置代码
import 'virtual:svg-icons-register'
// 引入全局样式
import '@/styles/index.scss'
// 注册全局组件
import globalComponents from '@/components'
// 引入路由
import router from '@/router'
// 引入仓库
import pinia from '@/store'
// 引入路由鉴权
import '@/permisstion'
// 引入暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

// 使用element-plus插件
app.use(ElementPlus, {
  locale: zhCn
})

// 注册全局组件
app.use(globalComponents)

// 注册路由
app.use(router)

// 注册仓库
app.use(pinia)

app.mount('#app')
