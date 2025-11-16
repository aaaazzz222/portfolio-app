# 全栈个人作品集网站

一个基于 React 构建的现代化个人作品集单页应用（SPA），集成 Node.js 后端 API，实现了完整的前后端分离架构。项目包含项目展示、博客系统、联系表单以及后台管理系统等功能。

## 在线演示

- **前端部署**: [待部署至 Vercel/Netlify]
- **后端 API**: [待部署至 Render/Railway]

## 项目特点

### 公开功能
- **首页/关于页面**: 专业的个人简介和技能展示
- **项目展示**: 展示作品集项目，包含图片、描述和技术栈
- **博客系统**: 浏览和阅读博客文章，支持标签和分类
- **博客详情**: 完整文章内容和评论功能（需登录）
- **联系表单**: 通过网站直接发送消息

### 管理功能（需认证）
- **身份认证**: 基于 JWT Token 的安全登录注册系统
- **管理后台**: 受保护的管理面板，仅认证用户可访问
- **项目管理**: 完整的 CRUD 操作管理作品集项目
- **博客管理**: 完整的 CRUD 操作管理博客文章
- **实时更新**: 所有修改立即反映到公开页面

## 技术栈

### 前端技术
- **React 19.2.0**: 组件化 UI 库
- **React Router v7.9.6**: 客户端路由，支持路由守卫
- **Context API**: 全局状态管理（用户认证）
- **Axios 1.13.2**: HTTP 客户端，支持请求/响应拦截器
- **Tailwind CSS 4.1.17**: 现代化实用优先 CSS 框架
- **Vite 7.2.2**: 快速的前端构建工具和开发服务器

### 后端集成
- **REST API**: 与 Node.js/Express 后端集成
- **JWT 认证**: 基于 Token 的身份认证，自动 Token 管理
- **Axios 拦截器**: 自动注入 Token 和错误处理

## 项目结构

```
portfolio-app/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── Header.jsx       # 导航栏（认证感知）
│   │   ├── Footer.jsx       # 页脚
│   │   ├── ProjectCard.jsx  # 项目卡片
│   │   ├── BlogPostCard.jsx # 博客卡片
│   │   ├── Loading.jsx      # 加载动画
│   │   ├── ErrorMessage.jsx # 错误提示
│   │   └── ProtectedRoute.jsx # 路由守卫
│   ├── pages/               # 页面组件
│   │   ├── Home.jsx         # 首页
│   │   ├── Projects.jsx     # 项目展示页
│   │   ├── Blog.jsx         # 博客列表
│   │   ├── BlogDetail.jsx   # 博客详情（含评论）
│   │   ├── Contact.jsx      # 联系表单
│   │   ├── Login.jsx        # 登录页
│   │   ├── Register.jsx     # 注册页
│   │   └── AdminDashboard.jsx # 管理后台
│   ├── contexts/            # React Context
│   │   └── AuthContext.jsx  # 认证上下文
│   ├── utils/               # 工具函数
│   │   └── api.js           # Axios 实例和拦截器
│   ├── config/              # 配置文件
│   │   └── api.js           # API 端点配置
│   ├── App.jsx              # 根组件和路由配置
│   ├── main.jsx             # 应用入口
│   └── index.css            # Tailwind CSS 导入
├── public/                  # 静态资源
├── dist/                    # 构建输出目录
├── .env.example             # 环境变量模板
├── tailwind.config.js       # Tailwind 配置
├── vite.config.js           # Vite 配置
├── vercel.json              # Vercel 部署配置
├── netlify.toml             # Netlify 部署配置
└── package.json             # 项目依赖
```

## 快速开始

### 环境要求
- Node.js (v14 或更高版本)
- npm 或 yarn
- 运行中的后端 API 服务

### 本地开发

1. **克隆项目**
   ```bash
   git clone <your-repo-url>
   cd portfolio-app
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   ```bash
   cp .env.example .env
   ```

   编辑 `.env` 文件，设置后端 API 地址：
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

   应用将运行在 `http://localhost:5173`

5. **生产构建**
   ```bash
   npm run build
   ```

   构建产物将输出到 `dist/` 目录

## API 集成说明

### API 端点

#### 用户认证
- `POST /api/users/register` - 用户注册
- `POST /api/users/login` - 用户登录

#### 项目管理
- `GET /api/projects` - 获取所有项目
- `POST /api/projects` - 创建新项目（需认证）
- `PUT /api/projects/:id` - 更新项目（需认证）
- `DELETE /api/projects/:id` - 删除项目（需认证）

