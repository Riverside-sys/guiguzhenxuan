// 一级分类数据
let category1List = [
  {
    id: 1,
    name: '手机'
  },
  {
    id: 2,
    name: '图书'
  },
  {
    id: 3,
    name: '电影'
  }]

// 二级分类数据-手机
let category2ListPhone = [
  {
    id: 11,
    name: '小米',
    category1Id: 1
  },
  {
    id: 12,
    name: '华为',
    category1Id: 1
  },
  {
    id: 13,
    name: '苹果',
    category1Id: 1
  }
]

// 二级分类数据-图书
let category2ListBook = [
  {
    id: 21,
    name: '西游记',
    category1Id: 2
  },
  {
    id: 22,
    name: '三国演义',
    category1Id: 2
  },
  {
    id: 23,
    name: '红楼梦',
    category1Id: 2
  },
  {
    id: 24,
    name: '水浒传',
    category1Id: 2
  }
]

// 二级分类数据-电影
let category2ListMovie = [
  {
    id: 31,
    name: '肖申克的救赎',
    category1Id: 3
  },
  {
    id: 32,
    name: '绿皮书',
    category1Id: 3
  },
  {
    id: 33,
    name: '泰坦尼克号',
    category1Id: 3
  }
]

// 获取一级分类接口
export default [
  // 获取一级分类接口
  {
    url: "/api/admin/product/getCategory1",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: '获取一级分类成功',
        data: category1List,
        ok: true
      };
    },
  },

  // 按照一级分类id获取二级分类接口
  {
    url: "/api/admin/product/getCategory2",
    method: "get",
    response: ({ query }) => {
      // 获取一级分类ID
      const category1Id = Number(query.category1Id);

      // 验证id是否存在
      if (!category1Id) {
        return { code: 201, message: "一级分类ID不能为空", data: null, ok: false };
      }

      // 根据一级分类ID获取对应的二级分类
      let category2List: any = [];
      if (category1Id === 1) {
        category2List = category2ListPhone;
      } else if (category1Id === 2) {
        category2List = category2ListBook;
      } else if (category1Id === 3) {
        category2List = category2ListMovie;
      }

      // 返回数据
      return {
        code: 200,
        message: '获取二级分类成功',
        data: category2List,
        ok: true
      };
    }
  }
]
