#!/usr/bin/env node

/**
 * Capacitor同步脚本
 * 功能：
 * 1. 调用 npx cap sync
 * 2. 验证同步结果
 * 3. 处理同步错误
 */

// 加载环境变量
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const config = require('../build.config.js');

console.log('🔄 开始同步到Capacitor...\n');

// 验证web构建输出是否存在
function validateWebBuild() {
  const webDir = path.join(__dirname, '..', config.webDir);
  
  if (!fs.existsSync(webDir)) {
    throw new Error(`Web构建输出不存在: ${webDir}，请先运行 npm run build:web`);
  }
  
  const files = fs.readdirSync(webDir);
  if (files.length === 0) {
    throw new Error('Web构建输出目录为空，请先构建H5项目');
  }
  
  console.log(`✅ Web构建输出验证通过: ${config.webDir}`);
}

// 更新Capacitor配置
function updateCapacitorConfig() {
  const capacitorConfigPath = path.join(__dirname, '..', 'capacitor.config.json');
  
  if (!fs.existsSync(capacitorConfigPath)) {
    throw new Error('capacitor.config.json 不存在，请先运行 npm run init');
  }
  
  try {
    const capacitorConfig = JSON.parse(fs.readFileSync(capacitorConfigPath, 'utf8'));
    
    // 更新配置
    capacitorConfig.appId = config.appId;
    capacitorConfig.appName = config.appName;
    capacitorConfig.webDir = config.webDir;
    
    // 更新签名配置（如果启用）
    if (config.signing.enabled && config.buildMode === 'release') {
      capacitorConfig.android.buildOptions.keystorePath = config.signing.keystorePath;
      capacitorConfig.android.buildOptions.keystorePassword = config.signing.keystorePassword;
      capacitorConfig.android.buildOptions.keystoreAlias = config.signing.keyAlias;
      capacitorConfig.android.buildOptions.keystoreAliasPassword = config.signing.keyPassword;
    }
    
    fs.writeFileSync(capacitorConfigPath, JSON.stringify(capacitorConfig, null, 2));
    console.log(`✅ Capacitor配置已更新: appName=${config.appName}, appId=${config.appId}`);
    
    // 更新Android应用名称
    updateAndroidAppName();
  } catch (error) {
    throw new Error(`更新Capacitor配置失败: ${error.message}`);
  }
}

// 更新Android应用名称（strings.xml）
function updateAndroidAppName() {
  const androidDir = path.join(__dirname, '..', 'android');
  const stringsXmlPath = path.join(androidDir, 'app', 'src', 'main', 'res', 'values', 'strings.xml');
  
  if (!fs.existsSync(stringsXmlPath)) {
    console.warn('⚠️  无法找到strings.xml，跳过应用名称更新');
    return;
  }
  
  try {
    let stringsXmlContent = fs.readFileSync(stringsXmlPath, 'utf8');
    
    // 更新app_name
    stringsXmlContent = stringsXmlContent.replace(
      /<string name="app_name">[^<]+<\/string>/,
      `<string name="app_name">${config.appName}</string>`
    );
    
    // 更新title_activity_main
    stringsXmlContent = stringsXmlContent.replace(
      /<string name="title_activity_main">[^<]+<\/string>/,
      `<string name="title_activity_main">${config.appName}</string>`
    );
    
    // 更新package_name（如果需要）
    if (config.appId) {
      stringsXmlContent = stringsXmlContent.replace(
        /<string name="package_name">[^<]+<\/string>/,
        `<string name="package_name">${config.appId}</string>`
      );
      
      // 更新custom_url_scheme
      stringsXmlContent = stringsXmlContent.replace(
        /<string name="custom_url_scheme">[^<]+<\/string>/,
        `<string name="custom_url_scheme">${config.appId}</string>`
      );
    }
    
    fs.writeFileSync(stringsXmlPath, stringsXmlContent);
    console.log(`✅ Android应用名称已更新: ${config.appName}`);
  } catch (error) {
    console.warn(`⚠️  更新应用名称失败: ${error.message}`);
  }
}

