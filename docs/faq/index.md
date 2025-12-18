---
title: 常见问题
description: 常见问题解答
---

# 常见问题

## 环境配置问题

### Q: Android SDK未找到？

**错误信息**：
```
SDK location not found. Define a valid SDK location...
```

**解决方法**：
1. 确保已安装Android Studio
2. 运行 `npm run create:env` 自动检测SDK路径
3. 或手动设置 `ANDROID_HOME` 环境变量

### Q: Java版本不兼容？

**错误信息**：
```
Unsupported Java version
```

**解决方法**：
1. 安装JDK 11或更高版本（推荐JDK 17）
2. 设置 `JAVA_HOME` 环境变量
3. 运行 `npm run create:env` 自动检测

### Q: 如何确认环境配置正确？

**解决方法**：
运行 `npm run create:env`，脚本会自动检测并显示检测到的路径。

## 构建问题

### Q: Gradle构建失败？

**可能原因**：
- 网络问题（Gradle需要下载依赖）
- Android SDK未正确安装
- 配置错误

**解决方法**：
1. 检查网络连接
2. 检查 `android/local.properties` 中的 `sdk.dir` 路径
3. 查看详细错误日志
4. 参考 [Gradle镜像配置](/guide/gradle-mirror)

### Q: Capacitor同步失败？

**错误信息**：
```
Web构建输出不存在
```

**解决方法**：
1. 确保已运行 `npm run build:web`
2. 检查 `web/dist/` 目录是否存在
3. 检查 `web/dist/index.html` 是否存在
4. 检查 `capacitor.config.json` 配置

### Q: 应用名称未更新？

**问题**：修改 `.env` 中的 `APP_NAME` 后，APK中的应用名称未更新

**解决方法**：
1. 确保运行了 `npm run sync`（会更新 `strings.xml`）
2. 重新运行 `npm run build:apk`
3. 检查 `android/app/src/main/res/values/strings.xml`

## 签名问题

### Q: Release版本签名失败？

**错误信息**：
```
Keystore file not found
```

**解决方法**：
1. 运行 `npm run generate:keystore` 生成证书
2. 检查 `.env` 中的签名配置是否正确
3. 确保 `KEYSTORE_PATH` 路径正确

### Q: 签名密码错误？

**错误信息**：
```
Keystore was tampered with, or password was incorrect
```

**解决方法**：
1. 检查 `.env` 中的密码是否正确
2. 确认 `KEYSTORE_PASSWORD` 和 `KEY_PASSWORD` 是否正确
3. 使用 `keytool -list -v -keystore your.keystore` 验证keystore文件

### Q: 如何备份keystore文件？

**建议**：
1. 将keystore文件复制到多个安全位置
2. 使用密码管理器保存密码
3. 不要将keystore文件提交到Git仓库

## 配置问题

### Q: .env文件没有被读取？

**解决方法**：
1. 确保 `.env` 文件在项目根目录
2. 已安装 `dotenv` 包：`npm install`
3. 脚本中已调用 `require('dotenv').config()`

### Q: 环境变量和build.config.js哪个优先级高？

**答案**：环境变量（`.env`文件）优先级更高，会覆盖 `build.config.js` 中的默认值。

### Q: 可以完全不使用.env文件吗？

**答案**：可以。如果不创建 `.env` 文件，系统会使用 `build.config.js` 中的默认值，或自动检测SDK路径。

## 测试问题

### Q: 测试失败？

**问题**：运行 `npm test` 时测试失败

**解决方法**：
1. 确保已安装所有依赖（`npm install`）
2. 检查 `.env` 文件是否影响测试（测试会mock dotenv）
3. 查看测试错误信息
4. 参考 `tests/README.md`

## 其他问题

### Q: 如何更新项目？

**解决方法**：
```bash
# 更新依赖
npm update

# 更新Capacitor
npm install @capacitor/cli@latest @capacitor/core@latest @capacitor/android@latest
```

### Q: 如何清理构建缓存？

**解决方法**：
```bash
# 清理Android构建
cd android
./gradlew clean  # Windows: gradlew.bat clean

# 清理H5构建
rm -rf web/dist  # Windows: rmdir /s web\dist

# 清理所有构建产物
rm -rf build android/app/build  # Windows: rmdir /s build android\app\build
```

### Q: 如何查看详细构建日志？

**解决方法**：
```bash
# 查看Gradle详细日志
cd android
./gradlew build --info  # Windows: gradlew.bat build --info

# 查看npm脚本日志
npm run build:apk --verbose
```

