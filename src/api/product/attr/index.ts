// 这里书写属性相关的API文件
import request from '@/utils/request'
// 引入分类响应数据类型
import type { CategoryResponseData, AttrResponseData } from './type'

// 属性管理模块接口地址
enum API {
  // 获取一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  // 获取二级分类接口地址
  C2_URL = '/admin/product/getCategory2',
  // 获取属性列表接口地址
  ATTR_URL = '/admin/product/getAttrInfoList'
}

// 获取一级分类接口
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

// 获取二级分类接口
export const reqC2 = (category1Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL, { params: { category1Id } })

// 获取属性列表接口
export const reqAttr = (category1Id: number | string, category2Id: number | string) => request.get<any, AttrResponseData>(API.ATTR_URL, { params: { category1Id, category2Id } })


