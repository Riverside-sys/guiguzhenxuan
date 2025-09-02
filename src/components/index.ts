// 利用自定义插件，把svg等组件注册为全局组件
// 因为需要注册多个全局组件，如果都在main.ts中注册，那么main.ts文件会变得臃肿

// 引入项目中所有需要被注册为全局组件的组件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Category from './Category/index.vue'
// 引入element-plus提供全部图标的组件
// ElementPlusIconsVue是一个对象，里面key是图标名称，value是图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


// 全局对象
const allGlobalComponents: any = {
  SvgIcon,
  Pagination,
  Category
}
// 对外暴露对象
export default {
  // install会在app.use(plugins)时被调用，plugins就是当前index.ts文件（自定义插件）
  // 务必叫做install方法
  install(app: any) {
    // 注册项目全部的全局组件
    Object.keys(allGlobalComponents).forEach(key => {
      // 注册为全局组件
      app.component(key, allGlobalComponents[key])
    })

    // 将element-plus提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}