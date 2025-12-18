---
title: 环境变量配置指南
description: 使用.env文件管理项目配置
---

# 环境变量配置指南

项目使用 `.env` 文件来管理环境相关的配置，包括SDK路径、应用信息、签名配置等。

## 概述

使用环境变量配置的优势：

- ✅ 将敏感信息从代码中分离
- ✅ 不同环境使用不同配置
- ✅ 避免将敏感信息提交到Git仓库
- ✅ 方便团队协作（通过.env.example模板）

## 快速开始

### 1. 创建.env文件

运行以下命令自动创建 `.env` 文件：

```bash
npm run create:env
```

脚本会自动：
- 检测Android SDK路径
- 检测Java SDK路径
- 基于 `.env.example` 生成 `.env` 文件
- 配置环境变量

### 2. 手动创建

如果自动创建失败，可以手动创建：

```bash
# 复制模板文件
cp .env.example .env

# 然后编辑.env文件，填写实际值
```

## 配置说明

### Android SDK配置

```bash
# Android SDK路径
ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
# 或使用
ANDROID_SDK_ROOT=C:\Users\YourUsername\AppData\Local\Android\Sdk
```

**默认位置**：
- **Windows**: `C:\Users\<用户名>\AppData\Local\Android\Sdk`
- **macOS**: `~/Library/Android/sdk`
- **Linux**: `~/Android/Sdk`

### Java SDK配置

```bash
# Java SDK路径（可选，脚本会自动检测Android Studio自带的JDK）
JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
```

**Android Studio自带JDK位置**：
- Windows: `C:\Program Files\Android\Android Studio\jbr`
- macOS: `/Applications/Android Studio.app/Contents/jbr`

### 应用基本信息

```bash
# 应用包名（必须唯一）
APP_ID=com.example.app

# 应用显示名称
APP_NAME=My App

# 应用版本号
APP_VERSION=1.0.0
```

### 构建配置

```bash
# 构建模式: debug 或 release
BUILD_MODE=debug

# H5构建输出目录
WEB_DIR=web/dist

# APK输出目录
OUTPUT_DIR=build
```

### Android SDK版本配置

```bash
# 最低支持的Android版本（API Level）
ANDROID_MIN_SDK_VERSION=22

# 目标Android版本
ANDROID_TARGET_SDK_VERSION=34

# 编译时使用的SDK版本
ANDROID_COMPILE_SDK_VERSION=34

# Android构建工具版本
ANDROID_BUILD_TOOLS_VERSION=34.0.0
```

### 签名配置（Release版本）

```bash
# 是否启用签名
SIGNING_ENABLED=false

# Keystore文件路径（相对于项目根目录）
KEYSTORE_PATH=release.keystore

# Keystore密码
KEYSTORE_PASSWORD=your-password

# Key别名
KEY_ALIAS=release-key

# Key密码（通常与keystore密码相同）
KEY_PASSWORD=your-password
```

## 配置优先级

配置的读取优先级（从高到低）：

1. **环境变量** (`.env` 文件或系统环境变量)
2. **build.config.js** 中的默认值

这意味着 `.env` 文件中的配置会覆盖 `build.config.js` 中的默认值。

## 环境变量使用示例

### 示例1：开发环境配置

`.env` (开发环境):

```bash
BUILD_MODE=debug
SIGNING_ENABLED=false
APP_ID=com.example.app.dev
```

### 示例2：生产环境配置

`.env` (生产环境):

```bash
BUILD_MODE=release
SIGNING_ENABLED=true
KEYSTORE_PATH=release.keystore
KEYSTORE_PASSWORD=secure-password-123
APP_ID=com.example.app
```

## 安全建议

### 1. 不要提交.env文件

`.env` 文件已添加到 `.gitignore`，不会被提交到Git仓库。

### 2. 使用.env.example作为模板

`.env.example` 文件应该提交到Git，作为配置模板供团队成员参考。

### 3. 敏感信息管理

对于签名密码等敏感信息：
- ✅ 使用强密码
- ✅ 使用密码管理器保存
- ✅ 不要将密码提交到代码仓库
- ✅ 考虑使用密钥管理服务（如AWS Secrets Manager、Azure Key Vault）

### 4. 不同环境使用不同配置

可以为不同环境创建不同的配置文件：
- `.env.development` - 开发环境
- `.env.production` - 生产环境
- `.env.local` - 本地覆盖（已添加到.gitignore）

## 验证配置

### 检查环境变量是否加载

在脚本中添加调试输出：

```javascript
console.log('ANDROID_HOME:', process.env.ANDROID_HOME);
console.log('APP_ID:', process.env.APP_ID);
```

### 检查build.config.js读取的配置

运行构建命令时，脚本会输出使用的配置值。

## 常见问题

### Q: .env文件没有被读取？

A: 确保：
1. `.env` 文件在项目根目录
2. 已安装 `dotenv` 包：`npm install`
3. 脚本中已调用 `require('dotenv').config()`

### Q: 如何在不同环境使用不同配置？

A: 可以：
1. 创建多个.env文件（`.env.development`, `.env.production`）
2. 在运行脚本前设置环境变量
3. 使用不同的配置文件

### Q: 环境变量和build.config.js哪个优先级高？

A: 环境变量（`.env`文件）优先级更高，会覆盖 `build.config.js` 中的默认值。

### Q: 可以完全不使用.env文件吗？

A: 可以。如果不创建 `.env` 文件，系统会使用 `build.config.js` 中的默认值，或自动检测SDK路径。

## 相关命令

```bash
# 创建.env文件
npm run create:env

# 查看环境变量（PowerShell）
Get-Content .env

# 查看环境变量（Bash）
cat .env
```

## 参考资源

- [dotenv文档](https://github.com/motdotla/dotenv)
- [12-Factor App: Config](https://12factor.net/config)
- [环境变量最佳实践](https://www.twilio.com/blog/environment-variables-node-js)

