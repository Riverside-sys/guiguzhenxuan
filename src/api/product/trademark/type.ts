export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// 定义品牌数据类型
export interface Trademark {
  id?: number | string
  name: string
  logo: string
}

// 定义接口返回数据类型
export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Trademark[]
    total: number
    size: number
    current: number
  }
}