---
layout: home

hero:
  name: WebApp Native
  text: 跨平台构建解决方案
  tagline: 将Web应用快速打包为原生应用，支持Android和iOS，基于Capacitor
  image:
    src: /logo.png
    alt: WebApp Native
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quick-start
    - theme: alt
      text: 查看文档
      link: /guide/env-config

features:
  - icon: 🚀
    title: 快速上手
    details: 简单的配置，几分钟内即可开始构建APK
  - icon: 🔧
    title: 灵活配置
    details: 支持环境变量和配置文件，满足不同场景需求
  - icon: 🔒
    title: 安全可靠
    details: 完善的签名机制，保障应用安全
  - icon: 📦
    title: 多框架支持
    details: 自动检测并支持 React、Vue、Angular、Vanilla JS
  - icon: ⚡
    title: 自动化构建
    details: 一键完成从H5到APK的完整构建流程
  - icon: 📚
    title: 完整文档
    details: 详细的文档和示例，帮助您快速解决问题
---

## 功能特性

- ✅ **跨平台支持**：支持 Android 和 iOS（iOS支持开发中）
- ✅ **多框架支持**：自动检测并支持 React、Vue、Angular、Vanilla JS
- ✅ **完整构建流程**：Web构建 → Capacitor同步 → 原生应用编译，一键完成
- ✅ **双模式构建**：支持 Debug 和 Release 版本
- ✅ **灵活配置**：支持环境变量（.env）和配置文件（build.config.js）
- ✅ **自动化脚本**：项目初始化、证书生成、环境配置一键完成
- ✅ **测试支持**：完整的单元测试框架（Jest）

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 创建环境配置
npm run create:env

# 3. 初始化项目
npm run init

# 4. 构建Android应用
npm run build:android

# 5. 构建iOS应用（开发中）
npm run build:ios
```

更多信息请查看 [快速开始指南](/guide/quick-start)。