// 确保 build.gradle 有 defaultConfig 块
function ensureDefaultConfig() {
  const androidDir = path.join(__dirname, '..', 'android');
  const appBuildGradlePath = path.join(androidDir, 'app', 'build.gradle');
  
  if (!fs.existsSync(appBuildGradlePath)) {
    return;
  }
  
  try {
    let buildGradleContent = fs.readFileSync(appBuildGradlePath, 'utf8');
    
    // 如果缺少 defaultConfig 块，添加它
    if (!buildGradleContent.includes('defaultConfig')) {
      console.warn('⚠️  检测到 build.gradle 缺少 defaultConfig 块，正在恢复...');
      
      // 在 signingConfigs 之后、buildTypes 之前插入 defaultConfig
      if (buildGradleContent.includes('signingConfigs') && buildGradleContent.includes('buildTypes')) {
        buildGradleContent = buildGradleContent.replace(
          /(signingConfigs\s*\{[^}]*?\}[^}]*?)(buildTypes)/s,
          `$1\n    defaultConfig {\n        applicationId "${config.appId}"\n        minSdkVersion rootProject.ext.minSdkVersion\n        targetSdkVersion rootProject.ext.targetSdkVersion\n        versionCode ${config.version ? (() => { const m = config.version.match(/^(\d+)\.(\d+)\.(\d+)/); return m ? parseInt(m[1]) * 10000 + parseInt(m[2]) * 100 + parseInt(m[3]) : 10000; })() : 10000}\n        versionName "${config.version || '1.0.0'}"\n        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"\n        aaptOptions {\n             ignoreAssetsPattern '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'\n        }\n    }\n    \n    $2`
        );
      } else if (buildGradleContent.includes('buildTypes')) {
        // 如果没有 signingConfigs，直接在 buildTypes 之前插入
        buildGradleContent = buildGradleContent.replace(
          /(compileSdkVersion[^\n]*\n\s*)(buildTypes)/,
          `$1defaultConfig {\n        applicationId "${config.appId}"\n        minSdkVersion rootProject.ext.minSdkVersion\n        targetSdkVersion rootProject.ext.targetSdkVersion\n        versionCode ${config.version ? (() => { const m = config.version.match(/^(\d+)\.(\d+)\.(\d+)/); return m ? parseInt(m[1]) * 10000 + parseInt(m[2]) * 100 + parseInt(m[3]) : 10000; })() : 10000}\n        versionName "${config.version || '1.0.0'}"\n        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"\n        aaptOptions {\n             ignoreAssetsPattern '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'\n        }\n    }\n    \n    $2`
        );
      }
      
      // 验证 defaultConfig 块是否完整（包含开始和结束大括号）
      const defaultConfigMatch = buildGradleContent.match(/defaultConfig\s*\{[^}]*\}/s);
      const hasCompleteDefaultConfig = defaultConfigMatch !== null;
      
      if (hasCompleteDefaultConfig) {
        fs.writeFileSync(appBuildGradlePath, buildGradleContent);
        console.log('✅ 已恢复 defaultConfig 块');
      } else {
        console.error('❌ 恢复 defaultConfig 块失败，正则表达式可能未匹配或块不完整');
      }
    }
  } catch (error) {
    console.warn(`⚠️  检查 defaultConfig 块失败: ${error.message}`);
  }
}

// 执行Capacitor同步
function syncCapacitor() {
  const projectRoot = path.join(__dirname, '..');
  
  // 检查Android目录是否存在
  const androidDir = path.join(projectRoot, 'android');
  if (!fs.existsSync(androidDir)) {
    throw new Error('Android目录不存在，请先运行 npm run init');
  }
  
  console.log('🔄 执行 Capacitor 同步...');
  
  try {
    execSync('npx cap sync android', {
      stdio: 'inherit',
      cwd: projectRoot
    });
    
    console.log('✅ Capacitor同步完成');
    
    // 同步后立即确保 defaultConfig 块存在（Capacitor sync 可能会覆盖 build.gradle）
    ensureDefaultConfig();
    
    // 验证同步结果
    const androidAssetsDir = path.join(androidDir, 'app', 'src', 'main', 'assets', 'public');
    if (fs.existsSync(androidAssetsDir)) {
      const files = fs.readdirSync(androidAssetsDir);
      console.log(`✅ 验证同步结果: Android assets目录中有 ${files.length} 个文件`);
    }
    
  } catch (error) {
    throw new Error(`Capacitor同步失败: ${error.message}`);
  }
}

// 主函数
function main() {
  try {
    validateWebBuild();
    updateCapacitorConfig();
    syncCapacitor();
    
    console.log('\n✅ Capacitor同步流程完成！');
  } catch (error) {
    console.error('\n❌ 同步失败:', error.message);
    process.exit(1);
  }
}

main();

