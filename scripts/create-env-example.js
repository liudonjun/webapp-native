#!/usr/bin/env node

/**
 * 创建.env.example模板文件
 * 确保使用UTF-8编码，避免乱码
 */

const fs = require('fs');
const path = require('path');

const envExamplePath = path.join(__dirname, '..', '.env.example');

const envExampleContent = `# ============================================
# Android SDK 配置
# ============================================
# Android SDK路径（如果未设置，脚本会自动检测）
ANDROID_HOME=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
# 或者使用 ANDROID_SDK_ROOT（二选一）
# ANDROID_SDK_ROOT=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk

# ============================================
# Java SDK 配置
# ============================================
# Java SDK路径（如果未设置，脚本会自动检测Android Studio自带的JDK）
JAVA_HOME=C:\\Program Files\\Android\\Android Studio\\jbr

# ============================================
# 应用基本信息
# ============================================
APP_ID=com.example.app
APP_NAME=My App
APP_VERSION=1.0.0

# ============================================
# 构建配置
# ============================================
# 构建模式: debug 或 release
BUILD_MODE=debug

# H5构建输出目录
WEB_DIR=web/dist

# APK输出目录
OUTPUT_DIR=build

# ============================================
# Android SDK版本配置
# ============================================
ANDROID_MIN_SDK_VERSION=22
ANDROID_TARGET_SDK_VERSION=34
ANDROID_COMPILE_SDK_VERSION=34
ANDROID_BUILD_TOOLS_VERSION=34.0.0

# ============================================
# 签名配置（Release版本）
# ============================================
# 是否启用签名（true/false）
SIGNING_ENABLED=false

# Keystore文件路径（相对于项目根目录）
KEYSTORE_PATH=release.keystore

# Keystore密码
KEYSTORE_PASSWORD=

# Key别名
KEY_ALIAS=release-key

# Key密码（通常与keystore密码相同）
KEY_PASSWORD=

# ============================================
# 注意事项
# ============================================
# 1. 复制此文件为 .env 并填写实际值
# 2. .env 文件已添加到 .gitignore，不会被提交到Git
# 3. 不要将包含敏感信息的 .env 文件提交到代码仓库
# 4. 签名密码等敏感信息建议使用环境变量或密钥管理工具
`;

console.log('📝 创建.env.example文件...');

try {
  // 使用UTF-8编码写入文件
  fs.writeFileSync(envExamplePath, envExampleContent, 'utf8');
  console.log('✅ .env.example文件已创建');
  console.log(`   文件位置: ${envExamplePath}`);
} catch (error) {
  console.error('❌ 创建失败:', error.message);
  process.exit(1);
}

