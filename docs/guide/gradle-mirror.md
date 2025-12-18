---
title: Gradle镜像配置
description: 配置国内镜像加速Gradle和Maven依赖下载
---

# Gradle 国内镜像配置说明

## 已配置的镜像源

项目已配置使用国内镜像加速 Gradle 和 Maven 依赖下载：

### 1. Gradle 分发文件镜像

**文件**: `android/gradle/wrapper/gradle-wrapper.properties`

使用腾讯云镜像下载 Gradle 分发文件：

```
https://mirrors.cloud.tencent.com/gradle/
```

### 2. Maven 仓库镜像

**文件**: `android/build.gradle`

配置了以下镜像源（按优先级排序）：

1. **腾讯云 Maven 镜像**
   - 公共仓库: `https://mirrors.cloud.tencent.com/nexus/repository/maven-public/`

2. **备用源**（镜像不可用时自动回退）
   - Google Maven: `google()`
   - Maven Central: `mavenCentral()`

## 镜像源说明

### 腾讯云镜像

- **优势**: 速度快，稳定，覆盖全面
- **地址**: https://mirrors.cloud.tencent.com/
- **支持**: Maven Central、Google、Gradle Plugin 等

### 其他可选镜像源

如果腾讯云镜像不可用，可以替换为以下镜像：

#### 阿里云镜像

```gradle
maven { url 'https://maven.aliyun.com/repository/public/' }
```

#### 华为云镜像

```gradle
maven { url 'https://repo.huaweicloud.com/repository/maven/' }
```

#### 网易镜像

```gradle
maven { url 'https://mirrors.163.com/maven/repository/maven-public/' }
```

## 验证配置

运行构建命令时，Gradle 会优先使用配置的镜像源：

```bash
npm run build:android
```

如果看到下载速度明显提升，说明镜像配置生效。

## 故障排除

### 问题1: 镜像源不可用

如果遇到依赖下载失败，可以：
1. 检查网络连接
2. 尝试切换到其他镜像源（参考 [Gradle镜像备选方案](/guide/gradle-mirror-alternatives)）
3. 临时使用原始源（注释掉镜像配置）

### 问题2: 某些依赖找不到

某些特殊依赖可能不在镜像中，会自动回退到原始源（google()、mavenCentral()）。

### 问题3: Gradle 下载失败

如果 Gradle 分发文件下载失败，可以：
1. 手动下载：访问镜像站点下载对应版本
2. 放置到：`~/.gradle/wrapper/dists/gradle-8.0.2-all/` 目录
3. 或修改 `gradle-wrapper.properties` 使用其他镜像

## 手动配置 Gradle 全局镜像（可选）

如果想为所有 Gradle 项目配置镜像，可以创建全局配置文件：

**Windows**: `C:\Users\<用户名>\.gradle\init.gradle`  
**macOS/Linux**: `~/.gradle/init.gradle`

```gradle
allprojects {
    repositories {
        maven { url 'https://mirrors.cloud.tencent.com/nexus/repository/maven-public/' }
        google()
        mavenCentral()
    }
}
```

## 参考链接

- [腾讯云镜像](https://mirrors.cloud.tencent.com/)
- [Gradle 官方文档](https://docs.gradle.org/)
- [Android 构建配置](https://developer.android.com/studio/build)