#### 博客管理
- `GET /api/blog` - 获取所有博客文章
- `GET /api/blog/:id` - 获取单篇博客文章
- `POST /api/blog` - 创建新文章（需认证）
- `PUT /api/blog/:id` - 更新文章（需认证）
- `DELETE /api/blog/:id` - 删除文章（需认证）
- `POST /api/blog/:postId/comments` - 添加评论

#### 联系表单
- `POST /api/contact` - 发送联系信息

### 认证流程

1. 用户通过 UI 注册或登录
2. 服务器返回 JWT Token 和用户数据
3. Token 存储在 localStorage
4. Axios 拦截器自动在请求中添加 Token
5. Token 无效时（401），自动重定向到登录页

## 部署指南

### 前端部署（Vercel）

1. **安装 Vercel CLI**（可选）
   ```bash
   npm install -g vercel
   ```

2. **部署到 Vercel**
   ```bash
   vercel
   ```

   或将 GitHub 仓库连接到 Vercel 实现自动部署

3. **配置环境变量**

   在 Vercel 项目设置中添加：
   ```
   VITE_API_URL=<你的后端API地址>
   ```

### 前端部署（Netlify）

1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署到 Netlify**
   - 拖拽 `dist/` 文件夹到 Netlify
   - 或使用 Netlify CLI：
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod
     ```

3. **配置环境变量**

   在 Netlify 仪表板 > 站点设置 > 环境变量：
   ```
   VITE_API_URL=<你的后端API地址>
   ```

## 核心功能实现

### 1. 组件化架构
所有 UI 元素都拆分为可复用组件，通过 props 进行数据传递。

### 2. React Router 路由
- 公开路由：所有访客可访问
- 受保护路由：未认证用户重定向到登录页
- 动态路由：博客详情页 (`/blog/:id`)

### 3. 全局状态管理
- AuthContext 提供全局认证状态
- 用户数据和 Token 存储在 localStorage
- 认证感知的 UI 组件（Header 根据登录状态显示不同链接）

### 4. API 集成
- 所有页面使用 useEffect 钩子获取数据
- 优雅处理加载和错误状态
- 所有用户输入使用受控表单
- 受保护的请求自动包含 JWT Token

### 5. 管理后台
- 标签页界面管理项目和博客
- 内联表单支持创建和更新操作
- 删除操作带确认对话框
- 实时反馈成功/错误信息

### 6. 响应式设计
- 移动优先的 Tailwind CSS 方案
- 响应式网格布局
- 移动端友好导航
- 触摸友好的 UI 元素

## 使用指南

### 访客使用
1. 无需认证即可浏览项目和博客
2. 通过联系表单发送消息
3. 注册账号后可在博客文章下发表评论

### 管理员使用
1. 注册账号或登录
2. 从导航栏访问管理后台
3. 在项目和博客标签之间切换
4. 创建、编辑或删除内容
5. 修改立即反映到公开页面

## 开发说明

### 添加新功能
1. 在 `src/components/` 创建新组件
2. 在 `src/pages/` 创建新页面
3. 在 `src/App.jsx` 添加路由
4. 在 `src/config/api.js` 更新 API 端点

### 样式指南
- 使用 Tailwind CSS 实用类
- 遵循现有配色方案（蓝色主色调，紫色强调色）
- 保持一致的间距和排版

### 安全考虑
- JWT Token 存储在 localStorage
- 受保护路由重定向未认证用户
- API 请求包含认证头
- 所有表单进行输入验证

## 常见问题

### API 连接问题
- 检查 `.env` 中的 `VITE_API_URL` 设置是否正确
- 确保后端服务器正在运行
- 检查浏览器控制台是否有 CORS 错误

### 认证问题
- 登录问题时清除 localStorage
- 验证后端返回的 JWT Token 格式
- 检查 Token 过期设置

### 构建问题
- 清除 `node_modules` 并重新安装：`rm -rf node_modules && npm install`
- 清除 Vite 缓存：`rm -rf node_modules/.vite`

## 贡献

本项目是 Web 编程课程的期末项目。欢迎 Fork 并自定义为您自己的作品集！

## 许可证

MIT License - 欢迎将此项目用于您自己的作品集。

## 致谢

- 构建于 Web 编程 - 构建现代用户界面 课程
- 集成了 Web 数据管理与应用 课程的作品集与博客 API

---

**作者**: [Your Name]
**课程**: Web Programming – Building the Modern User Interface
**项目**: Full-Stack Portfolio SPA Capstone
