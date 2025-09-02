// 封装一个函数：获取当前时间是上午or中午or下午or晚上
export const getTime = () => {
  // 通过内置构造函数Date
  let hours = new Date().getHours()
  if (hours > 5 && hours <= 10) {
    return '上午'
  } else if (hours > 10 && hours <= 14) {
    return '中午'
  } else if (hours > 14 && hours <= 18) {
    return '下午'
  } else {
    return '晚上'
  }
}