---
title: 环境要求
description: 项目运行所需的环境配置
---

# 环境要求

## 必需环境

### Node.js

- **版本**: >= 16.0.0
- **下载**: https://nodejs.org/
- **验证**: `node --version`

### 包管理器

推荐使用以下之一：
- **npm** (Node.js自带)
- **yarn**: `npm install -g yarn`
- **pnpm**: `npm install -g pnpm` (推荐)

### Android SDK

- **安装方式**: 通过 [Android Studio](https://developer.android.com/studio) 安装
- **推荐API Level**: 34
- **环境变量**: 设置 `ANDROID_HOME`

**默认位置**：
- Windows: `C:\Users\<用户名>\AppData\Local\Android\Sdk`
- macOS: `~/Library/Android/sdk`
- Linux: `~/Android/Sdk`

### Java JDK

- **版本**: JDK 11+ (推荐 JDK 17)
- **安装方式**: 
  - 独立安装 JDK
  - 或使用 Android Studio 自带的 JDK
- **环境变量**: 设置 `JAVA_HOME`

**Android Studio 自带 JDK 位置**：
- Windows: `C:\Program Files\Android\Android Studio\jbr`
- macOS: `/Applications/Android Studio.app/Contents/jbr`

### iOS开发环境（仅macOS）

- **系统要求**: macOS 10.15+ (推荐 macOS 12+)
- **Xcode**: 通过 [App Store](https://apps.apple.com/app/xcode/id497799835) 安装
- **版本要求**: Xcode 13+ (推荐 Xcode 14+)
- **Command Line Tools**: 安装Xcode后自动安装，或运行 `xcode-select --install`
- **CocoaPods**: iOS依赖管理工具
  - 安装: `sudo gem install cocoapods`
  - 验证: `pod --version`

**注意**: iOS构建只能在macOS系统上运行

## 环境配置

### Windows

#### 设置 ANDROID_HOME

1. 右键"此电脑" → "属性"
2. "高级系统设置" → "环境变量"
3. 新建系统变量：
   - 变量名: `ANDROID_HOME`
   - 变量值: `C:\Users\<用户名>\AppData\Local\Android\Sdk`

#### 设置 JAVA_HOME

1. 在"环境变量"中新建：
   - 变量名: `JAVA_HOME`
   - 变量值: `C:\Program Files\Android\Android Studio\jbr`

### macOS / Linux

在 `~/.bashrc` 或 `~/.zshrc` 中添加：

```bash
# Android SDK
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# 或
export ANDROID_HOME=$HOME/Android/Sdk          # Linux

export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# Java JDK
export JAVA_HOME=/Applications/Android\ Studio.app/Contents/jbr  # macOS
# 或
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk                   # Linux

export PATH=$PATH:$JAVA_HOME/bin
```

然后执行：

```bash
source ~/.bashrc  # 或 source ~/.zshrc
```

## 验证环境

### 检查 Node.js

```bash
node --version
npm --version
```

### 检查 Android SDK

```bash
# Windows PowerShell
$env:ANDROID_HOME

# macOS/Linux
echo $ANDROID_HOME
```

### 检查 Java

```bash
# Windows PowerShell
$env:JAVA_HOME
java -version

# macOS/Linux
echo $JAVA_HOME
java -version
```

## 自动检测

项目提供了自动检测脚本：

```bash
npm run create:env
```

脚本会自动：
- 检测 Android SDK 路径
- 检测 Java SDK 路径
- 生成 `.env` 配置文件

**注意**: iOS环境检测需要在macOS系统上运行

## 常见问题

### Q: Android SDK 未找到？

A: 
1. 确保已安装 Android Studio
2. 运行 `npm run create:env` 自动检测
3. 或手动设置 `ANDROID_HOME` 环境变量

### Q: Java 版本不兼容？

A: 
1. 安装 JDK 11 或更高版本（推荐 JDK 17）
2. 设置 `JAVA_HOME` 环境变量
3. 或使用 Android Studio 自带的 JDK

### Q: 如何确认环境配置正确？

A: 运行 `npm run create:env`，脚本会自动检测并显示检测到的路径。

### Q: iOS构建需要什么环境？

A: 
1. **macOS系统**（iOS构建只能在macOS上运行）
2. **Xcode**（从App Store安装）
3. **CocoaPods**（运行 `sudo gem install cocoapods`）
4. 运行 `xcodebuild -version` 验证Xcode安装
5. 运行 `pod --version` 验证CocoaPods安装

### Q: 可以在Windows/Linux上构建iOS应用吗？

A: 不可以。iOS应用只能在macOS系统上构建，因为需要Xcode和iOS SDK。

