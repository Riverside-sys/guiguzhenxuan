// 品牌管理模块接口
import request from '@/utils/request'
// 引入品牌类型
import type { TrademarkResponseData, Trademark } from './type'

// 品牌管理模块接口地址
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTradeMark',
  // 新增品牌接口
  ADD_TRADEMARK_URL = '/admin/product/baseTradeMark/save',
  // 修改品牌接口
  UPDATE_TRADEMARK_URL = '/admin/product/baseTradeMark/update',
  // 删除品牌接口
  REMOVE_TRADEMARK_URL = '/admin/product/baseTradeMark/remove'
}

// 获取已有品牌的接口方法
// 参数：pageNo 当前页码，limit 每页条数
export const reqHasTrademark = (pageNo: number, limit: number) =>
  request.get<any, TrademarkResponseData>(API.TRADEMARK_URL, {
    params: { pageNo, limit }
  })

// 新增/编辑品牌的接口方法
export const reqAddOrUpdateTrademark = (data: Trademark) => {
  if (data.id) {
    // 编辑品牌
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    // 新增品牌
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data)
  }
}

// 删除品牌的接口方法
export const reqRemoveTrademark = (id: number) =>
  request.delete<any, any>(API.REMOVE_TRADEMARK_URL, {
    params: { id }
  })
