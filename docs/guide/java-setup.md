---
title: Java SDK设置
description: 配置Java开发环境
---

# Java SDK 配置指南

## Java SDK 位置

根据检测，您的 Java SDK 位置为：

```
C:\Program Files\Android\Android Studio\jbr
```

这是 Android Studio 自带的 JetBrains Runtime (JBR)，版本为 **OpenJDK 17.0.6**。

## 设置 JAVA_HOME 环境变量

### 方法一：通过系统设置（推荐）

1. 右键点击"此电脑" → "属性"
2. 点击"高级系统设置"
3. 点击"环境变量"
4. 在"系统变量"中点击"新建"
5. 变量名：`JAVA_HOME`
6. 变量值：`C:\Program Files\Android\Android Studio\jbr`
7. 点击"确定"

### 方法二：通过 PowerShell（当前会话）

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
```

### 方法三：通过 PowerShell（永久设置）

```powershell
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jbr", "Machine")
```

::: warning 注意
需要以管理员权限运行 PowerShell。
:::

## 添加到 PATH（可选）

如果需要全局使用 `java` 命令，可以将 Java bin 目录添加到 PATH：

```powershell
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
$newPath = $currentPath + ";C:\Program Files\Android\Android Studio\jbr\bin"
[System.Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
```

## 验证配置

重新打开 PowerShell 或命令提示符，运行：

```powershell
# 检查 JAVA_HOME
echo $env:JAVA_HOME

# 检查 Java 版本（如果已添加到 PATH）
java -version
```

应该看到：

```
openjdk version "17.0.6" 2023-01-17
OpenJDK Runtime Environment (build 17.0.6+0-b2043.56-9586694)
OpenJDK 64-Bit Server VM (build 17.0.6+0-b2043.56-9586694, mixed mode)
```

## 构建脚本自动检测

构建脚本会自动检测 `JAVA_HOME` 环境变量。如果未设置，脚本会尝试使用 Android Studio 的默认 JDK 路径。

## 常见问题

### Q: 为什么找不到 java 命令？

A: Java 可能没有添加到 PATH。可以：
1. 设置 JAVA_HOME（构建脚本会使用）
2. 或者将 `C:\Program Files\Android\Android Studio\jbr\bin` 添加到 PATH

### Q: 需要安装独立的 JDK 吗？

A: 不需要。Android Studio 自带的 JDK 17 已经足够使用。

### Q: 如何确认 JAVA_HOME 已设置？

A: 运行 `echo $env:JAVA_HOME`，应该显示 JDK 路径。

