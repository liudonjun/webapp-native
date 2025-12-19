# WebApp Native

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-lightgrey.svg)
![Capacitor](https://img.shields.io/badge/Capacitor-5.x-purple.svg)

[中文文档](README.md) | [English Docs](README.en.md)

一个基于Capacitor的Web应用转原生应用构建系统，支持Android和iOS平台，支持多种前端框架（React、Vue、Angular、Vanilla JS），提供自动化构建流程和完整的测试支持。

## 📋 目录

- [功能特性](#功能特性)
- [项目结构](#项目结构)
- [环境要求](#环境要求)
- [快速开始](#快速开始)
- [命令详解](#命令详解)
- [构建流程](#构建流程)
- [配置说明](#配置说明)
- [开发指南](#开发指南)
- [常见问题](#常见问题)

## ✨ 功能特性

- ✅ **跨平台支持**：支持 Android 和 iOS
- ✅ **多框架支持**：自动检测并支持 React、Vue、Angular、Vanilla JS
- ✅ **完整构建流程**：Web构建 → Capacitor同步 → 原生应用编译，一键完成
- ✅ **双模式构建**：支持 Debug 和 Release 版本
- ✅ **灵活配置**：支持环境变量（.env）和配置文件（build.config.js）
- ✅ **自动化脚本**：项目初始化、证书生成、环境配置一键完成
- ✅ **测试支持**：完整的单元测试框架（Jest）
- ✅ **详细日志**：清晰的错误提示和构建日志

## 📁 项目结构

```
buildApk/
├── web/                          # H5前端项目目录
│   ├── src/                      # 前端源码
│   │   ├── components/          # Vue组件
│   │   ├── views/               # 页面视图
│   │   └── main.js              # 应用入口
│   ├── public/                   # 静态资源
│   ├── dist/                     # H5构建输出（自动生成）
│   ├── index.html               # HTML入口
│   ├── vite.config.js           # Vite配置
│   ├── package.json             # 前端依赖配置
│   └── .gitignore               # Web项目Git忽略规则
│
├── android/                      # Android原生项目（由Capacitor生成）
│   ├── app/                     # Android应用模块
│   ├── gradle/                  # Gradle配置
│   ├── build.gradle             # 项目构建配置
│   └── .gitignore               # Android项目Git忽略规则
│
├── scripts/                      # 构建脚本目录
│   ├── init.js                  # 项目初始化脚本
│   ├── build-web.js             # H5构建脚本
│   ├── sync-capacitor.js        # Capacitor同步脚本
│   ├── build-apk.js             # APK编译脚本
│   ├── generate-keystore.js     # 证书生成脚本
│   ├── create-env.js            # 环境变量创建脚本
│   └── create-env-example.js   # 环境变量模板生成脚本
│
├── tests/                        # 测试目录
│   ├── helpers/                 # 测试辅助函数
│   ├── scripts/                 # 脚本测试
│   ├── utils/                   # 工具函数测试
│   ├── integration/            # 集成测试
│   └── setup.js                # 测试环境设置
│
├── docs/                        # 文档目录
│   ├── guide/                   # 指南文档
│   ├── faq/                     # 常见问题
│   └── .vitepress/              # VitePress配置
│
├── build/                       # 最终APK输出目录（自动生成）
├── capacitor.config.json        # Capacitor核心配置
├── build.config.js             # 构建系统配置
├── build.config.example.js      # 配置示例文件
├── .env                         # 环境变量文件（需创建）
├── .env.example                 # 环境变量模板
├── package.json                 # 项目根配置
├── jest.config.js               # Jest测试配置
└── README.md                    # 项目说明文档
```

## 🔧 环境要求

### 必需环境

- **Node.js** >= 16.0.0
- **npm/yarn/pnpm**（推荐使用pnpm）
- **Android SDK**（通过Android Studio安装）
- **Java JDK** 11+（推荐JDK 17）

### Android SDK配置

1. 安装 [Android Studio](https://developer.android.com/studio)
2. 通过Android Studio安装Android SDK（推荐API Level 34）
3. 设置环境变量：
   - **Windows**: 设置系统环境变量 `ANDROID_HOME` = `C:\Users\YourName\AppData\Local\Android\Sdk`
   - **macOS/Linux**: 在 `~/.bashrc` 或 `~/.zshrc` 中添加：
     ```bash
     export ANDROID_HOME=$HOME/Library/Android/sdk
     export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
     ```

### Java JDK配置

1. 安装JDK 11或更高版本
2. 设置环境变量 `JAVA_HOME`：
   - **Windows**: `C:\Program Files\Java\jdk-17`
   - **macOS/Linux**: `/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home`

## 🚀 快速开始

### 第一次使用（完整流程）

#### 步骤1：安装依赖

```bash
npm install
# 或
pnpm install
```

#### 步骤2：创建环境配置文件

```bash
npm run create:env
```

**作用**：
- 自动检测Android SDK和Java SDK路径
- 基于 `.env.example` 生成 `.env` 文件
- 配置基础环境变量

**输出**：生成 `.env` 文件

#### 步骤3：编辑环境配置（可选）

编辑 `.env` 文件，配置应用信息：

```env
# 应用基本信息
APP_ID=com.example.app
APP_NAME=我的应用
APP_VERSION=1.0.0

# Android SDK路径（已自动检测）
ANDROID_HOME=C:\Users\YourName\AppData\Local\Android\Sdk

# 构建模式
BUILD_MODE=debug
```

#### 步骤4：初始化项目

```bash
npm run init
```

**作用**：
- 检测前端框架类型（React/Vue/Angular/Vanilla）
- 初始化Capacitor配置
- 创建Android项目结构
- 配置构建环境

**输出**：
- `capacitor.config.json` - Capacitor配置
- `android/` - Android项目目录

#### 步骤5：开发H5项目

在 `web/` 目录下开发你的前端项目：

```bash
npm run dev
```

**作用**：启动开发服务器（Vite），支持热重载

**访问**：浏览器打开 `http://localhost:3000`

#### 步骤6：构建APK

```bash
npm run build:apk
```

**作用**：执行完整构建流程（见下方[构建流程](#构建流程)）

**输出**：`build/app-debug.apk` 或 `build/app-release.apk`

---

### 日常开发流程

#### 开发阶段

```bash
# 1. 启动开发服务器
npm run dev

# 2. 在浏览器中开发和调试
# 访问 http://localhost:3000
```

#### 测试阶段

```bash
# 1. 构建Debug版本APK
npm run build:apk

# 2. 安装到设备测试
adb install build/app-debug.apk
```

#### 发布阶段

```bash
# 1. 生成签名证书（如果还没有）
npm run generate:keystore

# 2. 配置.env文件，设置 BUILD_MODE=release

# 3. 构建Release版本APK
npm run build:apk
```

## 📖 命令详解

### 初始化命令

#### `npm run init`

**功能**：项目初始化

**执行内容**：
1. 检测前端框架类型（通过检查 `web/package.json`）
2. 创建必要的目录结构
3. 创建基础web项目文件（如果不存在）
4. 更新 `capacitor.config.json` 配置
5. 初始化Capacitor Android项目

**使用场景**：
- 首次使用项目
- 重新初始化项目结构

**前置条件**：
- 已安装依赖（`npm install`）
- 已创建 `.env` 文件（推荐）

---

### 环境配置命令

#### `npm run create:env`

**功能**：创建环境变量配置文件

**执行内容**：
1. 检测Android SDK路径
2. 检测Java SDK路径
3. 基于 `.env.example` 生成 `.env` 文件
4. 自动填充检测到的路径

**输出**：`.env` 文件

**使用场景**：
- 首次配置项目
- 更换开发环境

---

#### `npm run create:env:example`

**功能**：创建环境变量模板文件

**执行内容**：生成 `.env.example` 模板文件

**输出**：`.env.example` 文件

**使用场景**：
- 创建项目模板
- 文档维护

---

### 开发命令

#### `npm run dev`

**功能**：启动H5开发服务器

**执行内容**：
- 切换到 `web/` 目录
- 运行 `npm run dev`（Vite开发服务器）
- 启动热重载开发环境

**访问地址**：`http://localhost:3000`

**使用场景**：
- 日常前端开发
- 调试H5功能

---

### 构建命令

#### `npm run build:web`

**功能**：构建H5项目

**执行内容**：
1. 检测构建命令（npm/yarn/pnpm）
2. 执行前端构建命令（如 `npm run build`）
3. 验证构建输出（检查 `web/dist/` 目录）
4. 检查 `index.html` 是否存在

**输出**：`web/dist/` 目录

**使用场景**：
- 单独构建H5项目
- 验证前端构建是否成功

**前置条件**：
- `web/` 目录存在
- `web/package.json` 中有 `build` 脚本

---

#### `npm run sync`

**功能**：同步H5构建产物到Capacitor

**执行内容**：
1. 验证 `web/dist/` 目录存在
2. 更新 `capacitor.config.json` 配置
3. 更新Android应用名称（`strings.xml`）
4. 执行 `npx cap sync android`

**输出**：
- 更新 `capacitor.config.json`
- 更新 `android/app/src/main/res/values/strings.xml`
- 同步文件到 `android/app/src/main/assets/`

**使用场景**：
- H5构建后，同步到Android项目
- 更新应用配置后重新同步

**前置条件**：
- 已运行 `npm run build:web`
- `web/dist/` 目录存在且有内容

---

#### `npm run build:android`

**功能**：编译Android APK

**执行内容**：
1. 验证Android项目存在
2. 检测Java SDK和Android SDK
3. 配置 `local.properties`（SDK路径）
4. 更新Android配置（`build.gradle`）：
   - `applicationId`
   - `versionCode` 和 `versionName`
   - `minSdkVersion` 和 `targetSdkVersion`
   - 签名配置（Release模式）
5. 更新应用名称（`strings.xml`）
6. 执行Gradle构建：
   - `gradlew clean`
   - `gradlew assembleDebug` 或 `gradlew assembleRelease`
7. 复制APK到 `build/` 目录

**输出**：
- `android/app/build/outputs/apk/debug/app-debug.apk`
- `android/app/build/outputs/apk/release/app-release.apk`
- `build/app-debug.apk` 或 `build/app-release.apk`

**使用场景**：
- 单独编译APK
- 调试Android构建问题

**前置条件**：
- 已运行 `npm run sync`
- Android项目已初始化

---

#### `npm run build:apk`

**功能**：完整构建流程（一键构建）

**执行顺序**：
```bash
npm run build:web    # 1. 构建H5项目
npm run sync         # 2. 同步到Capacitor
npm run build:android # 3. 编译APK
```

**作用**：一键完成从H5到APK的完整构建流程

**输出**：`build/app-debug.apk` 或 `build/app-release.apk`

**使用场景**：
- 日常构建APK
- CI/CD自动化构建

---

### 签名命令

#### `npm run generate:keystore`

**功能**：生成Android签名证书

**执行内容**：
1. 交互式询问证书信息：
   - Keystore文件路径
   - Keystore密码
   - Key别名
   - Key密码
   - 证书有效期
   - 证书信息（姓名、组织等）
2. 使用 `keytool` 生成keystore文件
3. 自动更新 `build.config.js` 或 `.env` 中的签名配置

**输出**：
- Keystore文件（如 `release.keystore`）
- 更新的配置文件

**使用场景**：
- 首次生成签名证书
- 创建新的签名密钥

**前置条件**：
- Java JDK已安装
- `keytool` 命令可用

---

### 测试命令

#### `npm test`

**功能**：运行单元测试

**执行内容**：
- 运行Jest测试套件
- 执行所有测试文件

**输出**：测试结果报告

---

#### `npm run test:watch`

**功能**：监听模式运行测试

**执行内容**：
- 启动Jest监听模式
- 文件变更时自动重新运行测试

**使用场景**：
- 开发时持续测试
- TDD开发模式

---

#### `npm run test:coverage`

**功能**：生成测试覆盖率报告

**执行内容**：
- 运行所有测试
- 生成覆盖率报告

**输出**：
- 控制台覆盖率报告
- `coverage/` 目录（HTML报告）

---

## 🔄 构建流程

### 完整构建流程图

```
┌─────────────────┐
│  开发H5项目      │
│  (web/src/)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  build:web      │ ← npm run build:web
│  构建H5项目      │
│  输出: web/dist/ │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  sync           │ ← npm run sync
│  同步到Capacitor │
│  更新配置        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  build:android  │ ← npm run build:android
│  编译APK        │
│  1. 更新配置     │
│  2. Gradle构建   │
│  3. 复制APK     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  最终APK        │
│  build/*.apk    │
└─────────────────┘
```

### 命令执行顺序

#### 方式1：分步执行（推荐用于调试）

```bash
# 步骤1：构建H5
npm run build:web

# 步骤2：同步到Capacitor
npm run sync

# 步骤3：编译APK
npm run build:android
```

#### 方式2：一键构建（推荐用于日常）

```bash
npm run build:apk
```

### Debug vs Release构建

#### Debug构建

```bash
# 方式1：使用.env配置
# BUILD_MODE=debug
npm run build:apk

# 方式2：默认就是debug模式
npm run build:apk
```

**特点**：
- 未签名
- 包含调试信息
- 体积较大
- 适合开发和测试

#### Release构建

```bash
# 方式1：使用.env配置
# BUILD_MODE=release
# SIGNING_ENABLED=true
npm run build:apk

# 方式2：使用build.config.js
# buildMode: 'release'
# signing.enabled: true
npm run build:apk
```

**特点**：
- 已签名
- 代码混淆（可选）
- 体积优化
- 适合发布

**前置条件**：
- 已生成签名证书（`npm run generate:keystore`）
- 已配置签名信息（`.env` 或 `build.config.js`）

## ⚙️ 配置说明

### 配置优先级

```
环境变量(.env) > build.config.js默认值
```

### 环境变量配置（.env文件）

**创建方式**：
```bash
npm run create:env
```

**主要配置项**：

```env
# ============================================
# Android SDK配置
# ============================================
ANDROID_HOME=C:\Users\YourName\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Java\jdk-17

# ============================================
# 应用基本信息
# ============================================
APP_ID=com.example.app          # 应用包名
APP_NAME=我的应用                # 应用名称
APP_VERSION=1.0.0                # 应用版本

# ============================================
# 构建配置
# ============================================
BUILD_MODE=debug                 # debug 或 release
WEB_DIR=web/dist                # H5构建输出目录
OUTPUT_DIR=build                # APK输出目录

# ============================================
# Android SDK版本
# ============================================
ANDROID_MIN_SDK_VERSION=22       # 最低支持版本
ANDROID_TARGET_SDK_VERSION=34   # 目标版本
ANDROID_COMPILE_SDK_VERSION=34  # 编译版本
ANDROID_BUILD_TOOLS_VERSION=34.0.0

# ============================================
# 签名配置（Release版本）
# ============================================
SIGNING_ENABLED=false           # 是否启用签名
KEYSTORE_PATH=release.keystore  # Keystore文件路径
KEYSTORE_PASSWORD=your_password # Keystore密码
KEY_ALIAS=your_alias            # Key别名
KEY_PASSWORD=your_key_password # Key密码
```

**详细说明**：参考 [环境变量配置指南](docs/guide/env-config.md)

---

### build.config.js配置

**位置**：项目根目录

**主要配置项**：

```javascript
module.exports = {
  // 应用基本信息
  appId: 'com.example.app',
  appName: 'My App',
  version: '1.0.0',
  
  // H5构建配置
  webDir: 'web/dist',
  framework: 'auto', // auto, react, vue, angular, vanilla
  
  // Android配置
  android: {
    minSdkVersion: 22,
    targetSdkVersion: 34,
    compileSdkVersion: 34,
    buildToolsVersion: '34.0.0',
  },
  
  // 签名配置
  signing: {
    enabled: false,
    keystorePath: '',
    keystorePassword: '',
    keyAlias: '',
    keyPassword: '',
  },
  
  // 构建模式
  buildMode: 'debug', // debug 或 release
  
  // 输出配置
  outputDir: 'build',
};
```

**注意**：如果 `.env` 文件存在，环境变量的值会覆盖 `build.config.js` 中的默认值。

---

### capacitor.config.json配置

**位置**：项目根目录

**说明**：Capacitor核心配置，通常由 `init` 和 `sync` 脚本自动更新，不建议手动修改。

**主要配置项**：

```json
{
  "appId": "com.example.app",
  "appName": "My App",
  "webDir": "web/dist",
  "bundledWebRuntime": false,
  "server": {
    "androidScheme": "https"
  },
  "android": {
    "buildOptions": {
      "keystorePath": "",
      "keystorePassword": "",
      "keystoreAlias": "",
      "keystoreAliasPassword": ""
    }
  }
}
```

## 💻 开发指南

### 开发流程

#### 1. 初始化项目（首次）

```bash
# 1. 安装依赖
npm install

# 2. 创建环境配置
npm run create:env

# 3. 编辑.env文件，配置应用信息

# 4. 初始化项目
npm run init

# 5. 开发H5项目
npm run dev
```

#### 2. 日常开发

```bash
# 1. 启动开发服务器
npm run dev

# 2. 在浏览器中开发（http://localhost:3000）

# 3. 测试构建
npm run build:apk

# 4. 安装到设备测试
adb install build/app-debug.apk
```

#### 3. 发布流程

```bash
# 1. 生成签名证书（如果还没有）
npm run generate:keystore

# 2. 配置.env文件
# BUILD_MODE=release
# SIGNING_ENABLED=true
# 填写签名信息

# 3. 构建Release版本
npm run build:apk

# 4. 验证APK
# build/app-release.apk
```

### 目录说明

#### web/ 目录

前端项目目录，支持多种框架：

- **Vue项目**：使用Vue 3 + Vite
- **React项目**：使用React + Vite
- **Angular项目**：使用Angular CLI
- **Vanilla JS**：纯JavaScript项目

**开发**：在 `web/src/` 目录下编写代码

**构建**：运行 `npm run build:web` 或 `npm run build:apk`

#### android/ 目录

Android原生项目，由Capacitor自动生成和管理。

**注意**：
- 不要手动修改 `android/` 目录下的文件
- 配置通过 `build.config.js` 或 `.env` 文件管理
- 使用 `npm run sync` 同步H5资源

#### scripts/ 目录

构建脚本目录，包含所有自动化脚本。

**自定义**：可以修改脚本以适应特定需求。

#### build/ 目录

最终APK输出目录，构建完成后会生成：
- `app-debug.apk` - Debug版本
- `app-release.apk` - Release版本

## ❓ 常见问题

### 1. Android SDK未找到

**错误信息**：
```
SDK location not found. Define a valid SDK location...
```

**解决方法**：
1. 确保已安装Android Studio
2. 运行 `npm run create:env` 自动检测SDK路径
3. 或手动设置 `ANDROID_HOME` 环境变量

---

### 2. Java版本不兼容

**错误信息**：
```
Unsupported Java version
```

**解决方法**：
1. 安装JDK 11或更高版本（推荐JDK 17）
2. 设置 `JAVA_HOME` 环境变量
3. 运行 `npm run create:env` 自动检测

---

### 3. Gradle构建失败

**可能原因**：
- 网络问题（Gradle需要下载依赖）
- Android SDK未正确安装
- 配置错误

**解决方法**：
1. 检查网络连接
2. 检查 `android/local.properties` 中的 `sdk.dir` 路径
3. 查看详细错误日志
4. 参考 [Gradle镜像配置](docs/guide/gradle-mirror.md)

---

### 4. Capacitor同步失败

**错误信息**：
```
Web构建输出不存在
```

**解决方法**：
1. 确保已运行 `npm run build:web`
2. 检查 `web/dist/` 目录是否存在
3. 检查 `web/dist/index.html` 是否存在
4. 检查 `capacitor.config.json` 配置

---

### 5. 应用名称未更新

**问题**：修改 `.env` 中的 `APP_NAME` 后，APK中的应用名称未更新

**解决方法**：
1. 确保运行了 `npm run sync`（会更新 `strings.xml`）
2. 重新运行 `npm run build:apk`
3. 检查 `android/app/src/main/res/values/strings.xml`

---

### 6. Release版本签名失败

**错误信息**：
```
Keystore file not found
```

**解决方法**：
1. 运行 `npm run generate:keystore` 生成证书
2. 检查 `.env` 中的签名配置是否正确
3. 确保 `KEYSTORE_PATH` 路径正确

---

### 7. 测试失败

**问题**：运行 `npm test` 时测试失败

**解决方法**：
1. 确保已安装所有依赖（`npm install`）
2. 检查 `.env` 文件是否影响测试（测试会mock dotenv）
3. 查看测试错误信息
4. 参考 `tests/README.md`

## 📚 相关文档

- [环境变量配置指南](docs/guide/env-config.md)
- [签名证书配置指南](docs/guide/signing-setup.md)
- [Gradle镜像配置](docs/guide/gradle-mirror.md)
- [Java SDK设置](docs/guide/java-setup.md)
- [快速开始指南](docs/guide/quick-start.md)
- [在线文档站点](https://webapp-native.netlify.app) (VitePress)

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

MIT 许可证是一个宽松的开源许可证，允许：
- ✅ 商业使用
- ✅ 修改
- ✅ 分发
- ✅ 私人使用
- ✅ 专利使用
- ✅ 子许可证

唯一的要求是保留版权声明和许可证声明。

## 👤 作者

**liudonjun**

- GitHub: [@liudonjun](https://github.com/liudonjun)
- 项目地址: [webapp-native](https://github.com/liudonjun/webapp-native)

---

**最后更新**：2025年12月18日
