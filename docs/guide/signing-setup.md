---
title: 签名证书配置指南
description: Android应用签名证书的创建和管理
---

# Android 签名证书配置指南

Android应用发布到应用商店或分发给用户时，需要使用签名证书对APK进行签名。本指南将帮助您创建和管理签名证书。

## 快速开始

### 1. 生成签名证书

运行以下命令生成keystore文件：

```bash
npm run generate:keystore
```

脚本会引导您完成以下步骤：
- 输入keystore文件名（默认：release.keystore）
- 设置keystore密码（至少6位）
- 设置key别名（默认：release-key）
- 设置key密码（默认与keystore密码相同）
- 设置证书有效期（默认：25年）
- 填写组织信息（CN、OU、O、城市、省份、国家）

### 2. 自动配置

生成keystore后，脚本会自动：
- 更新 `.env` 文件中的签名配置
- 更新 `build.config.js` 中的签名配置（保持兼容性）
- 将构建模式设置为 `release`
- 配置签名信息

### 3. 构建签名APK

配置完成后，运行构建命令：

```bash
npm run build:apk
```

构建脚本会自动：
- 读取签名配置
- 将签名配置添加到 `android/app/build.gradle`
- 使用签名证书对APK进行签名

## 手动配置签名

如果您已有keystore文件，可以手动配置：

### 1. 编辑 .env 文件（推荐）

```env
SIGNING_ENABLED=true
KEYSTORE_PATH=release.keystore
KEYSTORE_PASSWORD=your-password
KEY_ALIAS=release-key
KEY_PASSWORD=your-password
BUILD_MODE=release
```

### 2. 编辑 build.config.js（备选）

```javascript
signing: {
  enabled: true,                    // 启用签名
  keystorePath: 'release.keystore', // keystore文件路径（相对于项目根目录）
  keystorePassword: 'your-password', // keystore密码
  keyAlias: 'release-key',          // key别名
  keyPassword: 'your-password',     // key密码（通常与keystore密码相同）
}
```

### 3. 设置构建模式

```javascript
buildMode: 'release', // 必须设置为release才能使用签名
```

### 4. 放置keystore文件

将keystore文件放在项目根目录（与 `build.config.js` 同级）。

## 签名配置说明

### Keystore文件

- **位置**: 项目根目录（建议）
- **格式**: `.keystore` 或 `.jks`
- **安全**: 不要提交到Git仓库（已在.gitignore中排除）

### 密码设置

- **Keystore密码**: 保护整个keystore文件的密码
- **Key密码**: 保护单个key的密码（通常与keystore密码相同）
- **建议**: 使用强密码，至少12位，包含大小写字母、数字和特殊字符

### 证书有效期

- **默认**: 25年（9125天）
- **建议**: 至少25年，因为Google Play要求证书有效期至少到2033年
- **注意**: 证书过期后无法更新应用，需要创建新证书并重新发布

### 组织信息（DN - Distinguished Name）

- **CN (Common Name)**: 组织名称，如 "My Company"
- **OU (Organizational Unit)**: 组织单位，如 "IT Department"
- **O (Organization)**: 组织名称，如 "My Company"
- **L (Locality)**: 城市，如 "Beijing"
- **ST (State)**: 省份，如 "Beijing"
- **C (Country)**: 国家代码（ISO 3166-1），如 "CN"

## 构建类型说明

### Debug版本

- **用途**: 开发和测试
- **签名**: 使用Android默认的debug签名
- **特点**: 不需要配置签名，构建速度快

### Release版本

- **用途**: 发布到应用商店或分发给用户
- **签名**: 使用您配置的签名证书
- **特点**: 需要配置签名，APK文件更小，性能更好

## 安全建议

### 1. 备份keystore文件

- 将keystore文件备份到多个安全位置
- 使用加密存储或密码管理器保存密码
- 不要丢失keystore文件和密码

### 2. 密码管理

- 使用密码管理器保存密码
- 不要将密码提交到代码仓库
- 定期更换密码（需要重新生成keystore）

### 3. 访问控制

- 限制keystore文件的访问权限
- 不要将keystore文件分享给不信任的人
- 使用版本控制系统时，确保keystore文件在.gitignore中

### 4. 丢失处理

如果丢失keystore文件或密码：
- **无法恢复**: 无法更新已发布的应用
- **解决方案**: 创建新证书，重新发布应用（会失去现有用户和评分）

## 验证签名

### 检查APK签名

```bash
# 使用jarsigner验证
jarsigner -verify -verbose -certs your-app.apk

# 使用apksigner验证（Android SDK Build Tools）
apksigner verify --verbose your-app.apk
```

### 查看签名信息

```bash
# 查看keystore中的证书信息
keytool -list -v -keystore release.keystore
```

## 常见问题

### Q: 为什么需要签名？

A: Android要求所有APK必须签名才能安装。签名用于：
- 验证应用来源
- 防止应用被篡改
- 确保应用更新的连续性

### Q: Debug和Release签名的区别？

A: 
- **Debug签名**: Android自动生成，仅用于开发和测试
- **Release签名**: 您自己创建的，用于发布应用

### Q: 可以修改签名配置吗？

A: 可以，但修改后需要重新签名所有APK。建议在首次发布前确定签名配置。

### Q: 多个应用可以使用同一个keystore吗？

A: 可以，但不推荐。建议每个应用使用独立的keystore，提高安全性。

### Q: 如何更新证书？

A: 证书更新需要创建新keystore，但无法直接更新已发布的应用。建议在证书到期前提前准备。

## 相关命令

### 生成keystore（手动）

```bash
keytool -genkey -v -keystore release.keystore -alias release-key -keyalg RSA -keysize 2048 -validity 9125
```

### 查看keystore信息

```bash
keytool -list -v -keystore release.keystore
```

### 修改keystore密码

```bash
keytool -storepasswd -keystore release.keystore
```

### 修改key密码

```bash
keytool -keypasswd -keystore release.keystore -alias release-key
```

## 参考资源

- [Android官方签名文档](https://developer.android.com/studio/publish/app-signing)
- [Google Play应用签名](https://support.google.com/googleplay/android-developer/answer/9842756)
- [Keytool文档](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html)

