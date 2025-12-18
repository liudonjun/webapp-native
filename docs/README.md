# 文档站点

本项目使用 [VitePress](https://vitepress.dev/) 构建文档站点。

## 开发文档

启动开发服务器：

```bash
npm run docs:dev
```

访问：`http://localhost:5173`

## 构建文档

构建生产版本：

```bash
npm run docs:build
```

输出目录：`docs/dist-docs/`

## 预览构建结果

预览构建后的文档：

```bash
npm run docs:preview
```

## 文档结构

```
docs/
├── .vitepress/          # VitePress配置
│   ├── config.js       # 站点配置
│   └── theme/          # 主题自定义
├── guide/              # 指南文档
│   ├── quick-start.md
│   ├── env-config.md
│   ├── signing-setup.md
│   └── ...
├── faq/                # 常见问题
└── index.md            # 首页
```

## 添加新文档

1. 在 `docs/guide/` 或相应目录创建 `.md` 文件
2. 在 `docs/.vitepress/config.js` 中添加导航和侧边栏配置
3. 使用 frontmatter 添加元数据：

```markdown
---
title: 文档标题
description: 文档描述
---
```

## 部署

构建后的文档可以部署到：
- GitHub Pages
- Netlify
- Vercel
- 或其他静态站点托管服务

