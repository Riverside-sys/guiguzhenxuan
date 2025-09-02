// 这个文件用来模拟根据一级分类id和二级分类id获取属性列表

// 属性数据 - 手机类
const phoneAttributes = {
  // 小米手机属性
  11: [
    {
      id: 111,
      attrName: '特点',
      attrList: [
        { id: 1111, valueName: '雷军', attrId: 111 },
        { id: 1112, valueName: 'are you ok?', attrId: 111 },
        { id: 1113, valueName: '性价比', attrId: 111 }
      ],
      category1Id: 1,
      category2Id: 11
    },
    {
      id: 112,
      attrName: '品牌',
      attrList: [
        { id: 1121, valueName: '小米13', attrId: 112 },
        { id: 1122, valueName: '小米14', attrId: 112 },
        { id: 1123, valueName: '小米15pro', attrId: 112 },
        { id: 1124, valueName: 'Su7 Max', attrId: 112 }
      ],
      category1Id: 1,
      category2Id: 11
    },
  ],
  // 华为手机属性
  12: [
    {
      id: 121,
      attrName: '产品',
      attrList: [
        { id: 1211, valueName: '遥遥领先', attrId: 121 },
        { id: 1212, valueName: '鸿蒙', attrId: 121 },
        { id: 1213, valueName: '麒麟', attrId: 121 }
      ],
      category1Id: 1,
      category2Id: 12
    },
    {
      id: 122,
      attrName: '品牌',
      attrList: [
        { id: 1221, valueName: 'Mate 60 pro', attrId: 122 },
        { id: 1222, valueName: 'Pura X', attrId: 122 },
        { id: 1223, valueName: 'Pura 80', attrId: 122 }
      ],
      category1Id: 1,
      category2Id: 12
    }
  ],
  // 苹果手机属性
  13: [
    {
      id: 131,
      attrName: '评价',
      attrList: [
        { id: 1311, valueName: 'only apple can do', attrId: 131 },
        { id: 1312, valueName: '好贵', attrId: 131 },
        { id: 1313, valueName: '买不起', attrId: 131 },
        { id: 1314, valueName: '时尚', attrId: 131 },
      ],
      category1Id: 1,
      category2Id: 13
    },
    {
      id: 132,
      attrName: '品牌',
      attrList: [
        { id: 1321, valueName: 'iphone 18', attrId: 132 },
        { id: 1322, valueName: 'iphone 18 pro', attrId: 132 },
        { id: 1323, valueName: 'iphone 18 pro max', attrId: 132 }
      ],
      category1Id: 1,
      category2Id: 13
    }
  ]
}

// 属性数据 - 图书类
const bookAttributes = {
  // 西游记属性
  21: [
    {
      id: 211,
      attrName: '类型',
      attrList: [
        { id: 2111, valueName: '神话', attrId: 211 },
        { id: 2112, valueName: '武侠', attrId: 211 },
        { id: 2113, valueName: '科幻', attrId: 211 },
        { id: 2114, valueName: '师徒四人', attrId: 211 },
      ],
      category1Id: 2,
      category2Id: 21
    },
    {
      id: 212,
      attrName: '人物',
      attrList: [
        { id: 2121, valueName: '孙悟空', attrId: 212 },
        { id: 2122, valueName: '猪八戒', attrId: 212 },
        { id: 2123, valueName: '沙僧', attrId: 212 },
        { id: 2124, valueName: '唐僧', attrId: 212 }
      ],
      category1Id: 2,
      category2Id: 21
    },
    {
      id: 213,
      attrName: '故事',
      attrList: [
        { id: 2131, valueName: '三打白骨精', attrId: 213 },
        { id: 2132, valueName: '大战红孩儿', attrId: 213 },
        { id: 2133, valueName: '三借芭蕉扇', attrId: 213 }
      ],
      category1Id: 2,
      category2Id: 21
    }
  ],
  // 三国演义属性
  22: [
    {
      id: 221,
      attrName: '人物',
      attrList: [
        { id: 2211, valueName: '曹操', attrId: 221 },
        { id: 2212, valueName: '诸葛亮', attrId: 221 },
        { id: 2213, valueName: '刘备', attrId: 221 },
        { id: 2214, valueName: '关羽', attrId: 221 },
        { id: 2215, valueName: '张飞', attrId: 221 },
        { id: 2216, valueName: '赵云', attrId: 221 },
      ],
      category1Id: 2,
      category2Id: 22
    },
    {
      id: 222,
      attrName: '故事',
      attrList: [
        { id: 2221, valueName: '三顾茅庐', attrId: 222 },
        { id: 2222, valueName: '草船借箭', attrId: 222 },
        { id: 2223, valueName: '火烧赤壁', attrId: 222 }
      ],
    }
  ],
  // 红楼梦属性
  23: [
    {
      id: 231,
      attrName: '人物',
      attrList: [
        { id: 2311, valueName: '贾宝玉', attrId: 231 },
        { id: 2312, valueName: '林黛玉', attrId: 231 },
        { id: 2313, valueName: '薛宝钗', attrId: 231 },
        { id: 2314, valueName: '贾母', attrId: 231 },
        { id: 2315, valueName: '王熙凤', attrId: 231 },
        { id: 2316, valueName: '贾政', attrId: 231 },
      ],
      category1Id: 2,
      category2Id: 23
    },
    {
      id: 232,
      attrName: '故事',
      attrList: [
        { id: 2321, valueName: '黛玉葬花', attrId: 232 },
        { id: 2322, valueName: '宝玉出家', attrId: 232 },
        { id: 2323, valueName: '宝玉成亲', attrId: 232 }
      ],
      category1Id: 2,
      category2Id: 23
    }
  ],
  // 水浒传属性
  24: [
    {
      id: 241,
      attrName: '人物',
      attrList: [
        { id: 2411, valueName: '宋江', attrId: 241 },
        { id: 2412, valueName: '武松', attrId: 241 },
        { id: 2413, valueName: '林冲', attrId: 241 }
      ],
      category1Id: 2,
      category2Id: 24
    },
    {
      id: 242,
      attrName: '故事',
      attrList: [
        { id: 2421, valueName: '武松打虎', attrId: 242 },
        { id: 2422, valueName: '倒拔垂杨柳', attrId: 242 },
        { id: 2423, valueName: '智取生辰纲', attrId: 242 }
      ],
      category1Id: 2,
      category2Id: 24
    }
  ]
}

