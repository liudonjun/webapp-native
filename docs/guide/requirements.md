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

