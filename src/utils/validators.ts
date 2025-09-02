// 用户名验证规则
// _rule：参数带下划线，表示这个参数不会被使用，这样ts就不会报错
export const validateUsername = (_rule: any, value: any, callback: any) => {
  // rule：是当前的规则对象
  // value：是用户输入的值
  // callback定义了校验成功/失败后，执行哪一个回调函数
  if (value.length >= 5 && value.length <= 10) {
    // 如果校验通过，则调用callback()
    callback()
  } else {
    // 如果校验失败，则调用callback(new Error(''))，并注入错误信息
    callback(new Error('用户名必须为5-10位'))
  }
}
// 密码验证规则
export const validatePassword = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6 && value.length <= 15) {
    callback()
  } else {
    callback(new Error('密码必须为6-15位'))
  }
}