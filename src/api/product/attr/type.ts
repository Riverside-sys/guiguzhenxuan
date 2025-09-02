// 公共类型
interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// 1.分类数据类型
// 分类数据的类型
export interface CategoryObj {
  id: number | string,
  name: string,
  category1Id?: number
}
// 分类响应结果的类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

// 2.属性数据类型
// 属性值类型
export interface AttrValue {
  id: number | string,
  valueName: string,
  attrId: number
}
// 属性对象类型
export interface AttrObj {
  id: number | string,
  attrName: string,
  attrList: AttrValue[],
  category1Id: number | string,
  category2Id: number | string
}
// 属性列表响应结果的类型
export interface AttrResponseData extends ResponseData {
  data: AttrObj[]
}