// 属性数据 - 电影类
const movieAttributes = {
  // 肖申克的救赎属性
  31: [
    {
      id: 311,
      attrName: '主题',
      attrList: [
        { id: 3111, valueName: '自由', attrId: 311 },
        { id: 3112, valueName: '希望', attrId: 311 }
      ],
      category1Id: 3,
      category2Id: 31
    },
    {
      id: 312,
      attrName: '台词',
      attrList: [
        { id: 3121, valueName: '梦想', attrId: 312 },
        { id: 3122, valueName: '坚持', attrId: 312 },
        { id: 3123, valueName: '希望', attrId: 312 }
      ],
      category1Id: 3,
      category2Id: 31
    }
  ],
  // 绿皮书属性
  32: [
    {
      id: 321,
      attrName: '人物',
      attrList: [
        { id: 3211, valueName: '托尼', attrId: 321 },
        { id: 3212, valueName: '唐', attrId: 321 },
        { id: 3213, valueName: '贾维斯', attrId: 321 },
      ],
      category1Id: 3,
      category2Id: 32
    },
    {
      id: 322,
      attrName: '故事',
      attrList: [
        { id: 3221, valueName: '旅行', attrId: 322 },
        { id: 3222, valueName: '音乐', attrId: 322 },
        { id: 3223, valueName: '偏见', attrId: 322 }
      ],
      category1Id: 3,
      category2Id: 32
    }
  ],
  // 泰坦尼克号属性
  33: [
    {
      id: 331,
      attrName: '类型',
      attrList: [
        { id: 3311, valueName: '爱情', attrId: 331 },
        { id: 3312, valueName: '经典', attrId: 331 }
      ],
      category1Id: 3,
      category2Id: 33
    },
    {
      id: 332,
      attrName: '台词',
      attrList: [
        { id: 3321, valueName: 'you jump, i jump', attrId: 332 },
        { id: 3322, valueName: 'i love you', attrId: 332 },
        { id: 3323, valueName: 'my heart will go on', attrId: 332 }
      ],
      category1Id: 3,
      category2Id: 33
    }
  ]
}

// 导出模拟接口
export default [
  // 根据一级分类ID和二级分类ID获取属性列表接口
  {
    url: "/api/admin/product/getAttrInfoList",
    method: "get",
    response: ({ query }) => {
      // 获取一级分类ID和二级分类ID
      const category1Id = Number(query.category1Id);
      const category2Id = Number(query.category2Id);

      // 验证参数
      if (!category1Id || !category2Id) {
        return {
          code: 201,
          message: "分类ID不能为空",
          data: null,
          ok: false
        };
      }

      // 根据一级分类ID和二级分类ID获取对应的属性列表
      let attrList = [];

      if (category1Id === 1) {
        // 手机类属性
        attrList = phoneAttributes[category2Id] || [];
      } else if (category1Id === 2) {
        // 图书类属性
        attrList = bookAttributes[category2Id] || [];
      } else if (category1Id === 3) {
        // 电影类属性
        attrList = movieAttributes[category2Id] || [];
      }

      // 返回数据
      return {
        code: 200,
        message: '获取属性列表成功',
        data: attrList,
        ok: true
      };
    }
  }
]
