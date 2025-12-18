/**
 * 构建配置示例文件
 * 复制此文件为 build.config.js 并根据需要修改配置
 */

module.exports = {
  // ========== 应用基本信息 ==========
  appId: 'com.example.app',        // 应用包名，必须唯一（如：com.yourcompany.appname）
  appName: 'My App',              // 应用显示名称
  version: '1.0.0',               // 应用版本号（格式：major.minor.patch）
  
  // ========== H5构建配置 ==========
  webDir: 'web/dist',             // H5构建输出目录（相对于项目根目录）
  framework: 'auto',              // 前端框架类型：auto（自动检测）、react、vue、angular、vanilla
  
  // ========== Android配置 ==========
  android: {
    minSdkVersion: 22,            // 最低支持的Android版本（API Level）
    targetSdkVersion: 34,         // 目标Android版本（建议使用最新稳定版）
    compileSdkVersion: 34,        // 编译时使用的SDK版本
    buildToolsVersion: '34.0.0',  // Android构建工具版本
  },
  
  // ========== 签名配置（Release版本） ==========
  signing: {
    enabled: false,               // 是否启用签名（Release版本必须为true）
    keystorePath: '',            // keystore文件路径（相对于项目根目录）
    keystorePassword: '',        // keystore密码
    keyAlias: '',                // key别名
    keyPassword: '',             // key密码
  },
  
  // ========== 构建模式 ==========
  buildMode: 'debug',            // 构建模式：debug（调试版本）或 release（发布版本）
  
  // ========== 输出配置 ==========
  outputDir: 'build',            // APK输出目录（相对于项目根目录）
};

/**
 * 配置说明：
 * 
 * 1. appId: 应用包名，必须遵循反向域名格式（如：com.example.app）
 *    一旦发布到应用商店，包名不能更改
 * 
 * 2. version: 版本号格式为 major.minor.patch
 *    - major: 主版本号（重大更新）
 *    - minor: 次版本号（新功能）
 *    - patch: 修订版本号（bug修复）
 * 
 * 3. framework: 前端框架类型
 *    - auto: 自动检测（推荐）
 *    - react: React项目
 *    - vue: Vue项目
 *    - angular: Angular项目
 *    - vanilla: 纯JavaScript项目
 * 
 * 4. minSdkVersion: 最低支持的Android版本
 *    - 22: Android 5.1（Lollipop）
 *    - 23: Android 6.0（Marshmallow）
 *    - 24: Android 7.0（Nougat）
 *    - 建议：22或更高，以支持更多设备
 * 
 * 5. signing: Release版本签名配置
 *    生成keystore命令：
 *    keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
 * 
 * 6. buildMode: 构建模式
 *    - debug: 调试版本，不需要签名，构建速度快
 *    - release: 发布版本，需要配置签名，文件更小，性能更好
 */

