/**
 * 构建系统配置文件
 * 用于配置Web应用转原生应用的各项参数
 * 支持Android和iOS平台
 * 
 * 配置优先级：环境变量(.env) > 此文件中的默认值
 */

// 加载环境变量（如果存在.env文件）
require('dotenv').config();

// 从环境变量读取配置，如果没有则使用默认值
function getEnv(key, defaultValue) {
  return process.env[key] || defaultValue;
}

// 从环境变量读取布尔值
function getEnvBool(key, defaultValue) {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
}

// 从环境变量读取数字
function getEnvInt(key, defaultValue) {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return parseInt(value, 10);
}

module.exports = {
  // 应用基本信息（可从环境变量读取）
  appId: getEnv('APP_ID', 'com.example.app'),
  appName: getEnv('APP_NAME', 'My App'),
  version: getEnv('APP_VERSION', '1.0.0'),
  
  // H5构建配置
  webDir: getEnv('WEB_DIR', 'web/dist'),
  framework: getEnv('FRAMEWORK', 'auto'), // auto, react, vue, angular, vanilla
  
  // Android配置（可从环境变量读取）
  android: {
    minSdkVersion: getEnvInt('ANDROID_MIN_SDK_VERSION', 22),
    targetSdkVersion: getEnvInt('ANDROID_TARGET_SDK_VERSION', 34),
    compileSdkVersion: getEnvInt('ANDROID_COMPILE_SDK_VERSION', 34),
    buildToolsVersion: getEnv('ANDROID_BUILD_TOOLS_VERSION', '34.0.0'),
  },
  
  // 签名配置（Release版本，可从环境变量读取）
  signing: {
    enabled: getEnvBool('SIGNING_ENABLED', false),
    keystorePath: getEnv('KEYSTORE_PATH', ''),
    keystorePassword: getEnv('KEYSTORE_PASSWORD', ''),
    keyAlias: getEnv('KEY_ALIAS', ''),
    keyPassword: getEnv('KEY_PASSWORD', ''),
  },
  
  // 构建模式（可从环境变量读取）
  buildMode: getEnv('BUILD_MODE', 'release'), // debug 或 release
  
  // 输出配置
  outputDir: getEnv('OUTPUT_DIR', 'build'),
};

