# 硅谷甄选后台管理系统

## 项目简介

本项目是一个基于 Vue3 + TypeScript + Vite 技术栈开发的后台管理系统，适用于企业级权限管理、商品管理、数据大屏等场景。项目采用模块化开发，结构清晰，易于维护和扩展。

## 技术栈
- **前端框架**：Vue 3
- **编程语言**：TypeScript
- **构建工具**：Vite
- **UI 框架**：Element Plus
- **状态管理**：Pinia
- **路由管理**：Vue Router
- **数据可视化**：ECharts
- **网络请求**：Axios
- **Mock 数据**：vite-plugin-mock、mockjs
- **SVG 图标**：vite-plugin-svg-icons
- **样式**：Sass/SCSS

## 主要功能模块
- **用户认证**：登录、登出、鉴权、动态路由
- **权限管理**：用户管理、角色管理、菜单权限分配
- **商品管理**：品牌管理、属性管理、SPU管理、SKU管理
- **数据大屏**：多维度数据可视化展示
- **全局组件**：SVG 图标、分页器、分类选择器等
- **主题切换**：支持暗黑模式
- **进度条与全局提示**：NProgress、Element Plus 消息提示

## 项目结构
```
├── mock/                # mock 数据
├── public/              # 静态资源
├── src/
│   ├── api/             # 所有后端接口定义
│   ├── assets/          # 静态资源（图片、SVG等）
│   ├── components/      # 全局/通用组件
│   ├── layout/          # 布局相关组件
│   ├── router/          # 路由配置
│   ├── store/           # Pinia 状态管理
│   ├── styles/          # 全局样式
│   ├── utils/           # 工具函数
│   ├── views/           # 各业务页面
│   └── main.ts          # 项目入口
├── vite.config.ts       # Vite 配置
├── tsconfig*.json       # TypeScript 配置
├── package.json         # 依赖与脚本
└── README.md            # 项目说明
```

## 启动方式
1. 安装依赖（推荐使用 pnpm）：
   ```bash
   pnpm install
   ```
2. 启动开发环境：
   ```bash
   pnpm dev
   ```
3. 打包生产环境：
   ```bash
   pnpm build
   ```

## 其他说明
- 本项目内置 mock 数据，开箱即用，无需后端即可体验全部功能。
- 适合学习 Vue3 企业级项目架构、权限管理、数据大屏等实战场景。

---

如有建议或问题，欢迎提 Issue 或 PR！
