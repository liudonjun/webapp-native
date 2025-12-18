---
title: 快速开始
description: 快速上手H5打包APK构建系统
---

# 快速开始

本指南将帮助您在几分钟内开始使用H5打包APK构建系统。

## 第一步：安装依赖

```bash
npm install
# 或
pnpm install
```

## 第二步：创建环境配置文件

运行以下命令自动创建 `.env` 文件：

```bash
npm run create:env
```

这个命令会：
- 自动检测Android SDK和Java SDK路径
- 基于 `.env.example` 生成 `.env` 文件
- 配置环境变量

**或者手动创建**：复制 `.env.example` 为 `.env` 并填写实际值。

## 第三步：初始化项目

```bash
npm run init
```

这个命令会：
- 检测前端框架类型
- 初始化Capacitor配置
- 创建Android项目结构
- 配置构建环境

## 第四步：开发H5项目

在 `web/` 目录下开发你的前端项目。如果还没有项目，系统会自动创建基础结构。

开发时可以使用：

```bash
npm run dev
```

这会在浏览器中启动开发服务器（`http://localhost:3000`），支持热重载。

## 第五步：配置应用信息

**方式1：使用.env文件（推荐）**

编辑 `.env` 文件，配置：
- `APP_ID`: 应用包名（如：com.example.app）
- `APP_NAME`: 应用名称
- `APP_VERSION`: 应用版本

**方式2：使用build.config.js**

编辑 `build.config.js` 文件进行配置。

**注意**：`.env` 文件中的配置优先级高于 `build.config.js`。

## 第六步：构建APK

```bash
npm run build:apk
```

这个命令会执行完整的构建流程：
1. 构建H5项目（`npm run build:web`）
2. 同步到Capacitor（`npm run sync`）
3. 编译APK（`npm run build:android`）

构建完成后，APK文件会在 `build/` 目录下。

## 开发模式

开发H5项目时，使用：

```bash
npm run dev
```

这会在浏览器中启动开发服务器，支持热重载。

## 下一步

- 📖 查看 [环境变量配置指南](/guide/env-config) 了解详细配置
- 🔐 查看 [签名证书配置指南](/guide/signing-setup) 配置Release版本
- ❓ 查看 [常见问题](/faq/) 解决遇到的问题

