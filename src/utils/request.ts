// 进行axios二次封装：使用请求与响应拦截器
import axios from 'axios'
// 引入element-plus的message组件
import { ElMessage } from 'element-plus'
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user'

// 第一步：利用axios对象的create方法，去创建axios实例（其他的配置：基础路径、超时的时间）
let request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,  // 基础路径上会携带/api
  timeout: 5000  // 超时的时间
})

// 第二步：request实例添加请求拦截器
request.interceptors.request.use(config => {
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  // 获取用户相关的仓库
  const userStore = useUserStore()
  // 判断是否存在token，如果存在，则携带到请求头中
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  // 返回配置对象
  return config
})

// 第三步：响应拦截器
request.interceptors.response.use(response => {
  // 成功回调
  // 简化数据
  return response.data
}, error => {
  // 失败回调
  // 定义一个变量：存储网络错误信息
  let message = ''
  // http状态码
  let status = error.response.status
  switch (status) {
    case 401:
      message = 'TOKEN过期'
      break
    case 403:
      message = '无权访问'
      break
    case 404:
      message = '请求地址错误'
      break
    case 500:
      message = '服务器出现问题'
      break
    default:
      message = '网络出现问题'
      break
  }
  // 提示错误信息
  ElMessage({
    type: 'error',
    message
  })
  // 终止promise链
  return Promise.reject(error)

})

// 对外暴露
export default request