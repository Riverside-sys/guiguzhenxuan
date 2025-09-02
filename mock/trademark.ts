// 品牌列表数据，用于模拟数据库
let trademarkList = [
  {
    id: 1,
    name: '华为',
    logo: 'https://www.logobiaozhi.com/upLoad/image/20230909/16942489332742399.jpg'
  },
  {
    id: 2,
    name: '小米',
    logo: 'https://logo800.cn/uploads/shiliang/26/logo800_16491868693442502.jpg'
  },
  {
    id: 3,
    name: '苹果',
    logo: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.AJc_PXy8H01l3IRkTyyYdwHaF7?rs=1&pid=ImgDetMain'
  },
  {
    id: 4,
    name: '三星',
    logo: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.GyHjRpMMaZk1GOTVt61QAgHaEK?w=273&h=211&c=8&rs=1&qlt=90&o=6&cb=iavawebpc1&dpr=1.5&pid=3.1&rm=2'
  },
  {
    id: 5,
    name: 'vivo',
    logo: 'https://ts1.tc.mm.bing.net/th/id/R-C.c5674a1952e820d948b2cec4f63fadb6?rik=XX9NDdR17vXbog&riu=http%3a%2f%2fpro.statics.logoqs.techuangyi.com%2f2019%2f01%2f14%2f49a2b375f452b6c51d61f4b882e22cff.png%3fx-oss-process%3dimage%2fresize%2cm_fill%2cw_312%2ch_175&ehk=UlN4iHVaeJKrUSEg3B%2bB9GsHB7UGcbz4cYsYjs%2fno%2fY%3d&risl=&pid=ImgRaw&r=0'
  },
  {
    id: 6,
    name: 'oppo',
    logo: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.Sed5C76QUiHlTvih-6yITwHaEt?w=240&h=211&c=8&rs=1&qlt=90&o=6&cb=iavawebpc1&dpr=1.5&pid=3.1&rm=2'
  },
  {
    id: 7,
    name: '魅族',
    logo: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.JU_05u-jX2KZSU5xwIolhAHaEK?w=267&h=211&c=8&rs=1&qlt=90&o=6&cb=iavawebpc1&dpr=1.5&pid=3.1&rm=2'
  }
]

export default [
  // 获取品牌列表接口
  {
    url: "/api/admin/product/baseTradeMark", // 请求地址
    method: "get", // 请求方式
    response: (request) => {
      // 获取分页参数，兼容 query 和 body（get 请求一般在 query）
      const { pageNo = 1, limit = 3 } = request.query || {};
      const list = trademarkList;
      const page = Number(pageNo);
      const size = Number(limit);
      const start = (page - 1) * size;
      const end = start + size;
      const pageList = list.slice(start, end);
      return {
        code: 200,
        message: '获取品牌列表成功',
        data: {
          records: pageList,
          total: list.length,
          size,
          current: page
        },
        ok: true
      };
    },
  },

  // 新增品牌接口
  {
    url: "/api/admin/product/baseTradeMark/save",
    method: "post",
    response: ({ body }) => {
      // 获取请求体携带过来的品牌名称与logo
      const { name, logo } = body;

      // 简单验证
      if (!name || !logo) {
        return { code: 201, message: "品牌名称和logo不能为空", data: null, ok: false };
      }

      // 生成新的id（取当前最大id加1）
      const maxId = Math.max(...trademarkList.map(item => item.id));
      const newId = maxId + 1;

      // 创建新品牌对象
      const newTrademark = {
        id: newId,
        name,
        logo
      };

      // 添加到列表中
      trademarkList.push(newTrademark);

      // 返回成功信息
      return { code: 200, message: '新增品牌成功', data: null, ok: true };
    },
  },

  // 修改品牌接口
  {
    url: "/api/admin/product/baseTradeMark/update",
    method: "put",
    response: ({ body }) => {
      // 获取请求体携带过来的品牌信息
      const { id, name, logo } = body;

      // 验证必要参数
      if (!id) {
        return { code: 201, message: "品牌id不能为空", data: null, ok: false };
      }

      if (!name || !logo) {
        return { code: 201, message: "品牌名称和logo不能为空", data: null, ok: false };
      }

      // 查找要修改的品牌
      const index = trademarkList.findIndex(item => item.id === id);

      // 未找到对应品牌
      if (index === -1) {
        return { code: 201, message: "品牌不存在", data: null, ok: false };
      }

      // 更新品牌信息
      trademarkList[index] = {
        id,
        name,
        logo
      };

      // 返回成功信息
      return { code: 200, message: '修改品牌成功', data: null, ok: true };
    },
  },

  // 上传品牌logo接口
  {
    url: "/api/admin/product/baseTradeMark/upload",
    method: "post",
    response: () => {
      // 模拟上传成功后返回的图片地址
      // 返回public文件夹下的图片地址

      // 可用的图片列表
      const availableImages = [
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg'
      ];

      // 随机选择一张图片
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      const logoUrl = 'http://localhost:5173' + availableImages[randomIndex];

      return {
        code: 200,
        message: '上传成功',
        data: logoUrl,
        ok: true
      };
    }
  },

  // 删除品牌接口
  {
    url: "/api/admin/product/baseTradeMark/remove",
    method: "delete",
    response: ({ query }) => {
      // 获取要删除的品牌id
      const id = Number(query.id);

      // 验证id是否存在
      if (!id) {
        return { code: 201, message: "品牌id不能为空", data: null, ok: false };
      }

      // 查找要删除的品牌索引
      const index = trademarkList.findIndex(item => item.id === id);

      // 未找到对应品牌
      if (index === -1) {
        return { code: 201, message: "品牌不存在", data: null, ok: false };
      }

      // 删除品牌
      trademarkList.splice(index, 1);

      // 返回成功信息
      return { code: 200, message: '删除品牌成功', data: null, ok: true };
    }
  }
]