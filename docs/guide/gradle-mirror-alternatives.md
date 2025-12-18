---
title: Gradle镜像备选方案
description: 如果当前镜像不可用的备选方案
---

# Gradle 镜像源备选方案

如果当前配置的镜像源不可用，可以参考以下备选方案：

## Gradle 分发文件镜像源

### 方案1: 腾讯云镜像（当前使用）

```properties
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.0.2-all.zip
```

### 方案2: 华为云镜像

```properties
distributionUrl=https\://mirrors.huaweicloud.com/gradle/gradle-8.0.2-all.zip
```

### 方案3: 网易镜像

```properties
distributionUrl=https\://mirrors.163.com/gradle/gradle-8.0.2-all.zip
```

### 方案4: 使用官方CDN（如果镜像都不可用）

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip
```

## Maven 仓库镜像源

### 方案1: 腾讯云 Maven（当前使用）

```gradle
repositories {
    maven { url 'https://mirrors.cloud.tencent.com/nexus/repository/maven-public/' }
    google()
    mavenCentral()
}
```

### 方案2: 华为云 Maven

```gradle
repositories {
    maven { url 'https://repo.huaweicloud.com/repository/maven/' }
    google()
    mavenCentral()
}
```

### 方案3: 网易 Maven

```gradle
repositories {
    maven { url 'https://mirrors.163.com/maven/repository/maven-public/' }
    google()
    mavenCentral()
}
```

### 方案4: 使用原始源（最稳定但可能较慢）

```gradle
repositories {
    google()
    mavenCentral()
}
```

## 快速切换方法

### 切换 Gradle 镜像

编辑 `android/gradle/wrapper/gradle-wrapper.properties`，修改 `distributionUrl` 行。

### 切换 Maven 镜像

编辑 `android/build.gradle`，修改 `repositories` 块中的 `maven { url ... }` 地址。

## 验证镜像是否可用

运行以下命令测试镜像是否可用：

```bash
# 测试Gradle镜像
curl -I https://mirrors.cloud.tencent.com/gradle/gradle-8.0.2-all.zip

# 测试Maven镜像
curl -I https://mirrors.cloud.tencent.com/nexus/repository/maven-public/
```

## 手动下载 Gradle（如果所有镜像都失败）

1. 访问 Gradle 官方下载页面：https://gradle.org/releases/
2. 下载对应版本的 `gradle-8.0.2-all.zip`
3. 放置到本地缓存目录：
   - Windows: `C:\Users\<用户名>\.gradle\wrapper\dists\gradle-8.0.2-all\<hash>\`
   - macOS/Linux: `~/.gradle/wrapper/dists/gradle-8.0.2-all/<hash>/`

其中 `<hash>` 是 Gradle wrapper 自动生成的哈希值目录。

## 推荐配置顺序

1. **首选**: 腾讯云镜像（速度快，稳定）
2. **备选**: 华为云镜像
3. **最后**: 官方源（最稳定但可能较慢）

